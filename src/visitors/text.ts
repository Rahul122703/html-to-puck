import { visit } from "unist-util-visit";
import { toText } from "hast-util-to-text";

import { CompilerContext } from "../types";
import { getUniqueName } from "../utils/naming";

const TEXT_TAGS: Record<string, string> = {
  h1: "title",
  h2: "title",
  h3: "title",
  h4: "title",
  h5: "title",
  h6: "title",

  p: "description",

  span: "text",
  label: "text",

  strong: "text",
  em: "text",
  small: "text",

  li: "item",
};

export function visitText(tree: any, context: CompilerContext) {
  visit(tree, "element", (node: any) => {
    const baseName = TEXT_TAGS[node.tagName];

    if (!baseName) return;

    const text = toText(node).replace(/\s+/g, " ").trim();

    if (!text) return;

    const fieldName = getUniqueName(baseName);

    context.fields.push({
      name: fieldName,
      type: "richText",
      defaultValue: text,
    });

    node.children = [
      {
        type: "text",
        value: `{{${fieldName}}}`,
      },
    ];
  });
}
