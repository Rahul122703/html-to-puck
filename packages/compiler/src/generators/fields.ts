import { CompilerContext } from "../types";

export function generateFields(context: CompilerContext) {
  return serializeObject(
    Object.fromEntries(
      context.fields.map((field) => [field.name, field.config]),
    ),
  );
}

function serialize(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);

  if (value === null) {
    return "null";
  }

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
  .map(([key, value]) => `${pad}  ${key}: ${serialize(value, indent + 1)}`)
  .join(",\n")}
${pad}}`;
}
