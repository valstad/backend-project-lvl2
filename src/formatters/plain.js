import _ from 'lodash';

const isObject = (something) => Object.prototype.toString.call(something) === '[object Object]';

const stringify = (data) => {
  const f = (val) => {
    if (isObject(val)) return '[complex value]';
    if (_.isString(val)) return `'${val}'`;
    return val;
  };

  const iter = (tree, path, init) => {
    if (!isObject(tree)) {
      return `${tree}`;
    }
    const result = Object
      .entries(tree)
      .reduce((acc, [key, value]) => {
        if (!_.has(value, 'type')) {
          return acc;
        }
        const nextType = value.type;
        const newPath = [...path, key];

        if (nextType === 'added') {
          return [...acc, `Property '${newPath.join('.')}' was added with value: ${f(value.valueAdd)}`];
        }
        if (nextType === 'removed') {
          return [...acc, `Property '${newPath.join('.')}' was removed`];
        }
        if (nextType === 'updated') {
          return [...acc, `Property '${newPath.join('.')}' was updated. From ${f(value.valueRem)} to ${f(value.valueAdd)}`];
        }
        if (nextType === 'equal') {
          return acc;
        }
        return iter(value.value, newPath, acc);
      }, init);
    return result;
  };
  return iter(data, [], []).join('\n');
};

export default stringify;
