import type { gsap } from "gsap";

// GSAP owns intro progress; one RAF owns Canvas drawing and continuous motion.
// All contours come from the prerendered SVG, which remains the static fallback.
export function createHeroBoot(
  root: HTMLElement,
  timeline: gsap.core.Timeline,
  intro = true,
) {
  const svg = root.querySelector("svg")!;
  const points = svg.querySelector<SVGGElement>('[data-boot="points"]')!;
  const viewBox = svg.viewBox.baseVal;
  const hubs = [...svg.querySelectorAll<SVGCircleElement>("[data-hero-hub]")];
  const hubStyles = hubs.map((hub) => hub.getAttribute("style"));
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.dataset.heroParticles = "";
  Object.assign(canvas.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  });
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const oldSvgStyle = svg.getAttribute("style");
  const oldPointsStyle = points.getAttribute("style");
  const oldPointerEvents = root.style.pointerEvents;
  svg.style.position = "relative";
  svg.style.zIndex = "1";
  root.style.pointerEvents = "auto";
  points.style.opacity = "0";
  let seed = 4831;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  // Each cluster has its own smooth rhythm and amplitude. Sample parameters
  // once, never randomize per frame (which would produce jitter).
  const clusters = [
    ...points.querySelectorAll<SVGGElement>("[data-cell-cloud]"),
  ].map((cloud) => ({
    x: Number(cloud.dataset.cloudX),
    y: Number(cloud.dataset.cloudY),
    phase: random() * Math.PI * 2,
    period: 3.8 + random() * 2.3,
    amplitude: 0.18 + random() * 0.12,
    drift: 3 + random() * 4,
    hover: 0,
    hub: hubs.find(
      (hub) =>
        Number(hub.getAttribute("cx")) === Number(cloud.dataset.cloudX) &&
        Number(hub.getAttribute("cy")) === Number(cloud.dataset.cloudY),
    ),
  }));
  const particles = [
    ...points.querySelectorAll<SVGPathElement>("[data-cell-size]"),
  ].flatMap((layer, layerIndex) => {
    const opacity =
      Number(layer.getAttribute("opacity") ?? 1) *
      Number(layer.parentElement?.getAttribute("opacity") ?? 1);
    return (layer.getAttribute("d")?.match(/M[^M]+/g) ?? []).map((d) => {
      const numbers = d.match(/-?[\d.]+/g)!.map(Number);
      let x = 0,
        y = 0;
      for (let i = 0; i < numbers.length; i += 2) {
        x += numbers[i];
        y += numbers[i + 1];
      }
      x /= numbers.length / 2;
      y /= numbers.length / 2;
      const path = new Path2D();
      path.addPath(new Path2D(d), new DOMMatrix().translate(-x, -y));
      return {
        path,
        x,
        y,
        dx: viewBox.x + 24 + random() * (viewBox.width - 48) - x,
        dy: viewBox.y + 24 + random() * (viewBox.height - 48) - y,
        delay: random() * 0.18,
        cluster: Math.floor(layerIndex / 5),
        opacity,
      };
    });
  });
  const progress = { value: intro ? 0 : 1 };
  const ink = getComputedStyle(root).color;
  // Rasterize each unique contour once at 3× resolution. Reusing an atlas
  // avoids thousands of vector tessellations every breathing/inspection frame.
  const atlas = document.createElement("canvas");
  const tile = 40,
    columns = 32,
    rasterScale = 3;
  atlas.width = tile * columns;
  atlas.height = tile * Math.ceil(particles.length / columns);
  const atlasContext = atlas.getContext("2d")!;
  atlasContext.fillStyle = ink;
  particles.forEach((particle, index) => {
    atlasContext.setTransform(
      rasterScale,
      0,
      0,
      rasterScale,
      (index % columns) * tile + tile / 2,
      Math.floor(index / columns) * tile + tile / 2,
    );
    atlasContext.fill(particle.path);
  });
  let width = 0,
    height = 0,
    dpr = 1,
    raf = 0,
    frames = 0,
    inView = false,
    disposed = false;
  let elapsed = 0,
    previous = 0;
  const pointer = { x: 0, y: 0, strength: 0, target: 0 };
  let scale = 1,
    offsetX = 0,
    offsetY = 0;
  const draw = (delta: number) => {
    if (!width || !height) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const unit = dpr * scale;
    context.setTransform(unit, 0, 0, unit, dpr * offsetX, dpr * offsetY);
    const settled = progress.value >= 1;
    pointer.strength +=
      (pointer.target - pointer.strength) * (1 - Math.exp(-delta / 0.12));
    const radius = 84 / scale;
    // Whole-cluster expansion is independent of the existing local cell lens.
    // Proximity weights vary smoothly, including when passing between clusters.
    clusters.forEach((cluster) => {
      const reach = 115 / scale;
      const near = Math.max(
        0,
        1 - Math.hypot(pointer.x - cluster.x, pointer.y - cluster.y) / reach,
      );
      const target = settled ? near * near * pointer.target : 0;
      cluster.hover += (target - cluster.hover) * (1 - Math.exp(-delta / 0.2));
      if (cluster.hub) {
        cluster.hub.style.fill = `hsl(155 ${42 + cluster.hover * 48}% ${76 - cluster.hover * 29}%)`;
        // Two soft halos follow the same smoothed proximity as the node color.
        // Keep the filter off at rest; the existing cleanup restores SVG styles.
        cluster.hub.style.filter =
          cluster.hover > 0.005
            ? `drop-shadow(0 0 4px rgba(38, 231, 141, ${(cluster.hover * 0.85).toFixed(3)})) drop-shadow(0 0 12px rgba(62, 232, 156, ${(cluster.hover * 0.6).toFixed(3)}))`
            : "none";
        cluster.hub.dataset.hoverStrength = cluster.hover.toFixed(3);
      }
    });
    context.fillStyle = ink;
    let maxLens = 1;
    const envelope = Math.min(1, Math.max(0, (elapsed - 1.95) / 0.8));
    const breaths = clusters.map(
      (cluster) =>
        envelope *
        (0.76 *
          Math.sin((elapsed * Math.PI * 2) / cluster.period + cluster.phase) +
          0.24 *
            Math.sin(
              (elapsed * Math.PI * 2) / (cluster.period * 1.73) +
                cluster.phase * 1.8,
            )),
    );
    for (let index = 0; index < particles.length; index++) {
      const particle = particles[index];
      const t = Math.max(
        0,
        Math.min(1, (progress.value - particle.delay) / (1 - particle.delay)),
      );
      const cluster = clusters[particle.cluster];
      const wave = settled ? breaths[particle.cluster] : 0;
      const breathe = 1 + cluster.amplitude * wave;
      const spread = 0.085 * wave + cluster.hover * 0.48;
      const radialWeight = Math.min(
        1,
        Math.hypot(particle.x - cluster.x, particle.y - cluster.y) / 45,
      );
      const x =
        particle.x + particle.dx * (1 - t) + (particle.x - cluster.x) * spread;
      const y =
        particle.y +
        particle.dy * (1 - t) +
        (particle.y - cluster.y) * spread +
        cluster.drift * wave * radialWeight;
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      const influence = Math.max(0, 1 - distance / radius);
      const lens = settled
        ? 1 + 1.2 * influence * influence * pointer.strength
        : 1;
      maxLens = Math.max(maxLens, lens);
      const size = breathe * lens;
      context.globalAlpha = particle.opacity;
      const extent = (tile / rasterScale) * size;
      context.drawImage(
        atlas,
        (index % columns) * tile,
        Math.floor(index / columns) * tile,
        tile,
        tile,
        x - extent / 2,
        y - extent / 2,
        extent,
        extent,
      );
    }
    if (settled && pointer.strength > 0.005) {
      context.setTransform(unit, 0, 0, unit, dpr * offsetX, dpr * offsetY);
      context.globalAlpha = pointer.strength * 0.38;
      context.strokeStyle = ink;
      context.lineWidth = 0.7 / scale;
      context.beginPath();
      context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
      context.stroke();
    }
    canvas.dataset.frames = String(++frames);
    canvas.dataset.maxLens = maxLens.toFixed(3);
    canvas.dataset.breath = breaths[0].toFixed(3);
    canvas.dataset.clusterBreaths = breaths
      .map((value) => value.toFixed(3))
      .join(",");
    canvas.dataset.progress = progress.value.toFixed(3);
    canvas.dataset.clusterExpansion = clusters
      .map((cluster) => (1 + cluster.hover * 0.48).toFixed(3))
      .join(",");
  };
  const frame = (now: number) => {
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    elapsed += delta;
    draw(delta);
    raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    const running = !disposed && inView && !document.hidden;
    canvas.dataset.running = String(running);
    if (running) {
      timeline.resume();
      if (!raf) {
        previous = 0;
        raf = requestAnimationFrame(frame);
      }
    } else {
      timeline.pause();
      cancelAnimationFrame(raf);
      raf = 0;
      previous = 0;
    }
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const box = root.getBoundingClientRect();
    pointer.x = (event.clientX - box.left - offsetX) / scale;
    pointer.y = (event.clientY - box.top - offsetY) / scale;
    pointer.target =
      pointer.x >= viewBox.x &&
      pointer.x <= viewBox.x + viewBox.width &&
      pointer.y >= viewBox.y &&
      pointer.y <= viewBox.y + viewBox.height
        ? 1
        : 0;
  };
  const leave = () => {
    pointer.target = 0;
  };
  const pointerSurface = root.closest("section") ?? root;
  pointerSurface.addEventListener("pointermove", move);
  pointerSurface.addEventListener("pointerleave", leave);
  const resize = new ResizeObserver(() => {
    const box = root.getBoundingClientRect();
    width = box.width;
    height = box.height;
    const svgBox = svg.getBoundingClientRect();
    scale = svgBox.width / viewBox.width;
    offsetX = svgBox.left - box.left - viewBox.x * scale;
    offsetY = svgBox.top - box.top - viewBox.y * scale;
    dpr = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    pointer.target = 0;
    if (inView && !document.hidden) draw(0);
  });
  root.prepend(canvas);
  resize.observe(root);
  root.dataset.heroStage = intro ? "scatter" : "complete";
  if (intro) {
    timeline
      .set('[data-boot="lines"], [data-boot="resolved"]', { opacity: 0 }, 0)
      .call(
        () => {
          root.dataset.heroStage = "gather";
        },
        [],
        0.3,
      )
      .to(progress, { value: 1, duration: 1.65, ease: "power2.in" }, 0.3)
      .call(
        () => {
          root.dataset.heroStage = "clustered";
        },
        [],
        1.95,
      )
      .to('[data-boot="lines"]', { opacity: 0.12, duration: 0.65 }, 2.1)
      .call(
        () => {
          root.dataset.heroStage = "resolve";
        },
        [],
        2.6,
      )
      .to('[data-boot="resolved"]', { opacity: 1, duration: 0.8 }, 2.75)
      .call(
        () => {
          root.dataset.heroStage = "complete";
        },
        [],
        3.55,
      );
  }
  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  visibility.observe(root);
  document.addEventListener("visibilitychange", sync);
  sync();
  return () => {
    disposed = true;
    sync();
    resize.disconnect();
    visibility.disconnect();
    document.removeEventListener("visibilitychange", sync);
    pointerSurface.removeEventListener("pointermove", move);
    pointerSurface.removeEventListener("pointerleave", leave);
    canvas.remove();
    atlas.width = 0;
    atlas.height = 0;
    if (oldSvgStyle === null) svg.removeAttribute("style");
    else svg.setAttribute("style", oldSvgStyle);
    if (oldPointsStyle === null) points.removeAttribute("style");
    else points.setAttribute("style", oldPointsStyle);
    root.style.pointerEvents = oldPointerEvents;
    hubs.forEach((hub, index) => {
      const style = hubStyles[index];
      if (style === null) hub.removeAttribute("style");
      else hub.setAttribute("style", style);
      delete hub.dataset.hoverStrength;
    });
    root.dataset.heroStage = "complete";
  };
}
