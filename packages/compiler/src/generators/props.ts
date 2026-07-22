import { type CompilerContext } from "../types";

export function generateProps(context: CompilerContext) {
  return context.fields
    .map((field) => `${field.name}: ${field.propType};`)
    .join("\n");
}
