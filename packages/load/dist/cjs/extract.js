"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDefinitionsFromDocuments = exports.extractDocumentsFromFiles = void 0;
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const lodash_isobject_1 = __importDefault(require("lodash.isobject"));
/**
 * Extracts GraphQL Documents from loaded files.
 * @param files The files to extract from
 */
const extractDocumentsFromFiles = (files = []) => files.flatMap(file => {
    if (graphql_tools_1.isDocumentNode(file))
        return file;
    else if (lodash_isobject_1.default(file))
        return extractDocumentsFromFile(file);
    if (file) {
        try {
            return graphql_1.parse(file);
        }
        catch (err) {
            return {};
        }
    }
    else
        return {};
});
exports.extractDocumentsFromFiles = extractDocumentsFromFiles;
/**
 * Extracts GraphQL AST definitions from a loaded file.
 * @param file
 */
const extractDocumentsFromFile = (file = {}) => Object.values(file).filter(exported => graphql_tools_1.isDocumentNode(exported));
/**
 * Extracts GraphQL AST definitions from GraphQL Documents.
 * @param documents The documents to extract from
 */
const extractDefinitionsFromDocuments = (documents = []) => {
    const definitions = documents.flatMap(doc => doc.definitions);
    return definitions.sort(node => graphql_1.isTypeExtensionNode(node) ? 1 : -1);
};
exports.extractDefinitionsFromDocuments = extractDefinitionsFromDocuments;
