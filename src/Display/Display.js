import React, { useContext } from 'react';
import { green, red } from '@material-ui/core/colors';
import { Paper, Box, Card } from '@material-ui/core';
import Colors from '../colors';
import Context from '../context';
import theme from '../theme';
import './Display.scss';

const Display = () => {
  const { sentenceCount } = useContext(Context);

  const numCols = sentenceCount;
  const numRows = Math.pow(2, numCols);
  const tableRows = [];

  const sentenceLetters = [...Array(sentenceCount)].map((e, i) => String.fromCharCode(112 + i));
  const tableColumns = sentenceLetters.map((e, i) => <th style={{backgroundColor: Colors[i]['600']}} key={i}>{e}</th>);
  
  // append statement headers

  // populate truth values for master table
  for (let row = 0; row < numRows; row++) {
    const rowCells = [];
    for (let col = 0; col < numCols; col++) {
      const truthVal = Math.floor(row / (numRows / Math.pow(2, col + 1)) % 2) === 0;
      rowCells.push(<td key={col} style={{backgroundColor: truthVal ? green['500'] : red['500']}}>{truthVal ? 'T' : 'F'}</td>);
    }
    tableRows.push(<tr key={row}>{rowCells}</tr>);
  }

  // populate truth values for statements (write parsing fxns)

  return (
    <Box className="Display" mt="1rem" style={{display: sentenceCount === 0 ? 'none' : null}}>
      <Paper elevation={5} style={{padding: '0.5rem'}}>
        <Card raised style={{padding: '0.15rem', width: 'fit-content', backgroundColor: theme.palette.grey['700']}}>
          <table className="TruthTable">
            <thead>
              <tr>{ tableColumns }</tr>
            </thead>
            <tbody>{ tableRows }</tbody>
          </table>
        </Card>
      </Paper>
    </Box>
  );
}

export default Display;