import { visit } from "unist-util-visit";
import { CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";

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
      type: "richText",
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
