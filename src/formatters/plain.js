import _ from 'lodash';
import { isObject } from '../util.js';

const stringify = (data) => {
  const f = (val) => {
    if (isObject(val)) return '[complex value]';
    if (_.isString(val)) return `'${val}'`;
    return val;
  };

  const iter = (tree, path, init) => Object
    .entries(tree)
    .reduce((acc, [key, value]) => {
      const nextType = value.type;
      const newPath = [...path, key];
      if (nextType === 'nested') {
        return iter(value.value, newPath, acc);
      }
      if (nextType === 'added') {
        return [...acc, `Property '${newPath.join('.')}' was added with value: ${f(value.valueAdd)}`];
      }
      if (nextType === 'removed') {
        return [...acc, `Property '${newPath.join('.')}' was removed`];
      }
      if (nextType === 'updated') {
        return [...acc, `Property '${newPath.join('.')}' was updated. From ${f(value.valueRem)} to ${f(value.valueAdd)}`];
      }
      return acc;
    }, init);
  return iter(data, [], []).join('\n');
};

export default stringify;
