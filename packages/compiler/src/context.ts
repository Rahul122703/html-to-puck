import { rootConfig } from "./rootConfig";
import { type CompilerContext } from "./types";

export function createContext(): CompilerContext {
  return {
    fields: [...rootConfig.fields],
  };
}
