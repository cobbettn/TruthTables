/**
 * Creates a top-level context for handling app state
 * 
 * @param {*} _useState 
 */
const getContextProvider = (_useState) => {
  const defaultSchema = { symbols: [], type: 'P' };
  const defaultPremises = [];
  const defaultConclusion = null;
  const defaultTutorialSteps = { addLetter: false, editorLetter: false, editorOperator: false, saveSchema: false };
  const defaultSentenceLetters = [];
 
  const [ schema, setSchema ] = _useState(defaultSchema); 
  const [ premises, setPremises ] = _useState(defaultPremises);
  const [ conclusion, setConclusion ] = _useState(defaultConclusion); 
  const [ tutorialSteps, setTutorialSteps ] = _useState(defaultTutorialSteps);
  const [ sentenceLetters, setSentenceLetters ] = _useState(defaultSentenceLetters);
  
  const state = {
    sentenceLetters,
    schema,
    premises,
    conclusion,
    tutorialSteps
  };
  const stateSetters = {
    setSentenceLetters,
    setSchema,
    setPremises,
    setConclusion,
    setTutorialSteps
  };

  return {
    ...state,
    ...stateSetters
  };
};

/**
 * Checks if a schema is well-formed
 * 
 * @param {*} schema 
 */
const validateSchema = (schema) => {
  let isValid = true;

  if (!schema || schema.length === 0) {
    return false; // empty schema
  }
  let L, R;
  let openParenCount = 0, closeParenCount = 0;
  // compare each symbol in the schema with its adjacent symbols
  schema.forEach((symbol, i) => {
    L = schema[i - 1];
    R = schema[i + 1];
    switch (symbol.elType) {
      case 'L': // LETTERS
        if (L?.elType === 'L') {
          isValid = false;
        }
        break;
      case 'N': // NEGATION
        if (!R || L?.elType === 'L' || R?.elType === 'O') {
          isValid = false;
        }
        break;
      case 'O': // BINARY OPERATORS
        if (!R || !L || R?.elType === 'O' || L?.elType === 'O') {
          isValid = false;
        }  
        break;
      case 'G': // GROUPING
        if (symbol.value === '(') { // open logic
          if (L?.elType === 'L' || L?.value === ')' || R?.value === ')') {
            isValid = false; 
          }
          openParenCount++;
        }
        if (symbol.value === ')') { // close logic
          if (L?.elType === 'O' || L?.elType === 'N' || R?.elType === 'L' || R?.elType === 'N' ) {
            isValid = false;
          } 
          closeParenCount++;
        }
        break;
      default:
    } 
  });
  // unclosed parentheses
  if (openParenCount !== closeParenCount) isValid = false;
  

  return isValid;
}

const getOpCount = (symbols) => {
  const stepsReducer = (acc, cur) => cur.elType === 'O' || cur.elType === 'N' ? acc + 1 : acc;
  return symbols?.reduce(stepsReducer, 0);
}

const getTruthValFromCoordinates = (numRows, row, col) => 0 === Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2);

const getLegend = (sentenceLetters) => {
  const { numRows, numCols } = getTableDimensions(sentenceLetters?.length);
  const legend = {};
  for (let col = 0; col < numCols; col++) {
    const { value: legendKey }= sentenceLetters[col];
    legend[legendKey] = [];
    for (let row = 0; row < numRows; row++) {
      legend[legendKey].push(getTruthValFromCoordinates(numRows, row, col));
    }
  }
  return legend;
}

const getTableDimensions = (numSentenceLetters) => {
  return {
    numCols: numSentenceLetters, 
    numRows: Math.pow(2, numSentenceLetters)
  };
}

const computeTable = (schema, tableModel, numRows) => {
  let { symbols, steps } = schema;
  const schemaCopy = symbols.map(el => Object.assign({}, el));
  const tableCopy = tableModel.map(row => row.slice());
  const opMap = setupOpMap(schemaCopy); 
  let scopes = getDeepestScopes(schemaCopy);
  let scopedIndex;
  
  // do scoped operations (if any) from the innermost scope outwards
  while (scopes.length > 0) {
    const [ start, end ] = scopes.shift();
    const subSchema = schemaCopy.splice(start, end + 1 - start);
    subSchema.shift();  // remove opening paren
    subSchema.pop();    // remoce closing paren
    const subTable = [];
    tableCopy.forEach(row => {
      const subTableData = row.splice(start, end + 1 - start);
      subTableData.shift();
      subTableData.pop();
      subTable.push(subTableData);
    });
    const { result, mainOpIndex, stepsLeft } = doOperations({
      subSchema: subSchema,
      subTable: subTable,
      tableModel: tableModel,
      opMap: opMap,
      numRows: numRows,
      steps: steps
    });
    steps = stepsLeft;
    if (mainOpIndex) scopedIndex = mainOpIndex;
    schemaCopy.splice(start, 0, {elType: 'SCOPE'});
    for (let i = 0; i < tableCopy.length; i++) {
      tableCopy[i].splice(start, 0, result[i]);
    }
    scopes = getDeepestScopes(schemaCopy);
  }
  // do remaining unscoped operations (if any)
  const { mainOpIndex } = doOperations({
    subSchema: schemaCopy,
    subTable: tableCopy,
    tableModel: tableModel,
    opMap: opMap,
    numRows: numRows,
    steps: steps
  });
  let mainOpColumn;
  if (mainOpIndex >= 0) {
    scopedIndex = mainOpIndex;
    mainOpColumn = tableModel.map(row => row[mainOpIndex]);
  } else {
    // no-op schema, just return sentece letter val
    mainOpColumn = tableModel.map(row => row[0]);
  }
  return {
    mainOpIndex: scopedIndex,
    mainOpColumn: mainOpColumn
  }
}

