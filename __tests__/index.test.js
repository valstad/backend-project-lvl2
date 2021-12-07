import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let result;

beforeEach(() => {
  const resultpath = getFixturePath('result.txt');
  result = readFileSync(resultpath, 'utf8');
});

test('JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(diff(filepath1, filepath2)).toBe(result.trim());
});

test('yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');
  expect(diff(filepath1, filepath2)).toBe(result.trim());
});
