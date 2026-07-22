import { visit } from "unist-util-visit";
import { type CompilerContext } from "../types";
import { humanize } from "../utils/humanize";

export function visitHeadings(tree: any, context: CompilerContext) {
  let count = 1;

  visit(tree, "element", (node: any) => {
    if (!/^h[1-6]$/.test(node.tagName)) {
      return;
    }

    const text = node.children
      ?.filter((child: any) => child.type === "text")
      .map((child: any) => child.value)
      .join("");

    if (!text) return;

    const name = count === 1 ? "title" : `title${count}`;

    count++;

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
