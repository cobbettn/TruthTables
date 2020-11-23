import React, { useContext } from 'react';
import { Collapse, Box } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import Context from '../../context';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';
import { dragEnd } from './lib';

const SavedTables = () => {
  const context = useContext(Context);
  const onDragEnd = (drag) => dragEnd(drag, context);
  return (
    <Box>
      <Collapse in={ context.premises.length !== 0 || context.conclusion }>
        <DragDropContext onDragEnd={ onDragEnd }>
          <Box style={ { display: 'flex', flexDirection:'row' } }>
            <PremiseDropArea/>
            <ConclusionDropArea/>
          </Box>
        </DragDropContext>
      </Collapse>
    </Box>
  );
}

export default SavedTables;