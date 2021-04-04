"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGraphQLExtName = exports.isPrefixedExtName = void 0;
const path_1 = require("path");
/**
 * Checks whether pattern has at least 1 extension name prefix.
 * @param pattern The absolute path to a directory or file
 */
const isPrefixedExtName = (pattern = "") => path_1.parse(pattern).base.split('.').length > 2;
exports.isPrefixedExtName = isPrefixedExtName;
/**
 * Checks whether pattern has a GraphQL type extension name.
 * @param pattern The absolute path to a directory or file
 */
const isGraphQLExtName = (pattern = "") => {
    const exname = path_1.extname(pattern);
    return exname === ".graphql" || exname === ".gql";
};
exports.isGraphQLExtName = isGraphQLExtName;
