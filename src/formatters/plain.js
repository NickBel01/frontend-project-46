import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return value
}

const formatDiff = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const property = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
      case 'nested':
        return formatDiff(node.children, property)
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${property}' was removed`
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'unchanged':
        return []
      default:
        return []
    }
  })

  return lines.join('\n')
}

const plain = diff => formatDiff(diff)

export default plain
