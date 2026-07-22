import type { Element } from "hast";

export function mergeProperties(
  element: Element,
  properties: Record<string, unknown>,
) {
  const props = (element.properties ??= {}) as Record<string, unknown>;

  for (const [key, value] of Object.entries(properties)) {
    if (key === "className") {
      const existing = props["className"];

      const existingClasses = Array.isArray(existing)
        ? existing
        : typeof existing === "string"
          ? existing.split(/\s+/).filter(Boolean)
          : [];

      const newClasses = Array.isArray(value)
        ? value.flatMap((v) =>
            typeof v === "string" ? v.split(/\s+/).filter(Boolean) : [],
          )
        : typeof value === "string"
          ? value.split(/\s+/).filter(Boolean)
          : [];

      props["className"] = [...new Set([...existingClasses, ...newClasses])];

      continue;
    }

    if (key === "style") {
      const existing = props["style"];

      if (
        existing &&
        value &&
        typeof existing === "object" &&
        typeof value === "object" &&
        !Array.isArray(existing) &&
        !Array.isArray(value)
      ) {
        props["style"] = {
          ...(existing as Record<string, unknown>),
          ...(value as Record<string, unknown>),
        };

        continue;
      }
    }

    props[key] = value;
  }
}