const setupOpMap = (schema) => {
  const map = {};
  const opMap = {};
  schema.forEach((sym, i) => {
    if (sym.elType === 'O' || sym.elType === 'N') {
      const { value } = sym;
      if (map[value]) {
        map[value]++;
      } 
      else {
        map[value] = 1;
      } 
      const id = `${value}${map[value]}`; // operator ids
      sym.opMapId = id;
      opMap[id] = i;
    }
  });
  return opMap;
}

const getDeepestScopes = (schema) => {
  let indeces = [];
  let depth = 0, max = 0, start, end;
  schema.forEach((el, i) => {
    if (el?.value === '(') {
      depth++;
      if (depth > max) {
        max = depth;
      }
      if (depth >= max) {
        start = i;
      }
    }
    if (el?.value ===')') {
      if (depth === max) {
        end = i;
        indeces.push([start, end]);
      }
      depth--;
    }
  });
  return indeces;
}

const getNextOperator = (schema) => {
  let index, innermostNot;
  for (let prec = 0; prec <= 4; prec++) {
    for (let i = 0; i < schema.length; i++) {
      if (schema[i]?.precedence === prec) {
        index = i;
        if (prec === 0) {
          innermostNot = index;
        }
        else {
          return innermostNot >= 0 ? innermostNot : index;
        }
      } 
    }
  }
  return index;
}

const computeOperator = (data) => {
  const { schema, opIndex, table, numRows } = data;
  const { value: operator, opMapId } = schema[opIndex];
  let result = [],  numArgs = 2;
  for (let row = 0; row < numRows; row++) {
    let L, R, value, valid;
    if (opIndex - 1 >= 0) L = table[row][opIndex - 1];
    if (opIndex + 1 < table[row].length) R = table[row][opIndex + 1];
    valid = !(L === undefined || R=== undefined);
    switch (operator) {
      case '\u00AC': // not
        numArgs = 1;
        valid = R !== undefined;
        value = !R; 
        break;
      case '\u2228': // or
        value = L || R; 
        break;
      case '\u2227': // and
        value = L && R;
        break;
      case '\u21D2': // if
        value = !L || R; 
        break;
      case '\u21D4': // iff
        value = L === R;
        break;
      case '\u22BB': // xor
        value = L !== R;
        break;
      default:
    }
    if (valid) result.push(value);
  }
  const resultObj = {
    result: result,
    numArgs: numArgs,
    opMapId: opMapId
  }
  return resultObj;
}

const doOperations = (schemaData) => {
  const { subSchema, subTable, tableModel, opMap, numRows } = schemaData;
  let { steps } = schemaData;
  let mainResult = subTable.flat();  // .flat() needed for simplifications of '(p)'
  let opIndex = getNextOperator(subSchema);
  let modelIndex;

  while (opIndex !== undefined && steps > 0) {
    const { numArgs, opMapId, result } = computeOperator({
      schema: subSchema,
      opIndex: opIndex, 
      table: subTable,
      numRows: numRows
    });
    mainResult = result;
    subSchema.splice(numArgs === 2 ? opIndex - 1 : opIndex, numArgs + 1, {elType: 'COMPUTED'});
    for (let i = 0; i < subTable.length; i++) {
      subTable[i].splice(numArgs === 2 ? opIndex - 1 : opIndex, numArgs + 1, result[i]);
    }
    modelIndex = opMap[opMapId];
    for (let i = 0; i < tableModel.length; i++) {
      tableModel[i][modelIndex] = result[i];
    }
    opIndex = getNextOperator(subSchema);
    steps--;
  }
  const finalResult = {
    result: mainResult,
    mainOpIndex: modelIndex,
    stepsLeft: steps
  }
  return finalResult;
}

const generateTableModel = (schema, numRows, legend) => {
  const tableModel = [];
  for (let row = 0; row < numRows; row++) {
    const rowData = [];
    schema.forEach(el => {
      const { elType, value } = el;
      let cellValue;
      if (elType === 'L' && legend[value]) {
        cellValue = legend[value][row];
      }
      if (elType === 'G') {
        cellValue = value;
      }
      rowData.push(cellValue);
    });
    tableModel.push(rowData);
  }
  return tableModel;
}

const getTableModel = (data) => {
  const { schema, sentenceLetters } = data;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  const legend = getLegend(sentenceLetters);
  return generateTableModel(schema.symbols, numRows, legend);
}

export { 
  getLegend, 
  getTableDimensions, 
  computeTable, 
  getTableModel,
  getOpCount, 
  getContextProvider, 
  validateSchema
};
