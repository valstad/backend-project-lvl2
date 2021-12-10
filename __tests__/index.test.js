import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import diff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('stylish', () => {
  const result = readFileSync(getFixturePath('resultStylish.txt'), 'utf8');

  test('JSON stylish', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(diff(filepath1, filepath2)).toBe(result.trim());
  });

  test('yaml stylish', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yaml');
    expect(diff(filepath1, filepath2)).toBe(result.trim());
  });
});

describe('plain', () => {
  const result = readFileSync(getFixturePath('resultPlain.txt'), 'utf8');

  test('JSON plain', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(diff(filepath1, filepath2, 'plain')).toBe(result.trim());
  });

  test('yaml plain', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yaml');
    expect(diff(filepath1, filepath2, 'plain')).toBe(result.trim());
  });
});
