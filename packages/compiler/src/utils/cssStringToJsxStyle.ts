function cssPropertyToJs(property: string) {
  // Keep CSS custom properties as-is
  if (property.startsWith("--")) {
    return property;
  }

  return property.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function cssStringToJsxStyle(style: string) {
  const entries = style
    .split(";")
    .map((rule) => rule.trim())
    .filter(Boolean)
    .map((rule) => {
      const colon = rule.indexOf(":");
      if (colon === -1) return null;

      const property = rule.slice(0, colon).trim();
      const value = rule.slice(colon + 1).trim();

      return [cssPropertyToJs(property), value] as const;
    })
    .filter(Boolean) as readonly (readonly [string, string])[];

  return `{
${entries
  .map(
    ([key, value]) => `    ${JSON.stringify(key)}: ${JSON.stringify(value)},`,
  )
  .join("\n")}
  }`;
}
