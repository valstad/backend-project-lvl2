import _ from 'lodash';
import { isObject } from '../util.js';

const f = (val) => {
  if (isObject(val)) return '[complex value]';
  if (_.isString(val)) return `'${val}'`;
  return val;
};

export default (data) => {
  const iter = (tree, path, init) => Object
    .entries(tree)
    .reduce((acc, [key, value]) => {
      const newPath = [...path, key];
      switch (value.type) {
        case 'nested': return iter(value.value, newPath, acc);
        case 'added':
          return [...acc, `Property '${newPath.join('.')}' was added with value: ${f(value.valueAdd)}`];
        case 'removed':
          return [...acc, `Property '${newPath.join('.')}' was removed`];
        case 'updated':
          return [...acc, `Property '${newPath.join('.')}' was updated. From ${f(value.valueRem)} to ${f(value.valueAdd)}`];
        default: return acc;
      }
    }, init);
  return iter(data, [], []).join('\n');
};
