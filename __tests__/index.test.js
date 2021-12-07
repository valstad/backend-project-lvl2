import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, path } from 'path';
import { readFileSync } from 'fs';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('init', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const resultpath = getFixturePath('result.txt');
  const result = readFileSync(resultpath, 'utf8');
  expect(diff(filepath1, filepath2)).toBe(result.trim());
  const anotherfile = getFixturePath('another.txt');
  expect(diff(filepath1, anotherfile)).toBe('unsupported file format');
});
