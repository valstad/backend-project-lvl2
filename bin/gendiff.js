#!/usr/bin/env node

// This is used as an example in the README for:
//    Common option types, boolean and value

import commander from 'commander';
const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');


program.parse(process.argv);
