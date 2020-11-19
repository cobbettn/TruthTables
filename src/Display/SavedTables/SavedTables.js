import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import context from '../../context';
import dragEnd from './dragEnd';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';

const SavedTables = (props) => {
  const { premises, setPremises, conclusion, setConclusion } = useContext(context);

  const onDragEnd = (drag) => {
    const stateObj = {
      premises: premises,
      setPremises: setPremises,
      conclusion: conclusion,
      setConclusion: setConclusion
    }
    dragEnd(drag, stateObj);
  }

  return (
    <Box style={{display: !conclusion && premises.length === 0 && 'none'}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{display: 'flex', flexDirection:'row'}}>
          <PremiseDropArea/>
          <ConclusionDropArea/>
        </div>
      </DragDropContext>
    </Box>
  );
}

export default SavedTables;