const { loadWorkspace } = require('@graphql-workspaces/load');
const { print } = require('graphql');
const path = require('path');
const { isPrefixedExtName } = require('../path');
const fs = require("fs");
const { isIgnoredPath } = require('ignorefs');

const command = "print <path|p>";

const describe = "Prints the merged GraphQL Documents at the provided path.";

const aliases = ["p"];

const builder = (yargs) => {
  yargs
    .positional("path", {
      description: "The path to the file or directory to print",
      string: true
    })
    .option("name", {
      alias: "n",
      description: "Sets file extension suffixed before .graphql",
      string: true,
      default: "printed"
    })
    .option("debug", {
      alias: "d",
      description: "Sets the printer to explain edge cases",
      boolean: true,
      default: false
    })
};

const printer = async (absPath = "", pattern = "", name) => {
  const parsed = path.parse(absPath);
  const fileName = parsed.name;
  if(fileName) {
    const loaded = await loadWorkspace(pattern);
    const printPath = path.format({
      ...parsed,
      base: `${fileName}.${name}.graphql`
    });
    const definitions = loaded.definitions || [];
    if(definitions.length) {
      const formatted = print(loaded);
      fs.createWriteStream(printPath).write(formatted);
    }
  }
};

const isValidAbsolutePath = (absPath = "", debug) => {
  const separated = absPath.split(path.sep);
  const isPrefixedExt = isPrefixedExtName(absPath); 
  const isIgnored = separated.some(path => isIgnoredPath(path));
  if(debug && isIgnored) console.error(`\n[graphql-workspaces] File path is ignored using ignorefs ^3.14.0\n`);
  else if(debug && isPrefixedExt) console.error(`\n[graphql-workspaces] File path is already generated or contains multiple extensions.\n`);      
  return !isPrefixedExt && !isIgnored;
};

const handler = ({
  "path": pattern,
  "debug": debug,
  "name": name
}) => {
  const absPath = path.resolve(pattern);
  if(pattern) {
    fs.exists(absPath, (exists) => {
      if(!exists) throw new Error(`Nothing exists at the path: ${absPath}`);
      fs.lstat(absPath, (err) => {
        if(err) throw new Error(`Invalid path: ${absPath}`);
        if(isValidAbsolutePath(absPath, debug)) printer(absPath, pattern, name);
      });
    });
  }
};

const deprecated = false;

module.exports = {
  command,
  aliases,
  describe,
  builder,
  handler,
  deprecated
};