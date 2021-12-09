import path from 'path';
import { readFileSync } from 'fs';
import parse from './parser.js';
import formate from './formatters/index.js';
import makeDiff from './makeDiff.js';

export default (filepath1, filepath2, formatter = 'stylish') => {
  const absPath1 = path.resolve(filepath1);
  const absPath2 = path.resolve(filepath2);
  const data1 = readFileSync(absPath1, 'utf8');
  const data2 = readFileSync(absPath2, 'utf8');
  const ext1 = path.extname(absPath1);
  const ext2 = path.extname(absPath2);
  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);
  const result = makeDiff(obj1, obj2);
  return formate(result, formatter);
};
