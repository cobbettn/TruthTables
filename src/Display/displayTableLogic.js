import React from 'react';
import { green, red, grey } from '@material-ui/core/colors';
import { Box, Card } from '@material-ui/core';
import theme from '../theme';
import validateSchema from '../validateSchema';

const getTruthValFromCoordinates = (numRows, row, col) => 0 === Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2);

const getHeaders = (headers, mainOpIndex) => {
  const getStyle = (header, index) => {
    const style = {
      backgroundColor: header.bgColor || grey['700'],
    }
    if (mainOpIndex === index) style.fontWeight = 'bold'
    return style;
  };
  return headers.map((header, i) => 
    (
      <th className={i === mainOpIndex ? 'mainOp'  : ''} style={ getStyle(header, i) } key={i}>{header.value}</th>
    )
  );
};

const getRows = (rows, mainOpIndex) => {
  const getCellStyle = (val, index) => {
    const isMainOpColumn = mainOpIndex === index;
    const style = {
      backgroundColor: 
        val === true  ? 
          isMainOpColumn ? green['700'] : green['500'] :
        val === false ? 
          isMainOpColumn ? red['700']   : red['500']   : 
        grey['500']
    };
    if (mainOpIndex === index) {
      style.fontWeight = 'bold'
    }
    return style;
  }
  const getCellDisplayValue = (val) => {
    let cellDisplayValue = '?';
    if (typeof val === 'string') {
      cellDisplayValue = val;
    }
    else if (val === true) {
      cellDisplayValue = 'T';
    }
    else if (val === false) {
      cellDisplayValue = 'F';
    }
    return cellDisplayValue;
  }
  return rows.map((row, rowIndex) => 
    (
      <tr key={rowIndex}>
        {row.map((val, cellIndex) =>  
          (
            <td className={mainOpIndex === cellIndex ? 'mainOp' : ''} key={cellIndex} style={ getCellStyle(val, cellIndex) }>
              { getCellDisplayValue(val) }
            </td>
          )
        )}
      </tr>
    )
  );
};

const getTableDimensions = (numSentenceLetters) => {
  return {
    numCols: numSentenceLetters, 
    numRows: Math.pow(2, numSentenceLetters)
  };
};

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
};

const getTableModel = (schema, numRows, legend) => {
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
};

const getCardTable = (config) => {
  const { key, style, headers, table } = config;
  const boxStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    padding: '0 0.25rem',
    textShadow: '2px 2px 2px black'
  }
  return (
    <Card key={key} raised className="Card" style={style}>
      <Box style={boxStyle}> {key} </Box>
      <table>
        <thead>
          <tr>{ headers }</tr>
        </thead>
        <tbody>{ table }</tbody>
      </table>
    </Card>
  );
};

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
};

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
};

const getNextOperator = (schema) => {
  let index, innermostNot;
  for (let prec = 0; prec <= 3; prec++) {
    for (let i = 0; i < schema.length; i++) {
      if (schema[i]?.precedence === prec) {
        index = i;
        if (prec === 0) {
          innermostNot = index;
        }
        else {
          return innermostNot || index;
        }
      } 
    }
  }
  return index;
};

