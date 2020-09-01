import React, { useContext } from 'react';
import { Paper, Box } from '@material-ui/core';
import Context from '../context';
import { getLegendTable, getSchemaTable, getSavedSchemataTables } from './displayLogic';
import './Display.scss';

const Display = () => {
  const { sentenceLetters, schema, schemataList } = useContext(Context);
  const legendTable = getLegendTable(sentenceLetters);
  const savedTables = getSavedSchemataTables({
    schemataList: schemataList,
    sentenceLetters: sentenceLetters
  });
  const editorTable = getSchemaTable({
    schema: schema, 
    sentenceLetters: sentenceLetters
  });
  return (
    <Box className="Display" mt="1rem" style={{display: !sentenceLetters.length ? 'none' : 'flex'}}>
      <Paper elevation={5} style={{padding: '0.5rem', display: 'flex'}}>
        {legendTable}
        {editorTable}
        {savedTables}
      </Paper>
    </Box>
  );
}

export default Display;