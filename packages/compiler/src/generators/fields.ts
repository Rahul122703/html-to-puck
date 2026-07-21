import { type CompilerContext } from "../types";

export function generateFields(context: CompilerContext) {
  return JSON.stringify(
    context.fields.reduce(
      (acc, field) => {
        acc[field.name] = {
          type: field.type,
        };

        return acc;
      },
      {} as Record<string, unknown>,
    ),
    null,
    2,
  );
}
