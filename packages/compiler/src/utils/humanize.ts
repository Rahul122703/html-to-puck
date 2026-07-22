export function humanize(value: string): string {
  return (
    value
      // Split camelCase
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Split acronyms
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      // Split letters and numbers
      .replace(/([a-zA-Z])(\d+)/g, "$1 $2")
      .replace(/(\d+)([a-zA-Z])/g, "$1 $2")
      // Replace separators
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      // Capitalize each word
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}
