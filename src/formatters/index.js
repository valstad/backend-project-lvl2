import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (data, formatter) => {
  if (formatter === 'stylish') return stylish(data);
  if (formatter === 'plain') return plain(data);
  if (formatter === 'json') return json(data);
  throw new Error('Unknown formatter');
};
