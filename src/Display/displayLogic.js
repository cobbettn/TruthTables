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
  
  return arr.map((row, i) => 
    (
      <tr key={i}>
        {row.map((val, key) =>  
          (
            <td key={key} style={ getCellStyle(val) }>
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

const getTruthValFromCoordinates = (numRows, row, col) => Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2) === 0;

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
 * Returns an array containing the start and end of deepest scopes
 * @param {*} schema 
 */
const getDeepestScopes = (schema) => {
  let indeces = [];
  let depth = 0, max = 0, start, end;
  schema.forEach((el, i) => {
    if (el.value === '(') {
      depth++;
      if (depth > max) {
        max = depth;
      }
      if (depth >= max) {
        start = i + 1;
      }
    }
    if (el.value ===')') {
      if (depth === max) {
        end = i;
        indeces.push([start, end]);
      }
      depth--;
    }
  });
  return indeces;
}

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

const getSchemaTable = (tableData) => {
  const { schema, sentenceLetters, key } = tableData;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  const legend = getLegend(sentenceLetters);
  const style = { 
    display: !schema.length ? 'none' : null, 
    backgroundColor: theme.palette.grey['700']
  }
  const schemaTableData = [];
  for (let row = 0; row < numRows; row++) {
    const rowData = [];
    // writes in letter values for table data
    schema.forEach(el => {
      const { elType, value } = el;
      let cellValue;
      if (elType === 'L') {
        cellValue = legend[value] ? legend[value][row] : null;
      }
      if (elType === 'G') {
        cellValue = value;
      }
      rowData.push(cellValue);
    });
    schemaTableData.push(rowData);
  }

  // pass in schemaTableData to a compute function
  // const computed = getComputedTable(schema);

  const schemaTableHeaders = getHeaders(schema);
  const schemaTable = getRows(schemaTableData);

  return getCardTable({
    key: key ? key : 'Editor',
    style: style,
    headers: schemaTableHeaders,
    table: schemaTable
  });
}

const getSavedSchemataTables = (tableData) => {
  return tableData.schemataList?.map((schema, i) => getSchemaTable({
    key: schema.isConclusion ? `c${i + 1}`: `p${i + 1}`,
    schema: schema,
    sentenceLetters: tableData.sentenceLetters
  }));
};


export { getLegendTable, getSchemaTable, getSavedSchemataTables };