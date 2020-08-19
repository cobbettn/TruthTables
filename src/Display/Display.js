import React, { useContext } from 'react';
import { green, red } from '@material-ui/core/colors';
import { Paper, Box, Card } from '@material-ui/core';
import Context from '../context';
import theme from '../theme';
import './Display.scss';

const Display = () => {
  const { sentenceLetters } = useContext(Context);
  const numCols = sentenceLetters.length;
  const numRows = Math.pow(2, numCols);

  // create column headers to correspond with sentence letters
  const legendTableColumns = sentenceLetters.map((letter, i) => <th style={{backgroundColor: letter.bgColor}} key={i}>{letter.value}</th>);
  
  // populate truth values for master table
  const legendTableRows = [];
  for (let row = 0; row < numRows; row++) {
    const rowData = [];
    for (let col = 0; col < numCols; col++) {
      const truthVal = Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2) === 0; 
      rowData.push(<td key={col} style={{backgroundColor: truthVal ? green['500'] : red['500']}}>{truthVal ? 'T' : 'F'}</td>);
    }
    legendTableRows.push(<tr key={row}>{rowData}</tr>);
  }

  return (
    <Box className="Display" mt="1rem" style={{display: !sentenceLetters.length ? 'none' : 'flex'}}>
      <Paper elevation={5} style={{padding: '0.5rem', display: 'flex'}}>
        <Card raised className="Card" style={{backgroundColor: theme.palette.grey['700']}}>
          <table>
            <thead>
              <tr>{ legendTableColumns }</tr>
            </thead>
            <tbody>{ legendTableRows }</tbody>
          </table>
        </Card>
        {/* TODO: display saved schemas in their own Cards alongside legend table */}
      </Paper>
    </Box>
  );
}

export default Display;