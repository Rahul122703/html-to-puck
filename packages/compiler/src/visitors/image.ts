import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";

export function visitImages(tree: any, context: CompilerContext) {
  visit(tree, "element", (node: any) => {
    if (node.tagName !== "img") return;

    const src = node.properties?.src;
    const alt = node.properties?.alt;

    if (src) {
      const name = getUniqueName("image");

      context.fields.push({
        name,
        propType: "string",
        config: {
          type: "text",
        },
        defaultValue: String(src),
      });

      node.properties.src = `{{${name}}}`;
    }

    if (alt) {
      const name = getUniqueName("imageAlt");

      context.fields.push({
        name,
        propType: "string",
        config: {
          type: "text",
        },
        defaultValue: String(alt),
      });

      node.properties.alt = `{{${name}}}`;
    }
  });
}
