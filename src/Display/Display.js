import React, { useContext } from 'react';
import { green, red, grey } from '@material-ui/core/colors';
import { Paper, Box, Card } from '@material-ui/core';
import Context from '../context';
import theme from '../theme';
import { stepThruScope, getRowData } from '../lib/parseSchema';
import './Display.scss';
import validateSchema from '../Editor/validateSchema';

const Display = () => {
  const { sentenceLetters, schema, schemataList } = useContext(Context);
  const numCols = sentenceLetters.length;
  const numRows = Math.pow(2, numCols);
  
  // create column headers from sentence letters
  const legendTableHeaders = sentenceLetters.map((letter, i) => <th style={{backgroundColor: letter.bgColor}} key={i}>{letter.value}</th>);
  
  // populate truth values in legend and generate display of master table
  const legendTableRows = [], legendData = [];
  for (let row = 0; row < numRows; row++) {
    const legendRow = [], rowElements = [];
    for (let col = 0; col < numCols; col++) {
      const truthVal = Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2) === 0;
      legendRow.push(truthVal); 
      rowElements.push(<td key={col} style={{backgroundColor: truthVal ? green['500'] : red['500']}}>{truthVal ? 'T' : 'F'}</td>);
    }
    legendTableRows.push(<tr key={row}>{rowElements}</tr>);
    legendData.push(legendRow);
  }

  const legend = {};
  
  for (let col = 0; col < numCols; col++) {
    const key = sentenceLetters[col].value;
    legend[key] = [];
    for (let row = 0; row < numRows; row++) {
      legend[key].push(legendData[row][col]);
    }
  }

  const getRows = (arr) => {
    return arr.map((row, r) => 
      (
        <tr key={r}>
          {row.map((val, v) =>  
            (
              <td key={v} style={{backgroundColor: val === true ? green['500'] : val === false ? red['500'] : grey['500']}}>
                {val === true ? 'T' : val === false ? 'F' : '?'}
              </td>
            )
          )}
        </tr>
      )
    );
  }

  const getHeaders = (arr) => {
    return arr.map((header, i) => <th style={{backgroundColor: header.bgColor ? header.bgColor : grey['700']}} key={i}>{header.value}</th>);
  }

  const editorSchemaData = {
    schema: schema,
    legend: legend,
    numRows: numRows 
  }

  const editorTableHeaders = getHeaders(schema);
  const editorTableData = getRowData(editorSchemaData);
  const editorTableRows = getRows(editorTableData);

  console.log('step thru', validateSchema(schema) ? stepThruScope([...schema]) : 'invalid');

  const savedTables = schemataList.map((schema, i) => {
    const savedSchemaData = {
      schema: schema,
      legend: legend,
      numRows: numRows,
    }
    const tableHeaders = getHeaders(schema);
    const savedTableData = getRowData(savedSchemaData);
    const savedTableRows = getRows(savedTableData);
    return (
      <Card key={i} raised className="Card" style={{ display: !schema.length ? 'none' : null, backgroundColor: theme.palette.grey['700']}}>
        <table>
          <thead>
            <tr>{ tableHeaders }</tr>
          </thead>
          <tbody>{ savedTableRows }</tbody>
        </table>
      </Card>
    );
  });

  return (
    <Box className="Display" mt="1rem" style={{display: !sentenceLetters.length ? 'none' : 'flex'}}>
      <Paper elevation={5} style={{padding: '0.5rem', display: 'flex'}}>
        <Card raised className="Card" style={{backgroundColor: theme.palette.grey['700']}}>
          <table>
            <thead>
              <tr>{ legendTableHeaders }</tr>
            </thead>
            <tbody>{ legendTableRows }</tbody>
          </table>
        </Card>

        <Card variant="outlined" raised className="Card" style={{ display: !schema.length ? 'none' : null, backgroundColor: theme.palette.grey['500']}}>
          <table>
            <thead>
              <tr>{ editorTableHeaders }</tr>
            </thead>
            <tbody>{ editorTableRows }</tbody>
          </table>
        </Card>

        {savedTables}
        {/* TODO: display saved schemas in their own Cards alongside legend table */}
      </Paper>
    </Box>
  );
}

export default Display;