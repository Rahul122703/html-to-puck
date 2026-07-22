import { type CompilerContext } from "../types";
import { CodeExpression } from "../utils/jsx";

export function generateFields(context: CompilerContext) {
  const fields = Object.fromEntries(
    context.fields.map((field) => {
      if (field.config instanceof CodeExpression) {
        return [field.name, field.config];
      }

      const config = { ...field.config };

      if (field.richTextImport) {
        Object.defineProperty(config, "__spread", {
          enumerable: true,
          value: "richTextNoHeading",
        });
      }

      return [field.name, config];
    }),
  );

  return serializeObject(fields);
}

function serialize(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (value instanceof CodeExpression) {
    return value.code.trim();
  }

  if (value === null) return "null";

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";

    return `[
${value.map((v) => `${pad}  ${serialize(v, indent + 1)}`).join(",\n")}
${pad}]`;
  }

  if (typeof value === "object") {
    return serializeObject(value as Record<string, unknown>, indent);
  }

  return "undefined";
}

function serializeObject(obj: Record<string, unknown>, indent = 0): string {
  const pad = "  ".repeat(indent);

  return `{
${Object.entries(obj)
  .map(([key, value]) => {
    if (key === "__spread") {
      return `${pad}  ...${value}`;
    }

    return `${pad}  ${key}: ${serialize(value, indent + 1)}`;
  })
  .join(",\n")}
${pad}}`;
}
