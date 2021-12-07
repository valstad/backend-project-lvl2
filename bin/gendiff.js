#!/usr/bin/env node

// This is used as an example in the README for:
//    Common option types, boolean and value

import commander from 'commander';
import diff from '../index.js';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = diff(filepath1, filepath2);
    console.log(result);
  });

program.parse(process.argv);
