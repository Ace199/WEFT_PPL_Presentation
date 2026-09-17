import type { EditableFieldId, FieldRegistry } from "@/content/home";
export type TextOverrides = Partial<Record<EditableFieldId, string>>;
export function displayText(
  fields: FieldRegistry,
  overrides: TextOverrides,
  id: EditableFieldId,
) {
  return overrides[id] ?? fields[id].baseline;
}
export function changeList(fields: FieldRegistry, overrides: TextOverrides) {
  return {
    schemaVersion: 1,
    source: "src/content/home.ts",
    changes: (Object.keys(fields) as EditableFieldId[])
      .filter(
        (id) =>
          overrides[id] !== undefined && overrides[id] !== fields[id].baseline,
      )
      .map((id) => ({
        fieldId: id,
        label: fields[id].label,
        original: fields[id].baseline,
        modified: overrides[id]!,
      })),
  };
}
