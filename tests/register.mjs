import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const srcDir = fileURLToPath(new URL("../src/", import.meta.url));

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const file = pathToFileURL(path.join(srcDir, `${specifier.slice(2)}.ts`)).href;
      return nextResolve(file, context);
    }
    return nextResolve(specifier, context);
  },
});
