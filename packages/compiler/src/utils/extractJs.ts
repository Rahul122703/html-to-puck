import type { Element, Root, Text } from "hast";
import { visit } from "unist-util-visit";

export function normalizeScript(js: string): string {
  let normalized = js.trim();

  const unwrap = (regex: RegExp, source: string) =>
    source.replace(regex, (_, body) => body.trim());

  // window.onload = function() { ... };
  normalized = unwrap(
    /window\.onload\s*=\s*(?:async\s*)?function\s*\([^)]*\)\s*\{([\s\S]*?)\}\s*;?/g,
    normalized,
  );

  // window.onload = () => { ... };
  normalized = unwrap(
    /window\.onload\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*;?/g,
    normalized,
  );

  // window.onload = async () => { ... };
  normalized = unwrap(
    /window\.onload\s*=\s*async\s*\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*;?/g,
    normalized,
  );

  // window.addEventListener("load", function() { ... });
  normalized = unwrap(
    /window\.addEventListener\(\s*['"]load['"]\s*,\s*(?:async\s*)?function\s*\([^)]*\)\s*\{([\s\S]*?)\}\s*\)\s*;?/g,
    normalized,
  );

  // window.addEventListener("load", () => { ... });
  normalized = unwrap(
    /window\.addEventListener\(\s*['"]load['"]\s*,\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*\)\s*;?/g,
    normalized,
  );

  // document.addEventListener("DOMContentLoaded", function() { ... });
  normalized = unwrap(
    /document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*(?:async\s*)?function\s*\([^)]*\)\s*\{([\s\S]*?)\}\s*\)\s*;?/g,
    normalized,
  );

  // document.addEventListener("DOMContentLoaded", () => { ... });
  normalized = unwrap(
    /document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{([\s\S]*?)\}\s*\)\s*;?/g,
    normalized,
  );

  return normalized.trim();
}

export function extractScripts(tree: Root): string {
  let js = "";

  visit(tree, "element", (node: Element, index, parent) => {
    if (node.tagName !== "script") {
      return;
    }

    js += node.children
      .filter((child): child is Text => child.type === "text")
      .map((child) => child.value)
      .join("\n");

    // Remove the <script> element from the HTML
    if (parent && typeof index === "number") {
      parent.children.splice(index, 1);
    }
  });

  return js.trim();
}
