import React from 'react';
import { green, red, grey } from '@material-ui/core/colors';
import Card  from '@material-ui/core/Card';
import theme from '../theme';
import { Box } from '@material-ui/core';

const getHeaders = (arr) => {
  const getStyle = (header) => {
    return {
      backgroundColor: header.bgColor ? header.bgColor : grey['700']
    }
  };
  return arr.map((header, i) => 
    (
      <th style={getStyle(header)} key={i}>{header.value}</th>
    )
  );
};

const getRows = (arr) => {
  const getCellStyle = (val) => {
    return {
      backgroundColor: val === true ? green['500'] : val === false ? red['500'] : grey['500']
    };
  }
  const getCellDisplayValue = (val) => {
    let cellDisplayValue = '?';
    if (typeof val === 'string') {
      cellDisplayValue = val;
    }
    if (val === true) {
      cellDisplayValue = 'T';
    }
    if (val === false) {
      cellDisplayValue = 'F';
    }
    return cellDisplayValue;
  }
  return arr.map((row, rowKey) => 
    (
      <tr key={rowKey}>
        {row.map((val, cellKey) =>  
          (
            <td key={cellKey} style={ getCellStyle(val) }>
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
}

const getTruthValFromCoordinates = (numRows, row, col) => 0 === Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2);

const getLegend = (sentenceLetters) => {
  const { numRows, numCols } = getTableDimensions(sentenceLetters.length);
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
} 

/**
 * gets an array containing the start/end indeces of the deepest scope(s)
 * @param {*} schema 
 */
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

/**
 * pre-populates table model with letter and grouping values
 * @param {*} schema 
 * @param {*} numRows 
 * @param {*} legend 
 */
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
}

/**
 * compute the 
 * @param {*} schema
 * @return number
 */
const getOperatorOrder = (schema) => {
  const order = [];
  for (let prec = 0; prec <= 3; prec++) {
    for (let i = 0; i < schema.length; i++) {
      if (schema[i]?.precedence === prec) order.push(i);
    }
  }
  return order;
}

const doOperation = (operatorIndex, schema, tableModel, numRows) => {
  const { value: operator } = schema[operatorIndex];
  let result = [],  numArgs = 2;
  for (let row = 0; row < numRows; row++) {
    const left = tableModel[row][operatorIndex - 1];
    const right = tableModel[row][operatorIndex + 1];
    switch (operator) {
      case '\u00AC': // not
        numArgs = 1;
        result.push(!right); 
      break;
      case '\u2228': // or
        result.push(left || right); 
      break;
      case '\u2227': // and
        result.push(left && right);
      break;
      case '\u21D2': // if
        result.push(!left || right); 
      break;
      case '\u21D4': // iff
        result.push(left === right);
      break;
      case '\u22BB': // xor
        result.push(left !== right);
      break;
      default:
    }
  }
  const operationResult = {
    tableData: result,
    deleteCount: numArgs
  }; 
  return operationResult;
}

const getComputedTable = (schema, tableModel, numRows) => {
  const computeOperators = getOperatorOrder(schema);
  const computeSchema = [...schema];
  const computeTable = tableModel.map(row => row.slice()); // create deep copy of tableModel
  let operators = getOperatorOrder(computeSchema);
  while (operators.length > 0) {
    const opIndex = operators.shift();
    const modelIndex = computeOperators.shift();
    const { tableData, deleteCount } = doOperation(opIndex, computeSchema, computeTable, numRows);
    console.log('result', tableData);
    tableModel.forEach((row, i) => row[modelIndex] = tableData[i]);
    computeTable.forEach((row, i) => {
      row.splice(deleteCount === 2 ? opIndex - 1 : opIndex, deleteCount + 1, tableData[i]);
    });
   
    computeSchema.splice(deleteCount === 2 ? opIndex - 1 : opIndex, deleteCount + 1, {elType: 'C', value: tableData});
    operators = getOperatorOrder(computeSchema);
    console.log('computetable', computeTable)
    console.log('tablemodel', tableModel);
  }
  
  return tableModel;
}

// legend table
const getLegendTable = (sentenceLetters) => {
  const { numCols, numRows } = getTableDimensions(sentenceLetters.length);
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

// schema table
const getSchemaTable = (tableData) => {
  const { schema, sentenceLetters, key } = tableData;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  const legend = getLegend(sentenceLetters);
  const style = { 
    display: !schema.length ? 'none' : null, 
    backgroundColor: theme.palette.grey['700']
  }

  const tableModel = getTableModel(schema, numRows, legend);

  // call compute function and then pass result to the getRows fxn
  const computedTable = getComputedTable(schema, tableModel, numRows);
  console.log('getSchemaTable() tableModel: ', computedTable.tableModel);
  // ... const schemaTable = getRows(computedTable);

  const schemaTableHeaders = getHeaders(schema);
  const schemaTable = getRows(tableModel);

  return getCardTable({
    key: key ? key : 'Editor',
    style: style,
    headers: schemaTableHeaders,
    table: schemaTable
  });
}

// saved schemata tables
const getSavedSchemataTables = (tableData) => {
  return tableData.schemataList?.map((schema, i) => getSchemaTable({
    key: schema.isConclusion ? `c${i + 1}`: `p${i + 1}`,
    schema: schema,
    sentenceLetters: tableData.sentenceLetters
  }));
};

export { getLegendTable, getSchemaTable, getSavedSchemataTables };