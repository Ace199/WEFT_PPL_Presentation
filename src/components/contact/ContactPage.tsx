import { SiteHeader } from "@/components/SiteHeader";
import { DesignFooter } from "@/components/design/DesignPage";
import { DesignText as T } from "@/components/design/DesignText";
import styles from "./ContactPage.module.css";

export function ContactPage() {
  return (
    <div className={styles.page} id="top">
      <a className="skip" href="#contact-main"><T zh="跳到正文" en="Skip to content" /></a>
      <SiteHeader current="contact" boundaryId="contact-work" />
      <main id="contact-main" className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.label}>03 / CONTACT</p>
          <h1><T zh={"如果你也在构建复杂系统，\n我们可以聊聊。"} en="If you’re building systems around complex human and technical workflows, let’s talk." /></h1>
          <p className={styles.intro}>Production systems, human–tool workflows, agent systems and creative technology.</p>
        </header>
        <div className={styles.context} id="contact-work">
          <section className={styles.about} aria-labelledby="about-work">
            <h2 id="about-work" className={styles.label}>01 / ABOUT THIS WORK</h2>
            <p><T zh="WEFT / PPL 是我主导架构与核心实现的一套 Cross-DCC Production System。" en="WEFT / PPL is a Cross-DCC Production System for which I led the architecture and core implementation." /></p>
            <p><T zh="这个项目持续围绕一个问题展开：如何把复杂、隐性的生产规则，建模成既能由软件执行、又能被人理解和控制的系统。" en="The project continues to explore one question: how can complex, implicit production rules be modeled as systems that software can execute and people can understand and control?" /></p>
          </section>
          <section className={styles.interests} aria-labelledby="interests-title">
            <h2 id="interests-title" className={styles.label}>02 / WHAT I’M INTERESTED IN</h2>
            <ul>
              <li>Production Systems</li>
              <li>Human–Tool Workflows</li>
              <li>Agent Systems &amp; Tool Orchestration</li>
              <li>Creative Technology</li>
            </ul>
          </section>
        </div>
        <section className={styles.contact} aria-labelledby="contact-title">
          <h2 id="contact-title" className={styles.label}>GET IN TOUCH</h2>
          <p className={styles.channelLabel}>EMAIL</p>
          <a href="mailto:ace199704@icloud.com" className={styles.email} aria-label="EMAIL: ace199704@icloud.com">
            <span>ace199704@icloud.com</span><span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <DesignFooter />
    </div>
  );
}
