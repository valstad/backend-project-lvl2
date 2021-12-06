#!/usr/bin/env node

// This is used as an example in the README for:
//    Common option types, boolean and value

import commander from 'commander';
import path from 'path';
import { readFileSync } from 'fs';
import diff from '../src/index.js';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const absPath1 = path.resolve(filepath1);
    const absPath2 = path.resolve(filepath2);
    const file1 = readFileSync(absPath1, 'utf8');
    const file2 = readFileSync(absPath2, 'utf8');
    const ext1 = path.extname(absPath1);
    const ext2 = path.extname(absPath2);
    if (ext1 === '.json' && ext2 === '.json') {
      const data1 = JSON.parse(file1);
      const data2 = JSON.parse(file2);
      const result = diff(data1, data2);
      console.log(result);
    } else {
      console.log('unsupported format');
    }
  });

program.parse(process.argv);
