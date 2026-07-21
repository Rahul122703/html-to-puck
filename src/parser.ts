import { unified } from "unified";
import rehypeParse from "rehype-parse";

export function parse(html: string) {
  return unified().use(rehypeParse, { fragment: true }).parse(html);
}
