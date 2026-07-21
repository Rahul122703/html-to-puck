import { rootConfig } from "./rootConfig";
import { CompilerContext } from "./types";

export function createContext(): CompilerContext {
  return {
    fields: [...rootConfig.fields],
  };
}
