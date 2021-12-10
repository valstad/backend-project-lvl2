import _ from 'lodash';
import { isObject } from './util.js';

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedUniqKeys = _.sortBy(uniqKeys);
  const diff = sortedUniqKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: { type: 'added', valueAdd: obj2[key] } };
    }
    if (!_.has(obj2, key)) {
      return { ...acc, [key]: { type: 'removed', valueRem: obj1[key] } };
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { ...acc, [key]: { type: 'nested', value: makeDiff(obj1[key], obj2[key]) } };
    }
    if (obj1[key] === obj2[key]) {
      return { ...acc, [key]: { type: 'intacted', value: obj1[key] } };
    }
    return { ...acc, [key]: { type: 'updated', valueAdd: obj2[key], valueRem: obj1[key] } };
  }, {});
  return diff;
};

export default makeDiff;
