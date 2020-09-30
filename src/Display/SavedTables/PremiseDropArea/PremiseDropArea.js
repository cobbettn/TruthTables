import React from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getSavedTables } from '../../displayTableLogic';

const PremiseDropArea = (props) => {
  const premiseTables =  getSavedTables(props);
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