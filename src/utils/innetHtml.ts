import { toHtml } from "hast-util-to-html";

export function getInnerHtml(node: any): string {
  if (!node.children?.length) {
    return "";
  }

  return node.children
    .map((child: any) => toHtml(child))
    .join("")
    .trim();
}
