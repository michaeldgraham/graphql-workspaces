"use strict";
const { loadFiles, loadFilesSync, mergeTypeDefs } = require("graphql-tools");
const { extractDocumentsFromFiles, extractDefinitionsFromDocuments, } = require("../extract.js");
const { setConfig } = require("./config.js");
/**
 * Synchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
const loadWorkspace = async (pattern = "", config = {}) => {
    const files = await loadFiles(pattern, setConfig(config));
    const documents = extractDocumentsFromFiles(files);
    const definitions = extractDefinitionsFromDocuments(documents);
    return mergeTypeDefs(definitions);
};
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
