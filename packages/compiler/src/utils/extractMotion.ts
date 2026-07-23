import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

import type { MotionConfig, MotionType } from "../types";

import {
  COMPONENT_MOTION,
  DEFAULT_TRANSITION,
  MOTION_PRESETS,
} from "./motionPresets";

export function extractMotion(tree: Root) {
  visit(tree, "element", (node: Element) => {
    const motion = buildMotion(node);

    if (!motion) return;

    node.properties ??= {};
    node.properties["data-motion-config"] = JSON.stringify(motion);
  });
}

export function buildMotion(node: Element): MotionConfig | undefined {
  const props = node.properties;
  if (!props) return;

  const classes = new Set(
    Array.isArray(props.className) ? props.className.map(String) : [],
  );

  let type: MotionType = "element";

  if (classes.has("motion-word")) {
    type = "word";
  } else if (classes.has("motion-char")) {
    type = "char";
  } else if (classes.has("motion-line")) {
    type = "line";
  }

  const group =
    typeof props["dataMotion"] === "string"
      ? props["dataMotion"]
      : typeof props["data-motion"] === "string"
        ? props["data-motion"]
        : typeof props["data-animate"] === "string"
          ? props["data-animate"]
          : undefined;

  if (!group) {
    return;
  }

  const animation = COMPONENT_MOTION[group] ?? COMPONENT_MOTION[type] ?? "fade";

  const preset = MOTION_PRESETS[animation];

  if (!preset) {
    return;
  }

  return {
    group,
    type,
    initial: {
      ...(preset.initial ?? {}),
    },
    animate: {
      ...(preset.animate ?? {}),
    },
    transition: {
      ...DEFAULT_TRANSITION,
      ...(preset.transition ?? {}),
    },
  };
}
