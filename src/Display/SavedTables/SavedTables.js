import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import Context from '../../context';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';
import { getBoxStyle } from './SavedTables.style';
import { dragEnd } from './lib';
import { Collapse } from '@material-ui/core';

const SavedTables = () => {
  const context = useContext(Context);
  const onDragEnd = (drag) => dragEnd(drag, context);
  return (
    <Box style={ getBoxStyle(context) }>
      <Collapse in={!(context.premises.length === 0 && !context.conclusion) }>
        <DragDropContext onDragEnd={ onDragEnd }>
          <Box style={ {display: 'flex', flexDirection:'row'} }>
            <PremiseDropArea/>
            <ConclusionDropArea/>
          </Box>
        </DragDropContext>
      </Collapse>
    </Box>
  );
}

export default SavedTables;