export type FieldType =
  "text" | "richtext" | "color" | "boolean" | "radio" | "color" | "number";

export type PropType = "string" | "boolean" | "number";

export interface Field {
  name: string;
  propType?: PropType;
  config: {
    type: FieldType;
  } & Record<string, unknown>;
  defaultValue: unknown;
}

export interface RootConfig {
  fields: Field[];
}

export interface CompilerContext {
  fields: Field[];
}
