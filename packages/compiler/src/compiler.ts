import { parse } from "./parser";
import { createContext } from "./context";
import { visitText } from "./visitors/text";
import { visitImages } from "./visitors/image";
import { visitLinks } from "./visitors/link";
import { visitButtons } from "./visitors/button";
import { sanitize } from "./utils/sanitizer";
import { resetUniqueNames } from "./utils/naming";

const visitors = [visitText, visitImages, visitLinks, visitButtons];

export function compile(html: string) {
  const tree = parse(html);

  console.log(tree.type);
  console.log(tree);
  resetUniqueNames();

  const context = createContext();
  const cleanedTree = sanitize(tree);

  for (const visitor of visitors) {
    visitor(cleanedTree, context);
  }

  console.log(tree);

  return {
    tree,
    context,
  };
}
