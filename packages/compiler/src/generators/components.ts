import { format } from "prettier";

import { CompilerContext } from "../types";
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

  const source = `
import { ComponentConfig } from "@puckeditor/core";

export interface ${componentName}Props {
${props}
}

export const ${componentName}: ComponentConfig<${componentName}Props> = {
  fields: ${fields},

  defaultProps: {
${context.fields
  .map((f) => `    ${f.name}: ${JSON.stringify(f.defaultValue)},`)
  .join("\n")}
  },

${render}
};
`;

  return await format(source, {
    parser: "typescript",
    semi: true,
    singleQuote: true,
    trailingComma: "all",
  });
}
