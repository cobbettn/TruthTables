import React, { useContext } from 'react';
import { Paper, Box, Collapse } from '@material-ui/core';
import Context from '../context';
import EditorTable from './EditorTable/EditorTable';
import SavedTables from './SavedTables/SavedTables';
import './Display.scss';

const Display = () => {
  const context = useContext(Context);
  const showDisplay = context.schema.symbols.length !== 0 || context.premises.length !== 0 || context.conclusion;
  return (
    <Collapse in={ !!showDisplay }>
      <Box className='Display' mt="1rem">
        <Paper elevation={ 5 } style={ 
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem',
          } 
        }>
          <EditorTable { ...context }/>
          <SavedTables { ...context }/>
        </Paper>
      </Box>
    </Collapse>
  );
}

export default Display;