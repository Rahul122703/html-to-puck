import type { Element } from "hast";

export function mergeProperties(
  element: Element,
  properties: Record<string, unknown>,
) {
  element.properties ??= {};

  Object.assign(element.properties, properties);
}
