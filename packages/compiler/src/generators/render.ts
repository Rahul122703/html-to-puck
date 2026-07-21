import type { Element, Root, Text } from "hast";

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

interface Field {
  name: string;
}

export function generateRender(
  tree: Root,
  componentName: string,
  fields: Field[],
) {
  const jsx = print(tree);

  const props = fields.map((field) => `  ${field.name},`).join("\n");

  return `render: ({
${props}
}: ${componentName}Props) => (
${indent(jsx, 2)}
),`;
}

function print(node: any): string {
  switch (node.type) {
    case "root":
      return node.children.map(print).join("");

    case "element":
      return printElement(node);

    case "text":
      return printText(node);

    case "comment":
      return "";

    default:
      return "";
  }
}

function printElement(node: Element): string {
  const tag = node.tagName;
  const props = printProps(node.properties ?? {});
  const children = node.children.map(print).join("");

  if (VOID_ELEMENTS.has(tag)) {
    return `<${tag}${props} />`;
  }

  return `<${tag}${props}>${children}</${tag}>`;
}

function printText(node: Text): string {
  return node.value.replace(/\{\{(.*?)\}\}/g, "{$1}");
}

function printProps(props: Record<string, any>) {
  return Object.entries(props)
    .map(([key, value]) => {
      if (key.startsWith("data")) {
        return "";
      }

      if (key === "class" || key === "className") {
        key = "className";
      }

      if (key === "for") {
        key = "htmlFor";
      }

      if (value === true) {
        return ` ${key}`;
      }

      if (value === false || value == null) {
        return "";
      }

      if (Array.isArray(value)) {
        value = value.join(" ");
      }

      if (typeof value === "string") {
        const match = value.match(/^\{\{(.+)\}\}$/);

        if (match) {
          return ` ${key}={${match[1]}}`;
        }

        return ` ${key}="${escape(value)}"`;
      }

      return ` ${key}={${JSON.stringify(value)}}`;
    })
    .join("");
}

function escape(value: string) {
  return value.replace(/"/g, "&quot;");
}

function indent(text: string, spaces: number) {
  const padding = " ".repeat(spaces);

  return text
    .split("\n")
    .map((line) => (line ? padding + line : line))
    .join("\n");
}
