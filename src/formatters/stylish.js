import { isObject } from '../util.js';

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
        const nextType = value.type;
        if (nextType === 'nested') {
          return f(tab, spacer, key, iter(value.value, depth + 1));
        }
        const rem = f(tab, spaceRem, key, iter(value.valueRem, depth + 1));
        const add = f(tab, spaceAdd, key, iter(value.valueAdd, depth + 1));
        if (nextType === 'added') return add;
        if (nextType === 'removed') return rem;
        if (nextType === 'updated') return [rem, add].join('\n');
        if (nextType === 'equal') return f(tab, spacer, key, value.value);
        return f(tab, spacer, key, iter(value, depth + 1));
      });
    return ['{', ...result, `${tab}}`].join('\n');
  };
  return iter(data, 0);
};

export default stringify;
