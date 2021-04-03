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
const { loadFiles, loadFilesSync, mergeTypeDefs } = require("graphql-tools");
const { extractDocumentsFromFiles, extractDefinitionsFromDocuments, } = require("../extract.js");
const { setConfig } = require("./config.js");
/**
 * Synchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
const loadWorkspace = (pattern = "", config = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield loadFiles(pattern, setConfig(config));
    const documents = extractDocumentsFromFiles(files);
    const definitions = extractDefinitionsFromDocuments(documents);
    return mergeTypeDefs(definitions);
});
/**
 * Asynchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
const loadWorkspaceSync = (pattern = "", config = {}) => {
    const files = loadFilesSync(pattern, setConfig(config));
    const documents = extractDocumentsFromFiles(files);
    const definitions = extractDefinitionsFromDocuments(documents);
    return mergeTypeDefs(definitions);
};
module.exports = {
    loadWorkspace,
    loadWorkspaceSync,
};
