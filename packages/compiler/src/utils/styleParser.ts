import type { MotionState } from "../types";

export function parseStyle(style: string) {
  return Object.fromEntries(
    style
      .split(";")
      .map((rule) => rule.trim())
      .filter(Boolean)
      .map((rule) => {
        const [k, ...v] = rule.split(":");
        return [k.trim().toLowerCase(), v.join(":").trim()];
      }),
  );
}

export function parseTransform(transform: string) {
  const result: Partial<MotionState> = {};

  const translateY = transform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/);
  if (translateY) result.y = Number(translateY[1]);

  const translateX = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
  if (translateX) result.x = Number(translateX[1]);

  const scale = transform.match(/scale\((-?\d+(?:\.\d+)?)\)/);
  if (scale) result.scale = Number(scale[1]);

  const rotate = transform.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
  if (rotate) result.rotate = Number(rotate[1]);

  return result;
}

export function parseFilter(filter: string) {
  const blur = filter.match(/blur\((-?\d+(?:\.\d+)?)px\)/);

  return blur
    ? {
        blur: Number(blur[1]),
      }
    : {};
}
