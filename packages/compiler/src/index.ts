import fs from "node:fs";
import path from "node:path";

import { compile } from "./compiler";
import { generateComponent } from "./generators/components";

const INPUT_DIR = path.resolve("html");
const OUTPUT_DIR = path.resolve("generated");

fs.mkdirSync(OUTPUT_DIR, {
  recursive: true,
});

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((file) => file.endsWith(".html"));

for (const file of files) {
  const input = path.join(INPUT_DIR, file);

  const componentName = toPascalCase(path.basename(file, ".html"));

  const html = fs.readFileSync(input, "utf8");

  const { tree, context, css } = compile(html);

  const component = await generateComponent(componentName, tree, context, css);

  const output = path.join(OUTPUT_DIR, `${componentName}.tsx`);

  fs.writeFileSync(output, component);

  console.log(`✔ Generated ${output}`);
}

function toPascalCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
