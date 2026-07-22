import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";
import { humanize } from "../utils/humanize";

export function visitButtons(tree: any, context: CompilerContext) {
  visit(tree, "element", (node: any) => {
    if (node.tagName !== "button") return;

    const text = node.children
      ?.filter((c: any) => c.type === "text")
      .map((c: any) => c.value)
      .join("")
      .trim();

    if (!text) return;

    const name = getUniqueName("buttonText");

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
