import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getSavedPremiseTables } from '../../displayTableLogic';
import Context from '../../../context';

const PremiseDropArea = (props) => {
  const { premises, setPremises } = props;
  const { sentenceLetters, setSchema } = useContext(Context);
  const savedPremisesData = {
    sentenceLetters: sentenceLetters,
    premises: premises,
    setPremises: setPremises,
    setSchema: setSchema
  }
  const premiseTables = premises && getSavedPremiseTables(savedPremisesData);
  const getDropStyle = isDraggingOver => ({
    display: 'flex',
    width: '100%',
    backgroundColor: isDraggingOver && grey['900']
  });
  return (
    <Paper variant="outlined" style={{display: 'flex', flexBasis: '66%'}}>
      <Droppable droppableId='PremiseDropZone' direction="horizontal">
        {(provided, snapshot) => (
          <div 
            style={getDropStyle(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
          >
            { premiseTables && premiseTables.map((premiseTable, i) => (
              <Draggable 
                draggableId={`p${i}`} 
                key={`p${i}`} 
                index={i} 
              >
                { (provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    { premiseTable }
                  </div>
                ) }
              </Draggable>
            )) }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  )
}

export default PremiseDropArea;