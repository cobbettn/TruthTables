import React, { useContext } from 'react';
import { green, red } from '@material-ui/core/colors';
import { Paper, Box, Card } from '@material-ui/core';
import Context from '../context';
import theme from '../theme';
import parseSchema from '../lib/parseSchema';
import './Display.scss';

const Display = () => {
  const { sentenceLetters, schema } = useContext(Context);
  const numCols = sentenceLetters.length;
  const numRows = Math.pow(2, numCols);
  
  // create column headers from sentence letters
  const headers = sentenceLetters.map((letter, i) => <th style={{backgroundColor: letter.bgColor}} key={i}>{letter.value}</th>);
  
  // populate truth values in legend and generate display of master table
  const rows = [], legendData = [];
  for (let row = 0; row < numRows; row++) {
    const legendRow = [], rowElements = [];
    for (let col = 0; col < numCols; col++) {
      const truthVal = Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2) === 0;
      legendRow.push(truthVal); 
      rowElements.push(<td key={col} style={{backgroundColor: truthVal ? green['500'] : red['500']}}>{truthVal ? 'T' : 'F'}</td>);
    }
    rows.push(<tr key={row}>{rowElements}</tr>);
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

  parseSchema(schema);

  return (
    <Box className="Display" mt="1rem" style={{display: !sentenceLetters.length ? 'none' : 'flex'}}>
      <Paper elevation={5} style={{padding: '0.5rem', display: 'flex'}}>
        <Card raised className="Card" style={{backgroundColor: theme.palette.grey['700']}}>
          <table>
            <thead>
              <tr>{ headers }</tr>
            </thead>
            <tbody>{ rows }</tbody>
          </table>
        </Card>
        {/* TODO: display saved schemas in their own Cards alongside legend table */}
      </Paper>
    </Box>
  );
}

export default Display;