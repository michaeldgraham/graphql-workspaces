#!/usr/bin/env node
const yargs = require("yargs");

yargs
  .commandDir("./commands")
  .scriptName("gqw")
  .example("", "")
  .demandCommand().argv;