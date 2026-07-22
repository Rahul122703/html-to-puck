import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export function needsMotion(tree: Root): boolean {
  let found = false;

  visit(tree, "element", (node: Element) => {
    if (node.properties?.["data-motion"]) {
      found = true;
      return;
    }
  });

  return found;
}
