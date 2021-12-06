import _ from 'lodash';

export default (obj1, obj2) => {
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
