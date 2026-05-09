import _ from 'lodash'

const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value
  }
  const indent = ' '.repeat(depth * 4 + 4)
  const bracketIndent = ' '.repeat(depth * 4)
  const entries = Object.entries(value).map(
    ([k, v]) => `${indent}${k}: ${formatValue(v, depth + 1)}`,
  )
  return `{\n${entries.join('\n')}\n${bracketIndent}}`
}

const formatDiff = (diff, depth = 0) => {
  const indent = ' '.repeat(depth * 4 + 2)

  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: {\n${formatDiff(node.children, depth + 1)}\n${indent}  }`
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
        ]
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth + 1)}`
      default:
        return ''
    }
  })

  return lines.join('\n')
}

const stylish = diff => `{\n${formatDiff(diff)}\n}`

export default stylish
