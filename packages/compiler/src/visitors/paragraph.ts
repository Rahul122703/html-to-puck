import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";
import { humanize } from "../utils/humanize";

export function visitParagraphs(tree: any, context: CompilerContext) {
  visit(tree, "element", (node: any) => {
    if (node.tagName !== "p") return;

    const text = node.children
      ?.filter((child: any) => child.type === "text")
      .map((child: any) => child.value)
      .join("")
      .trim();

    if (!text) return;

    const name = getUniqueName("description");

    context.fields.push({
      name,
      propType: "string",
      config: {
        label: humanize(name),
        type: "richtext",
      },
      richTextImport: true,
      defaultValue: text,
    });

    node.children = [
      {
        type: "text",
        value: `{{${name}}}`,
      },
    ];
  });
}
