const SVG_PROP_MAP: Record<string, string> = {
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  clipPathUnits: "clipPathUnits",
  fillRule: "fillRule",
  clipRule: "clipRule",
  colorInterpolationFilters: "colorInterpolationFilters",
  dominantBaseline: "dominantBaseline",
  floodOpacity: "floodOpacity",
  floodColor: "floodColor",
  stopColor: "stopColor",
  stopOpacity: "stopOpacity",
  textAnchor: "textAnchor",
  vectorEffect: "vectorEffect",
  xlinkHref: "xlinkHref",
  xmlSpace: "xmlSpace",
};

export function normalizePropName(key: string) {
  // SVG-specific fixes
  key = SVG_PROP_MAP[key] ?? key;

  // Convert ariaLabel -> aria-label
  if (/^aria[A-Z]/.test(key)) {
    return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  }

  // Convert dataMotionId -> data-motion-id
  if (/^data[A-Z]/.test(key)) {
    return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  }

  switch (key) {
    case "class":
      return "className";
    case "for":
      return "htmlFor";
    default:
      return key;
  }
}
