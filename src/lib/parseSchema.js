const getMaxDepthIndeces = (schema) => {
  let depth = 0, maxDepth = 0, maxDepthIndeces = [];
  schema.forEach((e, i) => {
    if (e.value === '(') {
      depth++;
      if (depth > maxDepth) {
        maxDepth = depth;
        maxDepthIndeces.push(i);
      }
      if (depth === maxDepth) {
        maxDepthIndeces.push(i);
      }
    }
    if (e.value === ')') {
      depth--;
    }
  })
  return maxDepthIndeces;
}


const stepThruScope = (schema) => {  
  let maxDepthIndeces = getMaxDepthIndeces(schema);
  if (maxDepthIndeces.length > 0) {
    console.log('s', schema);
    maxDepthIndeces.forEach(i => {
      const open = schema.slice(i + 1);
      console.log('open', open);
      const close = open.findIndex(e => e.value === ')');
      console.log('close', close);
      const scope = open.slice(0, close + 1);
      schema.splice(i, close, {value: false});
      return stepThruScope([...schema]);
    });
  }
  else {
    return schema;
  }
}

// takes statement without grouping and calculates its truth value
const simplify = (schema) => {
  
} 


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

const compute = (operator, valArr) => {
  switch (operator) {
    case '\u00AC':
      return !valArr[0];
    case '\u2228':
      return valArr[0] || valArr[1];
    case '\u2227':
      return valArr[0] && valArr[1];
    case '\u21D2':
      return !(valArr[0] && !valArr[1]);
    case '\u21D4':
      return valArr[0] === valArr[1];
    case '\u22BB':
      return valArr[0] !== valArr[1];
    default:
  }
}

export { getRowData, stepThruScope };