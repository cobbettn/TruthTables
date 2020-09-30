import React, { useContext } from 'react';
import { Paper, Box } from '@material-ui/core';
import './Display.scss';
import Context from '../context';
import LegendTable from './LegendTable/LegendTable';
import EditorTable from './EditorTable/EditorTable';
import SavedTables from './SavedTables/SavedTables';

const Display = () => {
  const { sentenceLetters, schema, premises } = useContext(Context);;
  const boxStyle = {
    display: sentenceLetters.length > 0 ? 'flex' : 'none'
  };
  const paperStyle = {
    padding: '0.5rem', 
    display: 'flex',
    flexDirection: 'column'
  };
  return (
    <Box className="Display" mt="1rem" style={boxStyle}>
      <Paper elevation={5} style={paperStyle}>
        <Box display="flex">
          <LegendTable
            sentenceLetters={sentenceLetters}
          />
          <EditorTable  
            sentenceLetters={sentenceLetters}
            schema={schema}
          />
        </Box>
        <Box>
          <SavedTables
            sentenceLetters={sentenceLetters}
            premises={premises}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Display;