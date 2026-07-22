import { format } from "prettier/standalone";
import * as parserTypeScript from "prettier/plugins/typescript";
import * as parserEstree from "prettier/plugins/estree";

import { type CompilerContext } from "../types";
import { CodeExpression } from "../utils/jsx";
import { generateProps } from "./props";
import { generateRender } from "./render";
import { generateFields } from "./fields";
import { needsMotion } from "../utils/needsMotion";

export async function generateComponent(
  componentName: string,
  tree: any,
  context: CompilerContext,
  css: string,
) {
  const props = generateProps(context);
  const render = generateRender(tree, componentName, context.fields, css);
  const fields = generateFields(context);

  const imports = [`import { ComponentConfig } from "@puckeditor/core";`];

  if (needsMotion(tree)) {
    imports.push(`import { motion } from "motion/react";`);
  }

  const typeImports = new Set<string>();

  for (const field of context.fields) {
    if (field.propType) {
      typeImports.add(field.propType);
    }
  }

  typeImports.delete("string");
  typeImports.delete("boolean");
  typeImports.delete("number");

  if (typeImports.size > 0) {
    imports.push(
      `import type { ${[...typeImports].join(", ")} } from "@/builder/types/customFields.types";`,
    );
  }

  if (context.fields.some((field) => field.richTextImport)) {
    imports.push(
      `import { richTextNoHeading } from "@/builder/utils/richTextNoHeading";`,
    );
  }

  const helperImports = new Set<string>();

  for (const field of context.fields) {
    if (!(field.config instanceof CodeExpression)) continue;

    const code = field.config.code;

    if (code.includes("createColorField")) {
      helperImports.add("createColorField");
    }

    if (code.includes("createSpacingField")) {
      helperImports.add("createSpacingField");
    }
  }

  if (helperImports.size > 0) {
    imports.push(
      `import { ${[...helperImports].join(", ")} } from "@/builder/components/customFields";`,
    );
  }

  const defaultProps = context.fields
    .map((field) => `    ${field.name}: ${JSON.stringify(field.defaultValue)},`)
    .join("\n");

  const source = `
${imports.join("\n")}

export interface ${componentName}Props {
${props}
}

export const ${componentName}: ComponentConfig<${componentName}Props> = {
  fields: ${fields},

  defaultProps: {
${defaultProps}
  },

${render}
};
`;

  return await format(source, {
    parser: "typescript",
    plugins: [parserTypeScript, parserEstree],
    semi: true,
    singleQuote: true,
    trailingComma: "all",
  });
}
