import React from 'react';
import { Collapse, Box } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';
import { dragEnd } from './lib';

const SavedTables = (props) => {
  const onDragEnd = (drag) => dragEnd(drag, props);
  return (
    <Box>
      <Collapse in={ !!(props.premises.length !== 0 || props.conclusion) }>
        <DragDropContext onDragEnd={ onDragEnd }>
          <Box style={ { display: 'flex', flexDirection:'row' } }>
            <PremiseDropArea {...props}/>
            <ConclusionDropArea {...props}/>
          </Box>
        </DragDropContext>
      </Collapse>
    </Box>
  );
}

export default SavedTables;