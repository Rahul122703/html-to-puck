import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";
import { humanize } from "../utils/humanize";

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
          label: humanize(name) + " (Url)",
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
          label: humanize(name),
          type: "text",
        },
        defaultValue: String(alt),
      });

      node.properties.alt = `{{${name}}}`;
    }
  });
}
