import fs from 'fs'
import path from 'path'

const getAbsolutePath = (filepath) => {
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  return path.resolve(process.cwd(), filepath)
}

// Функция чтения и парсинга JSON
const parseFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')

  const extension = path.extname(filepath).toLowerCase()
  if (extension === '.json') {
    return JSON.parse(fileContent)
  }
  // Если неизвестный формат  ошибка
  throw new Error(`Unsupported file format: ${extension}`)
}

export default parseFile
