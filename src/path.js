const path = require("path");
/**
 * Checks whether pattern has at least 1 extension name prefix.
 * @param pattern The absolute path to a directory or file
 */
const isPrefixedExtName = (pattern = "") => 
  path.parse(pattern).base.split('.').length > 2;
/**
 * Checks whether pattern has a GraphQL type extension name.
 * @param pattern The absolute path to a directory or file
 */
const isGraphQLExtName = (pattern = "") => {
  const exname = path.extname(pattern);
  return exname === ".graphql" || exname === ".gql";
};

module.exports = {
  isGraphQLExtName,
  isPrefixedExtName
};