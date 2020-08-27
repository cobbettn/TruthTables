
const getMaxDepthIndeces = (schema) => {
  let depth = 0, maxDepth = 0, maxDepthIndeces = [];
  schema.forEach((e, i) => {
    if (e.value === '(') {
      depth++;
      if (depth === maxDepth) {
        maxDepthIndeces.push(i);
      }
      if (depth > maxDepth) {
        maxDepth = depth;
        maxDepthIndeces = [i];
      }
    }
    if (e.value === ')') {
      depth--;
    }
  })
  return maxDepthIndeces;
}

const simplify = (schema) => {
  let maxDepthIndeces = getMaxDepthIndeces(schema);
  maxDepthIndeces.forEach(i => {
    const open = schema.slice(i);
    const close = open.findIndex(e => e.value === ')');
    const scope = open.slice(1, close); // scope is what we want to process
    schema.splice(i, close + 1, {value:false});
    simplify([...schema]);
  });
  if (maxDepthIndeces.length === 0) return schema;
}

const computeTruthValue = (operator, valArr) => {
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

// takes statement without grouping and calculates its truth value
const operatorPrecedence = (data) => {
  const {schema, legend, numRows, isTopLevel} = data;
  let max = 0, maxPrecedenceIndeces = [];
  schema.forEach((e, i) => {
    if (e.precedence) {
      if (e.precedence === max) {
        maxPrecedenceIndeces.push(i);
      }
      if (e.precedence > max) {
        max = e.precedence;
        maxPrecedenceIndeces = [i];
      }
    }
  });
  maxPrecedenceIndeces.forEach(i => {

  })
} 


const setLetterValues = (data) => {
  const tableData = [];
  [...new Array(data.numRows)].forEach((r, row) => {
    const rowData = [];
    data.schema.forEach((el, i) => {
      rowData.push(el.elType === 'L' && data.legend[el.value] ? data.legend[el.value][row] : null);
    });
    tableData.push(rowData);
  });
  console.log(tableData)
  return tableData;
}

const setOperatorValues = (data) => {

}

export { setLetterValues as getRowData, simplify };