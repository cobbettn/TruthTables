import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getSchemaTable } from '../../displayTableLogic'
import Context from '../../../context';
import { getMaxSteps } from '../../../lib';

const ConclusionDropArea = (props) => {
  const { conclusion, setConclusion } = props;
  const { sentenceLetters, setSchema } = useContext(Context);
  const schemaTableData = {
    sentenceLetters: sentenceLetters,
    schema: conclusion,
    tableType: 'Conclusion',
    onEdit: () => {
      conclusion.type = 'C'
      setSchema({...conclusion});
      setConclusion(null);
    },
    onDelete: () => {
      setConclusion(null);
    },
    onNext: () => {
      const maxSteps = getMaxSteps(conclusion.symbols);
      conclusion.steps < maxSteps && conclusion.steps++;
      setConclusion({...conclusion});
    },
    onPrev: () => {
      conclusion.steps > 0 && conclusion.steps--;
      setConclusion({...conclusion});
    },
    showButtons: true
  }

  const conclusionTable = conclusion && getSchemaTable(schemaTableData);
  const getDropStyle = isDraggingOver => ({
    display: 'flex',
    width: '100%',
    backgroundColor: isDraggingOver && grey['900']
  });
  return (
    <Paper variant="outlined" style={{display: 'flex', flexBasis:'33%', marginLeft: '0.5rem'}}>
      <Droppable droppableId='ConclusionDropZone' direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            style={getDropStyle(snapshot.isDraggingOver)}
          >
              <Draggable 
                draggableId={'C'} 
                key={'C'} 
                index={0} 
              >
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    { 
                      conclusionTable
                    }
                  </div>
                )}
              </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>  
    </Paper>
  );
}

export default ConclusionDropArea;
