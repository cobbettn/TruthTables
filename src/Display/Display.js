import React, { useContext } from 'react';
import { Paper, Box } from '@material-ui/core';
import Context from '../context';
import EditorTable from './EditorTable/EditorTable';
import SavedTables from './SavedTables/SavedTables';
import { getBoxStyle, paperStyle } from './Display.style';
import './Display.scss';

const Display = () => {
  const context = useContext(Context);
  const boxStyle = getBoxStyle(context);
  return (
    <Box className="Display" mt="1rem" style={boxStyle}>
      <Paper elevation={5} style={paperStyle}>
        <EditorTable {...context}/>
        <SavedTables {...context}/>
      </Paper>
    </Box>
  );
}

export default Display;