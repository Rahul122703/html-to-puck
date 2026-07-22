import type { Element, Root } from "hast";
import type { MotionConfig, MotionState, MotionType } from "../types";
import { parseFilter, parseStyle, parseTransform } from "./styleParser";
import { visit } from "unist-util-visit";

export function extractMotion(tree: Root) {
  visit(tree, "element", (node: Element) => {
    const motion = buildMotion(node);

    if (!motion) return;

    node.properties ??= {};
    node.properties["data-motion"] = JSON.stringify(motion);
  });
}

export function buildMotion(node: Element): MotionConfig | undefined {
  const props = node.properties;
  if (!props) return;

  const style = typeof props.style === "string" ? parseStyle(props.style) : {};

  const initial: MotionState = {};

  if (style.opacity) {
    initial.opacity = Number(style.opacity);
  }

  Object.assign(
    initial,
    parseTransform(style.transform ?? ""),
    parseFilter(style.filter ?? ""),
  );

  const classes = new Set(
    Array.isArray(props.className) ? props.className.map(String) : [],
  );

  let type: MotionType = "element";

  if (classes.has("motion-word")) type = "word";
  else if (classes.has("motion-char")) type = "char";
  else if (classes.has("motion-line")) type = "line";

  const group =
    typeof props["data-animate"] === "string"
      ? props["data-animate"]
      : undefined;

  if (!group && Object.keys(initial).length === 0) {
    return;
  }

  return {
    group,
    type,
    initial,
  };
}
