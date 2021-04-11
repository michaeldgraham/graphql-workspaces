"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWorkspaceSync = exports.loadWorkspace = void 0;
const graphql_tools_1 = require("graphql-tools");
const extract_js_1 = require("./extract.js");
const options_js_1 = require("./options.js");
const mergeOptions = {
    sort: true,
    convertExtensions: true,
    throwOnConflict: true,
    useSchemaDefinition: false
};
/**
 * Synchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
const loadWorkspace = (pattern = "", config = {}, debug = false) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield graphql_tools_1.loadFiles(pattern, options_js_1.setConfig(config, debug));
    const documents = extract_js_1.extractDocumentsFromFiles(files, debug);
    const definitions = extract_js_1.extractDefinitionsFromDocuments(documents);
    return graphql_tools_1.mergeTypeDefs(definitions, mergeOptions);
});
exports.loadWorkspace = loadWorkspace;
/**
 * Asynchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
const loadWorkspaceSync = (pattern = "", config = {}, debug = false) => {
    const files = graphql_tools_1.loadFilesSync(pattern, options_js_1.setConfig(config, debug));
    const documents = extract_js_1.extractDocumentsFromFiles(files, debug);
    const definitions = extract_js_1.extractDefinitionsFromDocuments(documents);
    return graphql_tools_1.mergeTypeDefs(definitions, mergeOptions);
};
exports.loadWorkspaceSync = loadWorkspaceSync;
