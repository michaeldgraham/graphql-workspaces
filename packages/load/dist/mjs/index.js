import { loadFiles, loadFilesSync, mergeTypeDefs } from "graphql-tools";
import { extractDocumentsFromFiles, extractDefinitionsFromDocuments } from "./extract.js";
import { setConfig } from "./options.js";
/**
 * Synchronously loads GraphQL Documents using the provided glob pattern.
 * @param pattern Glob pattern or patterns to use when loading files
 * @param options Additional options
 */
export const loadWorkspace = async (pattern = "", config = {}) => {
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
export const loadWorkspaceSync = (pattern = "", config = {}) => {
    const files = loadFilesSync(pattern, setConfig(config));
    const documents = extractDocumentsFromFiles(files);
    const definitions = extractDefinitionsFromDocuments(documents);
    return mergeTypeDefs(definitions);
};
