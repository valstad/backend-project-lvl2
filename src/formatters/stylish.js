import _ from 'lodash';

const isObject = (something) => Object.prototype.toString.call(something) === '[object Object]';

const stringify = (data, replacer = ' ', spacesCount = 4) => {
  const spacer = replacer.repeat(spacesCount);
  const spaceAdd = `${replacer.repeat(spacesCount - 2)}+ `;
  const spaceRem = `${replacer.repeat(spacesCount - 2)}- `;
  const f = (tab1, tab2, key, val) => (
    `${tab1}${tab2}${key}: ${val}`
  );

  const iter = (tree, depth) => {
    if (!isObject(tree)) {
      return `${tree}`;
    }
    const tab = spacer.repeat(depth);
    const result = Object
      .entries(tree)
      .map(([key, value]) => {
        if (!_.has(value, 'type')) {
          return f(tab, spacer, key, iter(value, depth + 1));
        }
        const nextType = value.type;
        const rem = f(tab, spaceRem, key, iter(value.valueRem, depth + 1));
        const add = f(tab, spaceAdd, key, iter(value.valueAdd, depth + 1));
        if (nextType === 'added') return add;
        if (nextType === 'removed') return rem;
        if (nextType === 'updated') return `${rem}\n${add}`;
        return f(tab, spacer, key, iter(value.value, depth + 1));
      });
    return ['{', ...result, `${tab}}`].join('\n');
  };
  return iter(data, 0);
};

export default stringify;
