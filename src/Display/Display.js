import React, { useContext } from 'react';
import { Paper, Box } from '@material-ui/core';
import './Display.scss';
import Context from '../context';
import LegendTable from './LegendTable/LegendTable';
import EditorTable from './EditorTable/EditorTable';
import SavedTables from './SavedTables/SavedTables';

const Display = () => {
  const { sentenceLetters, schema, schemataList } = useContext(Context);;
  const boxStyle = {
    display: sentenceLetters.length > 0 ? 'flex' : 'none'
  };
  const paperStyle = {
    padding: '0.5rem', 
    display: 'flex'
  };
  const savedPaperStyle = {
    display: schemataList.length > 0 ? 'flex' : 'none',
    marginTop: '1rem',
    padding: '0.5rem',
  }
  return (
    <Box className="Display" mt="1rem" style={boxStyle}>
      <Paper elevation={5} style={paperStyle}>
        <LegendTable
          sentenceLetters={sentenceLetters}
        />
        <EditorTable  
          sentenceLetters={sentenceLetters}
          schema={schema}
        />
      </Paper>
      <Paper elevation={5} style={savedPaperStyle}>
        <SavedTables
          sentenceLetters={sentenceLetters}
          savedList={schemataList}
        />
      </Paper>
    </Box>
  );
}

export default Display;