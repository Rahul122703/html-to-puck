export type FieldType = "text" | "richText" | "color" | "boolean";

export interface Field {
  name: string;
  type: FieldType;
  defaultValue: string;
}

export interface CompilerContext {
  fields: Field[];
}
