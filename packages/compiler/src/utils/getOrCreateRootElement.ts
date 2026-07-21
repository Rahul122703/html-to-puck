import { Element, ElementContent, Root, Text } from "hast";

export function getOrCreateRootElement(tree: Root): Element {
  const children = tree.children.filter((child) => {
    if (child.type !== "text") return true;

    return (child as Text).value.trim() !== "";
  });

  if (children.length === 1 && children[0].type === "element") {
    return children[0] as Element;
  }

  const wrapper: Element = {
    type: "element",
    tagName: "div",
    properties: {},
    children: children as ElementContent[],
  };

  tree.children = [wrapper];

  return wrapper;
}
