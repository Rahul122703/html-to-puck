import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";

export function visitSpans(tree: any, context: CompilerContext) {
  visit(tree, "element", (node: any) => {
    if (node.tagName !== "span") return;

    const text = node.children
      ?.filter((c: any) => c.type === "text")
      .map((c: any) => c.value)
      .join("")
      .trim();

    if (!text) return;

    const name = getUniqueName("text");

    context.fields.push({
      name,
      config: {
        type: "richtext",
        contentEditable: true,
      },
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
