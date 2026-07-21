import type { Element, Root, Parent } from "hast";
import { visit } from "unist-util-visit";

const WRAPPER_CLASSES = new Set([
  // Motion
  "motion-word",
  "motion-char",
  "motion-line",

  // SplitType
  "word",
  "char",
  "line",

  // GSAP SplitText
  "split-word",
  "split-char",
  "split-line",

  // Splitting.js
  "splitting",

  // Generic
  "animate-word",
  "animate-char",
  "animate-line",
]);

const ANIMATION_STYLE_PROPS = new Set([
  "opacity",
  "transform",
  "filter",
  "animation",
  "transition",
  "will-change",
  "translate",
  "rotate",
  "scale",
]);

interface UnwrapOperation {
  parent: Parent;
  index: number;
  children: Parent["children"];
}

export function sanitize(tree: Root): Root {
  const unwraps: UnwrapOperation[] = [];

  visit(tree, "element", (node: Element, index, parent) => {
    removeAnimationStyles(node);

    if (parent && typeof index === "number" && isWrapper(node)) {
      unwraps.push({
        parent,
        index,
        children: [...node.children], // copy children
      });
    }
  });

  // Apply mutations after traversal.
  // Process in reverse so indices remain valid.
  unwraps
    .sort((a, b) => b.index - a.index)
    .forEach(({ parent, index, children }) => {
      parent.children.splice(index, 1, ...children);
    });

  return tree;
}

function isWrapper(node: Element) {
  const className = node.properties?.className;

  if (!Array.isArray(className)) {
    return false;
  }

  return className.some((c) => isWrapperClass(String(c)));
}

function isWrapperClass(className: string) {
  return (
    WRAPPER_CLASSES.has(className) ||
    className.startsWith("motion-") ||
    className.startsWith("split-") ||
    className.startsWith("animate-")
  );
}

function removeAnimationStyles(node: Element) {
  if (!node.properties) return;

  if (typeof node.properties.style === "string") {
    const cleaned = node.properties.style
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((rule) => {
        const property = rule.split(":")[0].trim().toLowerCase();
        return !ANIMATION_STYLE_PROPS.has(property);
      })
      .join("; ");

    if (cleaned) {
      node.properties.style = cleaned;
    } else {
      delete node.properties.style;
    }
  }

  delete node.properties["data-motion-id"];
  delete node.properties["data-motion"];
  delete node.properties["data-splitting"];
}
