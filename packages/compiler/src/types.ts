import { CodeExpression } from "./utils/jsx";

export type FieldType =
  "text" | "richtext" | "color" | "boolean" | "radio" | "number";

export type PropType =
  "string" | "boolean" | "number" | "ColorValue" | "SpacingValue";

export interface FieldConfig {
  type: FieldType;
  [key: string]: unknown;
}

export interface Field {
  name: string;
  propType: PropType;
  config: FieldConfig | CodeExpression;
  defaultValue: unknown;

  /**
   * Emit:
   * import { richTextNoHeading } from "...";
   * ...
   * ...richTextNoHeading
   */
  richTextImport?: boolean;
}

export interface RootConfig {
  fields: Field[];
}

export interface CompilerContext {
  fields: Field[];
}
