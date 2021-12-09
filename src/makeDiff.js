import _ from 'lodash';

const isObject = (something) => Object.prototype.toString.call(something) === '[object Object]';

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedUniqKeys = _.sortBy(uniqKeys);
  const diff = {};
  sortedUniqKeys.forEach((key) => {
    if (!_.has(obj1, key)) {
      diff[key] = { type: 'added', valueAdd: obj2[key] };
    } else if (!_.has(obj2, key)) {
      diff[key] = { type: 'removed', valueRem: obj1[key] };
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      diff[key] = { type: 'obj', value: makeDiff(obj1[key], obj2[key]) };
    } else if (obj1[key] === obj2[key]) {
      diff[key] = { type: 'equal', value: obj1[key] };
    } else {
      diff[key] = { type: 'updated', valueAdd: obj2[key], valueRem: obj1[key] };
    }
  });
  return diff;
};

export default makeDiff;
