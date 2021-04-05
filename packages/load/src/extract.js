const { isDocumentNode, printSchemaWithDirectives, parseGraphQLSDL } = require('graphql-tools');
const isObject = require('lodash.isobject');
/**
 * Extracts GraphQL Documents from loaded files.
 * @param files The files to extract from
 */
const extractDocumentsFromFiles = (files = []) => files.flatMap(file => {
  // Default exports is a GraphQL Dcument
  if(isDocumentNode(file)) return file;
  // An object of imported exports from a module
  else if(isObject(file)) return extractDocumentsFromFile(file);
  else if(file) {
    // Try to parse SDL
    try {
      return parseGraphQLSDL("0", file).document;
    }
    catch(err) {
      // console.error(err);
    }
  }
  return {};
});
/**
 * Extracts GraphQL AST definitions from a loaded file.
 * @param file
 */
const extractDocumentsFromFile = (file = {}) => 
  Object.values(file).flatMap(exported => {
    if(isDocumentNode(exported)) return exported;
    try {
      // Try to print as a schema with directives and parse it to a GraphQL Document
      return parseGraphQLSDL("0", printSchemaWithDirectives(exported)).document;
    }
    catch(err) {
      // If not a schema, error = schema.getTypeMap is not a function 
      // console.error(err);
    }
    try {
      // Try to parse as SDL
      return parseGraphQLSDL("0", file).document
    }
    catch(err) {
      // console.error(err);
    }
    return {};
  });
/**
 * Extracts GraphQL AST definitions from GraphQL Documents.
 * @param documents The documents to extract from
 */
const extractDefinitionsFromDocuments = (documents = []) => {
  return documents.flatMap(doc => doc.definitions);
};

module.exports = {
  extractDocumentsFromFiles,
  extractDefinitionsFromDocuments
};