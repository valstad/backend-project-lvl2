import { isObject } from '../util.js';

const f = (tab1, tab2, key, val) => (
  `${tab1}${tab2}${key}: ${val}`
);

export default (data, replacer = ' ', spacesCount = 4) => {
  const spacer = replacer.repeat(spacesCount);
  const spaceAdd = `${replacer.repeat(spacesCount - 2)}+ `;
  const spaceRem = `${replacer.repeat(spacesCount - 2)}- `;

  const iter = (tree, depth) => {
    if (!isObject(tree)) {
      return `${tree}`;
    }
    const tab = spacer.repeat(depth);
    const result = Object
      .entries(tree)
      .map(([key, value]) => {
        switch (value.type) {
          case 'nested': return f(tab, spacer, key, iter(value.value, depth + 1));
          case 'added': return f(tab, spaceAdd, key, iter(value.valueAdd, depth + 1));
          case 'removed': return f(tab, spaceRem, key, iter(value.valueRem, depth + 1));
          case 'updated': return [
            f(tab, spaceRem, key, iter(value.valueRem, depth + 1)),
            f(tab, spaceAdd, key, iter(value.valueAdd, depth + 1)),
          ].join('\n');
          case 'intacted': return f(tab, spacer, key, value.value);
          default: return f(tab, spacer, key, iter(value, depth + 1));
        }
      });
    return ['{', ...result, `${tab}}`].join('\n');
  };
  return iter(data, 0);
};
