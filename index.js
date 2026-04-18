const genDiff = (filepath1, filepath2, format = 'stylish') => {
    return `Comparing ${filepath1} and ${filepath2} in ${format} format`
}

export default genDiff