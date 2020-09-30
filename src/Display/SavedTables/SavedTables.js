import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import context from '../../context';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';

const SavedTables = () => {
  const { sentenceLetters, premises, setPremises, conclusion, setConclusion } = useContext(context);
  const onDragEnd = (drag) => {
    const { destination, source } = drag;
    const { index: sourceIndex , droppableId: sourceId } = source;
    if (sourceId === 'PremiseDropZone') {
      if (destination?.droppableId === 'PremiseDropZone') {
        const [el] = premises.splice(sourceIndex, 1);
        premises.splice(destination.index, 0, el);
        setPremises([...premises]);
      }
      if (destination?.droppableId === 'ConclusionDropZone') {
        const [el] = premises.splice(sourceIndex, 1);
        if (conclusion) setPremises([...premises, conclusion]);
        setConclusion(el);
      }
    }
    if (sourceId === 'ConclusionDropZone')  {
      if (destination?.droppableId === 'PremiseDropZone') {
        setPremises([...premises, conclusion]);
        setConclusion(null);
      }
    }
  }

  
 
  return (
    <Box style={{display: !conclusion && premises.length === 0 ? 'none' : ''}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{display: 'flex', flexDirection:'row'}}>
          <PremiseDropArea
            sentenceLetters={sentenceLetters}
            premises={premises}
          />
          <ConclusionDropArea
            sentenceLetters={sentenceLetters}
            schema={conclusion}
          />
        </div>
      </DragDropContext>
    </Box>
  );
}

export default SavedTables;