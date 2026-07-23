import type { Element, Root, Text } from "hast";
import { getOrCreateRootElement } from "../utils/getOrCreateRootElement";
import { mergeProperties } from "../utils/mergeProperties";
import { cssStringToJsxStyle } from "../utils/cssStringToJsxStyle";
import { CodeExpression } from "../utils/jsx";
import { normalizePropName } from "../utils/normailzeProps";
import { normalizeScript } from "../utils/extractJs";

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
  css: string,
  js: string,
) {
  const root = getOrCreateRootElement(tree);

  const style = css.trim()
    ? `<style>{\`
      ${css}
      \`}</style>\n`
    : "";

  const script = js.trim()
    ? `<template data-builder-script>{\`
      ${js}
      \`}</template>\n`
    : "";

  const effect = js.trim()
    ? `useEffect(() => {
    ${indent(normalizeScript(js), 2)}
    }, []);`
    : "";

  mergeProperties(root, {
    id: "{{sectionId}}",
    className: ["relative", "py-3"],
    style: new CodeExpression(`{
    backgroundColor,

    paddingTop: \`\${padding.top}px\`,
    paddingRight: \`\${padding.right}px\`,
    paddingBottom: \`\${padding.bottom}px\`,
    paddingLeft: \`\${padding.left}px\`,

    marginTop: \`\${margin.top}px\`,
    marginRight: \`\${margin.right}px\`,
    marginBottom: \`\${margin.bottom}px\`,
    marginLeft: \`\${margin.left}px\`,

    ...(showBackgroundImage && backgroundImage
      ? {
          backgroundImage: \`url(\${backgroundImage})\`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {}),
  }`),
  });

  // Save existing children
  const children = root.children;

  // Overlay placeholder
  const overlay: Text = {
    type: "text",
    value: "{{__ROOT_OVERLAY__}}",
  };

  // Wrapper
  const wrapper: Element = {
    type: "element",
    tagName: "div",
    properties: {
      style: "__CONTENT_WRAPPER_STYLE__",
    },
    children,
  };

  root.children = [overlay, wrapper];

  const jsx = print(tree);

  const props = fields.map((field) => `  ${field.name},`).join("\n");

  return `render: ({
  ${props}
  }: ${componentName}Props) => {
  ${effect ? indent(effect.trim(), 2) + "\n\n" : ""}
    return (
      <>
  ${style ? indent(style, 6) : ""}
  ${script ? indent(script, 6) : ""}
  ${indent(jsx, 6)}
      </>
    );
  },`;
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
  if (node.value === "{{__ROOT_OVERLAY__}}") {
    return `{showBackgroundOverlay && (
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundColor: backgroundOverlayColor,
          opacity: backgroundOverlayOpacity / 100,
        }}
      />
    )}`;
  }

  return node.value.replace(/\{\{(.*?)\}\}/g, "{$1}");
}

function printProps(props: Record<string, any>) {
  return Object.entries(props)
    .map(([key, value]) => {
      key = normalizePropName(key);

      if (value instanceof CodeExpression) {
        return ` ${key}={${value.code}}`;
      }

      if (key === "style") {
        if (value === "__CONTENT_WRAPPER_STYLE__") {
          return ` className="relative z-10"`;
        }

        if (typeof value === "string") {
          return ` style={${cssStringToJsxStyle(value)}}`;
        }
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

        if (key.startsWith("data-")) {
          return ` ${key}='${escape(value)}'`;
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
