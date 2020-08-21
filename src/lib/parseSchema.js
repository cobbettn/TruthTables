const parseSchema = (parseData) => {
  let depth = 0, maxDepth = 0, maxDepthIndeces = [], operator = [], letter = [], negation = [];
  parseData.schema.forEach((el, i) => {
    switch(el.elType) {
      case 'G':
        if (el.value === '(') {
          depth++;
          if (depth === maxDepth) {
            maxDepthIndeces.push(i);
          }
          else if (depth > maxDepth) {
            maxDepth = depth;
            maxDepthIndeces = [i];
          }
        }
        else {
          depth--;
        }
        break;
      case 'L':
        letter.push({val: el.value, index: i});
        break;
      case 'O':
        operator.push({val: el.value, index: i})
        break;
      case 'N':
        negation.push(i);
        break;
      default:
        break;
    }
  });
};

const getRowData = (data) => {
  const tableData = [];
  [...new Array(data.numRows)].forEach((r, row) => {
    const rowData = [];
    data.schema.forEach((el, i) => {
      rowData.push(el.elType === 'L' ? data.legend[el.value][row] : null);
    });
    tableData.push(rowData);
  });
  return tableData;
}

export { getRowData };