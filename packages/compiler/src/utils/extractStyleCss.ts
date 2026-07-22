import type { Element, Root, Text } from "hast";
import { visit } from "unist-util-visit";

export function extractStyles(tree: Root): string {
  let css = "";

  visit(tree, "element", (node: Element, index, parent) => {
    if (node.tagName !== "style") {
      return;
    }

    css += node.children
      .filter((child): child is Text => child.type === "text")
      .map((child) => child.value)
      .join("\n");

    // Remove the <style> element from the HTML
    if (parent && typeof index === "number") {
      parent.children.splice(index, 1);
    }
  });

  return css.trim();
}
