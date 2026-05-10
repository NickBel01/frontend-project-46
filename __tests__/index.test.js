import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFixture = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test('stylish format', () => {
  const filepath1 = getFixturePath('file3.json')
  const filepath2 = getFixturePath('file4.json')
  const expected = readFixture('expected_nested.txt')

  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expected)
})

test('plain format', () => {
  const filepath1 = getFixturePath('file3.json')
  const filepath2 = getFixturePath('file4.json')
  const expected = readFixture('expected_plain.txt')

  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected)
})
