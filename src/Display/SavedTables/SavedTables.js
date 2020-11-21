import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import Context from '../../context';
import dragEnd from './dragEnd';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';
import { getBoxStyle } from './SavedTables.style';

const SavedTables = (props) => {
  const context = useContext(Context);
  return (
    <Box style={ getBoxStyle(context)}>
      <DragDropContext onDragEnd={(drag) => dragEnd(drag, context)}>
        <div style={{display: 'flex', flexDirection:'row'}}>
          <PremiseDropArea/>
          <ConclusionDropArea/>
        </div>
      </DragDropContext>
    </Box>
  );
}

export default SavedTables;