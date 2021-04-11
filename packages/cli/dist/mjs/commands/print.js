"use strict";
const { loadWorkspace } = require('@graphql-workspaces/load');
const { print } = require('graphql');
const path = require('path');
const { isPrefixedExtName } = require('../path');
const fs = require("fs");
const { isIgnoredPath } = require('ignorefs');
const concurrently = require('concurrently');
const chokidar = require('chokidar');
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
        .option("watch", {
        alias: "w",
        description: "Sets the printer to watch mode",
        boolean: true,
        default: false
    })
        .option("debug", {
        alias: "d",
        description: "Sets the printer to log errors to terminal",
        boolean: true,
        default: false
    });
};
const printer = async (absPath = "", pattern = "", name, debug) => {
    const parsed = path.parse(absPath);
    const fileName = parsed.name;
    if (fileName) {
        const loaded = await loadWorkspace(pattern, {}, debug);
        const printPath = path.format({
            ...parsed,
            base: `${fileName}.${name}.graphql`
        });
        const definitions = loaded.definitions || [];
        if (definitions.length) {
            const formatted = print(loaded);
            fs.writeFileSync(printPath, formatted);
        }
    }
};
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
const handler = ({ "path": pattern, "name": name, "watch": watch, "debug": debug }) => {
    const absPath = path.resolve(pattern);
    if (pattern) {
        fs.exists(absPath, (exists) => {
            if (!exists)
                throw new Error(`Nothing exists at the path: ${absPath}`);
            fs.lstat(absPath, (err) => {
                if (err)
                    throw new Error(`Invalid path: ${absPath}`);
                if (isValidAbsolutePath(absPath, debug)) {
                    // Run initial print - when called again in watch mode, 
                    // a ubprocesses is spawned by concurrently, handled below.
                    // Doing so prevents modules from being cached due when loaded
                    // from within the watcher process
                    printer(absPath, pattern, name, debug);
                }
            });
        });
        if (watch) {
            const watcher = chokidar.watch(pattern);
            // if watching a directory, path is contained in it
            // else its the same as a single, watched file 
            watcher.on('change', path => {
                // use concurrently to use gql in a subprocess to
                // run the print command, avoiding module caching
                // when using the printer function within the watcher
                concurrently([
                    {
                        name: 'gql',
                        command: `gql print ${pattern}${debug ? '--debug' : ''}`,
                        prefixColor: 'green',
                    },
                ], {
                    restartTries: 3,
                    prefix: '{time} {name} |',
                    timestampFormat: 'HH:mm:ss',
                })
                    .catch((e) => {
                    console.error(e.message);
                    watcher.close();
                });
            });
            // If concurrently is called at least once, SIGINT
            // no longer exists the watcher
            process.on('SIGINT', () => {
                watcher.close();
            });
        }
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
