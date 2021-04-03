"use strict";
const esmRequire = require("esm")(module, { cache: false, cjs: { cache: false }, force: true });
const { isGraphQLExtName, isPrefixedExtName } = require('../path.js');
const fs = require('fs');
/**
 * Merges the default config for loadTypeDefs with provided config.
 * @param config The config provided to loadTypeDefs
 */
const setConfig = (config = {}) => (Object.assign({ 
    // Configures use of below custom requireMethod
    // for all files targeted by graphql-tools.loadFiles
    useRequire: true, requireMethod: (absPath) => {
        if (isGraphQLExtName(absPath)) {
            if (!isPrefixedExtName(absPath)) {
                return fs.readFileSync(absPath, { encoding: 'utf-8' });
            }
            // Do not import .graphql / .gql files with an extname prefix
            // e.g., type.workspace.graphql, etc.
            return {};
        }
        let imported = {};
        try {
            imported = esmRequire(absPath);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            return imported;
        }
    }, 
    // Configures all export names to be structured the same way
    // by preventing graphql-tools.loadFiles from extracting values
    // from expected default export names, e.g. typeDefs, typeDef
    exportNames: [] }, config));
module.exports = {
    setConfig
};
