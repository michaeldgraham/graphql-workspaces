#!/usr/bin/env node
"use strict";
const yargs = require("yargs");
yargs
    .commandDir("./commands")
    .scriptName("gqw")
    .example("", "")
    .demandCommand().argv;
