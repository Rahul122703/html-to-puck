import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";
import { humanize } from "../utils/humanize";

export function visitLinks(tree: any, context: CompilerContext) {
  visit(tree, "element", (node: any) => {
    if (node.tagName !== "a") return;

    const href = node.properties?.href;

    if (href) {
      const hrefName = getUniqueName("href");

      context.fields.push({
        name: hrefName,
        propType: "string",
        config: {
          type: "text",
        },
        defaultValue: String(href),
      });

      node.properties.href = `{{${hrefName}}}`;
    }

    const text = node.children
      ?.filter((c: any) => c.type === "text")
      .map((c: any) => c.value)
      .join("")
      .trim();

    if (text) {
      const textName = getUniqueName("linkText");

      context.fields.push({
        name: textName,
        propType: "string",
        config: {
          label: humanize(textName),
          type: "richtext",
        },
        richTextImport: true,
        defaultValue: text,
      });

      node.children = [
        {
          type: "text",
          value: `{{${textName}}}`,
        },
      ];
    }
  });
}
