import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  return `File 1: ${JSON.stringify(data1)}\nFile 2: ${JSON.stringify(data2)}`
}

export default genDiff
