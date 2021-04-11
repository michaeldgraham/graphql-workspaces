import esm from 'esm';
import { isGraphQLExtName, isPrefixedExtName } from './path.js';
import { readFileSync } from 'fs';

const esmRequire = esm(module);

/**
 * Merges the default config for loadTypeDefs with provided config.
 * @param config The config provided to loadTypeDefs
 */
export const setConfig = (config = {}, debug = false) => ({
  // Configures use of below custom requireMethod
  // for all files targeted by graphql-tools.loadFiles
  useRequire: true,
  requireMethod: (absPath) => {
    if(isGraphQLExtName(absPath)) {
      if(!isPrefixedExtName(absPath)) {
        return readFileSync(absPath, { encoding: 'utf-8' });
      }
      // Do not import .graphql / .gql files with an extname prefix
      // e.g., type.workspace.graphql, etc.
      return {};
    }
    let imported = {};
    try{
      imported = esmRequire(absPath);
    }
    catch(err) {
      if(debug === true) {
        // Log module import errors
        console.error(err);
      }
    }
    finally {
      return imported;
    }
  },
  // Configures all export names to be structured the same way
  // by preventing graphql-tools.loadFiles from extracting values
  // from expected default export names, e.g. typeDefs, typeDef
  exportNames: [],
  ...config
});
