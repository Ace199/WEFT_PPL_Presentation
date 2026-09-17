"use client";
import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { EditableFieldId, FieldRegistry } from "@/content/home";
import {
  changeList,
  displayText,
  type TextOverrides,
} from "@/lib/text-preview";
import styles from "./TextPreview.module.css";
import { GlyphText } from "../GlyphText";

const EditingContext = createContext(false);
const TextContext = createContext<{
  fields: FieldRegistry;
  overrides: TextOverrides;
  selected: EditableFieldId;
} | null>(null);
export const useEditingActivity = () => useContext(EditingContext);

export function EditableText({
  id,
  glyphs = false,
}: {
  id: EditableFieldId;
  glyphs?: boolean;
}) {
  const context = useContext(TextContext);
  const editing = useEditingActivity();
  if (!context) throw new Error("EditableText needs TextPreviewProvider");
  return (
    <span
      data-editable={id}
      data-selected={editing && context.selected === id ? "true" : undefined}
      className={editing ? styles.marked : styles.text}
    >
      {glyphs && !editing ? (
        <GlyphText text={displayText(context.fields, context.overrides, id)} />
      ) : (
        displayText(context.fields, context.overrides, id)
      )}
    </span>
  );
}

export function TextPreviewProvider({
  fields,
  children,
}: {
  fields: FieldRegistry;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<EditableFieldId>("hero.description");
  const [overrides, setOverrides] = useState<TextOverrides>({});
  const [message, setMessage] = useState("");
  const [showList, setShowList] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const output = useRef<HTMLTextAreaElement>(null);
  const list = changeList(fields, overrides);
  const serialized = JSON.stringify(list, null, 2);
  const current = fields[selected];
  const selectVisibleField = () => {
    const element = document.querySelector<HTMLElement>(
      `[data-editable="${selected}"]`,
    );
    if (!element) {
      setMessage("该说明随对应视角显示；在画布中选择该视角即可预览。");
      return;
    }
    const panelBottom = panel.current?.getBoundingClientRect().bottom ?? 0;
    window.scrollBy({
      top: element.getBoundingClientRect().top - panelBottom - 35,
      behavior: "instant",
    });
  };
  useEffect(() => {
    if (!open) return;
    input.current?.focus({ preventScroll: true });
    // Focus keeps typing local. The sticky in-flow panel reserves its own space.
    selectVisibleField();
    // Only choosing a field should move the page, never each keystroke.
  }, [open, selected]);
  const close = () => {
    setOpen(false);
    setShowList(false);
    setMessage("");
    requestAnimationFrame(() =>
      launcher.current?.focus({ preventScroll: true }),
    );
  };
  const update = (value: string) => {
    setOverrides((previous) => {
      const next = { ...previous };
      if (value === current.baseline) delete next[selected];
      else next[selected] = value;
      return next;
    });
    setMessage("");
  };
  const resetAll = () => {
    setOverrides({});
    setMessage("已恢复全部正式文案。");
    setShowList(false);
  };
  const copy = async () => {
    if (!list.changes.length) {
      setMessage("暂无实际修改。");
      setShowList(false);
      return;
    }
    try {
      await navigator.clipboard.writeText(serialized);
      setMessage("已复制修改清单；尚未保存或发布。");
    } catch {
      setMessage("复制失败，请在下方选择清单并手动复制。");
      setShowList(true);
      requestAnimationFrame(() => {
        output.current?.focus();
        output.current?.select();
      });
    }
  };
  return (
    <EditingContext.Provider value={open}>
      <TextContext.Provider value={{ fields, overrides, selected }}>
        <div className={styles.surface} data-editing={open}>
          {open ? (
            <aside
              ref={panel}
              className={styles.panel}
              aria-label="临时内容编辑"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.stopPropagation();
                  close();
                }
              }}
            >
              <div className={styles.panelTop}>
                <div>
                  <strong>试编辑</strong>
                  <span>临时预览，刷新后恢复</span>
                </div>
                <button onClick={close} aria-label="关闭编辑面板">
                  关闭 ×
                </button>
              </div>
              <div className={styles.fields}>
                <div className={styles.select}>
                  <label htmlFor="preview-field">选择字段</label>
                  <select
                    id="preview-field"
                    value={selected}
                    onChange={(event) => {
                      const id = event.target.value;
                      if (Object.hasOwn(fields, id)) {
                        setSelected(id as EditableFieldId);
                        setMessage("");
                      }
                    }}
                  >
                    {(Object.keys(fields) as EditableFieldId[]).map((id) => (
                      <option value={id} key={id}>
                        {fields[id].label}
                        {overrides[id] !== undefined ? " · 已修改" : ""}
                      </option>
                    ))}
                  </select>
                  <code>{selected}</code>
                  <button onClick={selectVisibleField}>定位页面文案 ↓</button>
                </div>
                <div className={styles.input}>
                  <label htmlFor="preview-value">{current.label}</label>
                  {current.kind === "multi" ? (
                    <textarea
                      ref={input}
                      id="preview-value"
                      value={displayText(fields, overrides, selected)}
                      onChange={(event) => update(event.target.value)}
                      rows={3}
                      spellCheck={false}
                    />
                  ) : (
                    <input
                      ref={input}
                      id="preview-value"
                      type="text"
                      value={displayText(fields, overrides, selected)}
                      onChange={(event) => update(event.target.value)}
                      spellCheck={false}
                    />
                  )}
                  <small>
                    仅在本页预览纯文本，不改变正式内容或已核实事实。
                  </small>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => update(current.baseline)}>
                    恢复此字段
                  </button>
                  <button onClick={resetAll}>恢复全部</button>
                  <button className={styles.copy} onClick={copy}>
                    复制修改清单
                  </button>
                  <button onClick={() => setShowList((value) => !value)}>
                    查看清单（{list.changes.length}）
                  </button>
                </div>
              </div>
              <p className={styles.message} role="status">
                {message ||
                  `${list.changes.length} 个字段有临时修改。正式更新需由维护者核对源值后修改代码。`}
              </p>
              {showList ? (
                <div className={styles.export}>
                  <label htmlFor="preview-changes">
                    修改清单（可手动选择复制）
                  </label>
                  <textarea
                    id="preview-changes"
                    ref={output}
                    readOnly
                    value={serialized}
                    rows={4}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                </div>
              ) : null}
            </aside>
          ) : null}
          {children}
          {!open ? (
            <div className={styles.launcher}>
              {list.changes.length ? (
                <>
                  <span role="status">
                    临时预览，刷新后恢复 · {list.changes.length} 项
                  </span>
                  <button onClick={resetAll}>恢复全部</button>
                </>
              ) : null}
              <button ref={launcher} onClick={() => setOpen(true)}>
                试编辑 <span aria-hidden="true">↗</span>
              </button>
            </div>
          ) : null}
        </div>
      </TextContext.Provider>
    </EditingContext.Provider>
  );
}
