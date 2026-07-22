import { format } from "prettier/standalone";
import * as parserTypeScript from "prettier/plugins/typescript";
import * as parserEstree from "prettier/plugins/estree";

import { type CompilerContext } from "../types";
import { CodeExpression } from "../utils/jsx";
import { generateProps } from "./props";
import { generateRender } from "./render";
import { generateFields } from "./fields";

export async function generateComponent(
  componentName: string,
  tree: any,
  context: CompilerContext,
) {
  const props = generateProps(context);
  const render = generateRender(tree, componentName, context.fields);
  const fields = generateFields(context);

  const imports = [`import { ComponentConfig } from "@puckeditor/core";`];

  // Type imports
  const typeImports: string[] = [];

  if (context.fields.some((field) => field.propType === "ColorValue")) {
    typeImports.push("ColorValue");
  }

  if (context.fields.some((field) => field.propType === "SpacingValue")) {
    typeImports.push("SpacingValue");
  }

  if (typeImports.length > 0) {
    imports.push(
      `import type { ${typeImports.join(", ")} } from "@/builder/types/customFields.types";`,
    );
  }

  // Helper imports
  if (context.fields.some((field) => field.richTextImport)) {
    imports.push(
      `import { richTextNoHeading } from "@/builder/utils/richTextNoHeading";`,
    );
  }

  const usesColorField = context.fields.some(
    (field) =>
      field.config instanceof CodeExpression &&
      field.config.code.includes("createColorField"),
  );

  const usesSpacingField = context.fields.some(
    (field) =>
      field.config instanceof CodeExpression &&
      field.config.code.includes("createSpacingField"),
  );

  if (usesColorField || usesSpacingField) {
    const helpers: string[] = [];

    if (usesColorField) {
      helpers.push("createColorField");
    }

    if (usesSpacingField) {
      helpers.push("createSpacingField");
    }

    imports.push(
      `import { ${helpers.join(", ")} } from "@/builder/components/customFields";`,
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
