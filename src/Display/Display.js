import React, { useContext } from 'react';
import { Paper, Box } from '@material-ui/core';
import Context from '../context';
import { getLegendTable, getSchemaTable, getSavedSchemataTables } from './displayLogic';
import validateSchema from '../lib/validateSchema';
import './Display.scss';

const Display = () => {
  const { sentenceLetters, schema, schemataList } = useContext(Context);
  const legendTable = getLegendTable(sentenceLetters);
  let editorTable;
  const savedTables = getSavedSchemataTables({
    schemataList: schemataList,
    sentenceLetters: sentenceLetters
  });
  if (validateSchema(schema)) {
    editorTable = getSchemaTable({
      schema: schema, 
      sentenceLetters: sentenceLetters
    });
  }

  const boxStyle = {
    display: !sentenceLetters.length ? 'none' : 'flex'
  };
  const paperStyle = {
    padding: '0.5rem', 
    display: 'flex'
  };
  return (
    <Box className="Display" mt="1rem" style={boxStyle}>
      <Paper elevation={5} style={paperStyle}>
        {legendTable}
        {editorTable}
        {savedTables}
      </Paper>
    </Box>
  );
}

export default Display;