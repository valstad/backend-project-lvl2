import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedUniqKeys = _.sortBy(uniqKeys);
  const diff = ['{'];
  sortedUniqKeys.forEach((key) => {
    if (obj1[key] === undefined) {
      diff.push(`  + ${key}: ${obj2[key]}`);
    } else if (obj2[key] === undefined) {
      diff.push(`  - ${key}: ${obj1[key]}`);
    } else if (obj1[key] === obj2[key]) {
      diff.push(`    ${key}: ${obj1[key]}`);
    } else {
      diff.push(`  - ${key}: ${obj1[key]}`);
      diff.push(`  + ${key}: ${obj2[key]}`);
    }
  });
  diff.push('}');
  return diff.join('\n');
  // return `${JSON.stringify(keys1)}\n${JSON.stringify(keys2)}`;
};

export default (filepath1, filepath2) => {
  const absPath1 = path.resolve(filepath1);
  const absPath2 = path.resolve(filepath2);
  const file1 = readFileSync(absPath1, 'utf8');
  const file2 = readFileSync(absPath2, 'utf8');
  const ext1 = path.extname(absPath1);
  const ext2 = path.extname(absPath2);
  if (ext1 === '.json' && ext2 === '.json') {
    const obj1 = JSON.parse(file1);
    const obj2 = JSON.parse(file2);
    const result = makeDiff(obj1, obj2);
    return(result);
  } else {
    return('unsupported file format');
  }
};