const computeOperation = (data) => {
  const { schema, opIndex, table, numRows } = data;
  const { value: operator, opMapId } = schema[opIndex];
  let result = [],  numArgs = 2;
  for (let row = 0; row < numRows; row++) {
    let value;
    let L, R;
    if (opIndex - 1 >= 0) L = table[row][opIndex - 1];
    if (opIndex + 1 < table[row].length) R = table[row][opIndex + 1];
    switch (operator) {
      case '\u00AC': // not
        value = !R; 
        numArgs = 1;
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
    result.push(value);
  }
  const resultObj = {
    result: result,
    numArgs: numArgs,
    opMapId: opMapId
  }
  return resultObj;
};

const computeTable = (tableData) => {
  const { schema, tableModel, numRows } = tableData;
  const schemaCopy = schema.map(el => Object.assign({}, el));
  const tableCopy = tableModel.map(row => row.slice());
  const opMap = setupOpMap(schemaCopy); 
  let scopes = getDeepestScopes(schemaCopy);
  let index;
  while (scopes.length > 0) {
    const [ start, end ] = scopes.shift();
    const subSchema = schemaCopy.splice(start, end + 1 - start);
    subSchema.shift();
    subSchema.pop();
    const subTable = [];
    tableCopy.forEach(row => {
      const subTableData = row.splice(start, end + 1 - start);
      subTableData.shift();
      subTableData.pop();
      subTable.push(subTableData);
    });
    let res = subTable;
    const { result, mainOpIndex } = doOperations({
      subSchema: subSchema,
      subTable: subTable,
      tableModel: tableModel,
      opMap: opMap,
      numRows: numRows
    });
    res = result;
    index = mainOpIndex
    schemaCopy.splice(start, 0, {elType: 'SCOPE'});
    for (let i = 0; i < tableCopy.length; i++) {
      tableCopy[i].splice(start, 0, res[i]);
    }
    scopes = getDeepestScopes(schemaCopy);
  }
  const { mainOpIndex } = doOperations({
    subSchema: schemaCopy,
    subTable: tableCopy,
    tableModel: tableModel,
    opMap: opMap,
    numRows: numRows
  });
  return mainOpIndex >= 0 ? mainOpIndex : index;
};

const doOperations = (schemaData) => {
  const {subSchema, subTable, tableModel, opMap, numRows } = schemaData;
  let mainResult = subTable.flat();
  let opIndex = getNextOperator(subSchema);
  console.log('op', opIndex)
  let modelIndex;
  while (opIndex !== undefined) {
    const { numArgs, opMapId, result } = computeOperation({
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
  }
  const endResult = {
    result: mainResult,
    mainOpIndex: modelIndex
  }
  return endResult;
};

const getLegendTable = (sentenceLetters) => {
  const { numCols, numRows } = getTableDimensions(sentenceLetters.length);
  if (numCols > 0) {
    const legendTableHeaders = getHeaders(sentenceLetters);
    const style = {
      backgroundColor: theme.palette.grey['700']
    }
    const legendTable = [];
    for (let row = 0; row < numRows; row++) {
      const rowElements = [];
      for (let col = 0; col < numCols; col++) {
        const truthVal = getTruthValFromCoordinates(numRows, row, col);
        const cellColor = {
          backgroundColor: truthVal ? green['500'] : red['500']
        }
        rowElements.push(
          <td key={col} style={cellColor}>
            {truthVal ? 'T' : 'F'}
          </td>
        );
      }
      legendTable.push(
        <tr key={row}>
          {rowElements}
        </tr>
      );
    }
    return getCardTable({
      key: 'Legend',
      style: style, 
      headers: legendTableHeaders, 
      table: legendTable
    });
  }
};

const getSchemaTable = (tableData) => {
  const { schema, sentenceLetters, key } = tableData;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  const legend = getLegend(sentenceLetters);
  const tableModel = getTableModel(schema, numRows, legend);
  let schemaTableHeaders = getHeaders(schema);
  let schemaTable = getRows(tableModel);
  const style = { 
    display: schema.length === 0 ? 'none' : null, 
    backgroundColor: !key ? theme.palette.primary.dark : theme.palette.grey['700']
  }
  if (validateSchema(schema)) {
    const mainOpIndex = computeTable({
      tableModel: tableModel,
      schema: schema, 
      numRows: numRows
    });
    schemaTableHeaders = getHeaders(schema, mainOpIndex);
    schemaTable = getRows(tableModel, mainOpIndex);
  }
  return getCardTable({
    key: key || 'Editor',
    style: style,
    headers: schemaTableHeaders,
    table: schemaTable
  });
};

const getSavedTables = (tableData) => {
  return tableData.savedList?.map((schema, i) => getSchemaTable({
    key: schema.isConclusion ? `C${i + 1}`: `P${i + 1}`,
    schema: schema,
    sentenceLetters: tableData.sentenceLetters
  }));
};

export { getLegendTable, getSchemaTable, getSavedTables };