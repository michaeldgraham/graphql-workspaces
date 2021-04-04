import { parse, extname } from "path";
/**
 * Checks whether pattern has at least 1 extension name prefix.
 * @param pattern The absolute path to a directory or file
 */
export const isPrefixedExtName = (pattern = "") => 
  parse(pattern).base.split('.').length > 2;
/**
 * Checks whether pattern has a GraphQL type extension name.
 * @param pattern The absolute path to a directory or file
 */
export const isGraphQLExtName = (pattern = "") => {
  const exname = extname(pattern);
  return exname === ".graphql" || exname === ".gql";
};