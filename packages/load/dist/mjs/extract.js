import { parse, isTypeExtensionNode } from 'graphql';
import { isDocumentNode } from 'graphql-tools';
import isObject from 'lodash.isobject';
/**
 * Extracts GraphQL Documents from loaded files.
 * @param files The files to extract from
 */
export const extractDocumentsFromFiles = (files = []) => files.flatMap(file => {
    if (isDocumentNode(file))
        return file;
    else if (isObject(file))
        return extractDocumentsFromFile(file);
    if (file) {
        try {
            return parse(file);
        }
        catch (err) {
            return {};
        }
    }
    else
        return {};
});
/**
 * Extracts GraphQL AST definitions from a loaded file.
 * @param file
 */
const extractDocumentsFromFile = (file = {}) => Object.values(file).filter(exported => isDocumentNode(exported));
/**
 * Extracts GraphQL AST definitions from GraphQL Documents.
 * @param documents The documents to extract from
 */
export const extractDefinitionsFromDocuments = (documents = []) => {
    const definitions = documents.flatMap(doc => doc.definitions);
    return definitions.sort(node => isTypeExtensionNode(node) ? 1 : -1);
};
