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
const path = require('path');
const { loadWorkspace } = require('@graphql-workspaces/load');
const { isPrefixedExtName } = require('../path');
const { printWithComments } = require('graphql-tools');
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
    });
};
const printer = (absPath = "", pattern = "", name) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = path.parse(absPath);
    const fileName = parsed.name;
    if (fileName) {
        // delete require.cache[path.resolve(absPath)];
        const loaded = yield loadWorkspace(pattern);
        const extname = parsed.ext === ".graphql" ? parsed.ext : ".graphql"; // TODO1 test this, wtf is it really doing here lol?
        const printPath = path.format(Object.assign(Object.assign({}, parsed), { base: `${fileName}.${name}${extname}` }));
        const definitions = loaded.definitions || [];
        if (definitions.length) {
            const formatted = printWithComments(loaded);
            fs.createWriteStream(printPath).write(formatted);
        }
    }
});
const isValidAbsolutePath = (absPath = "", debug) => {
    const separated = absPath.split(path.sep);
    const isPrefixedExt = isPrefixedExtName(absPath);
    const isIgnored = separated.some(path => isIgnoredPath(path));
    if (debug && isIgnored)
        console.error(`\n[graphql-workspaces] File path is ignored using ignorefs ^3.14.0\n`);
    else if (debug && isPrefixedExt)
        console.error(`\n[graphql-workspaces] File path is already generated or contains multiple extensions.\n`);
    return !isPrefixedExt && !isIgnored;
};
const handler = ({ "path": pattern, "debug": debug, "name": name }) => {
    const absPath = path.resolve(pattern);
    if (pattern) {
        fs.exists(absPath, (exists) => {
            if (!exists)
                throw new Error(`Nothing exists at the path: ${absPath}`);
            fs.lstat(absPath, (err) => {
                if (err)
                    throw new Error(`Invalid path: ${absPath}`);
                if (isValidAbsolutePath(absPath, debug))
                    printer(absPath, pattern, name);
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
