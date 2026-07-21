import { CompilerContext } from "../types";

const TYPE_MAP = {
  text: "string",
  richText: "string",
  image: "string",
  color: "string",
  boolean: "boolean",
  number: "number",
} as const;

export function generateProps(context: CompilerContext) {
  return context.fields
    .map((field) => `${field.name}: ${TYPE_MAP[field.type]};`)
    .join("\n");
}
