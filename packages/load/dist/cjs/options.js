"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = void 0;
const esm_1 = __importDefault(require("esm"));
const path_js_1 = require("./path.js");
const fs_1 = require("fs");
const esmRequire = esm_1.default(module);
/**
 * Merges the default config for loadTypeDefs with provided config.
 * @param config The config provided to loadTypeDefs
 */
const setConfig = (config = {}, debug = false) => (Object.assign({ 
    // Configures use of below custom requireMethod
    // for all files targeted by graphql-tools.loadFiles
    useRequire: true, requireMethod: (absPath) => {
        if (path_js_1.isGraphQLExtName(absPath)) {
            if (!path_js_1.isPrefixedExtName(absPath)) {
                return fs_1.readFileSync(absPath, { encoding: 'utf-8' });
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
            if (debug === true) {
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
    exportNames: [] }, config));
exports.setConfig = setConfig;
