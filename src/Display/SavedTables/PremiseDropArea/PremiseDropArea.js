import React, { useContext } from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../../context';
import { getPremiseTables } from './lib';
import { getDropStyle, boxStyle, typeStyle } from './PremiseDropArea.style';

const PremiseDropArea = () => {
  const context = useContext(Context);
  const premiseTables = getPremiseTables(context);
  return (
    <Box style={ boxStyle }>
      <Typography variant='caption' style={ typeStyle }>Premises:</Typography>
      <Paper style={{flexGrow: '1'}}variant="outlined">
        <Droppable droppableId='PremiseDropZone' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={ {...getDropStyle(snapshot.isDraggingOver)} }
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
                      { 
                        premiseTable 
                      }
                    </div>
                  ) }
                </Draggable>
              )) }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
    </Box>
  );
}

export default PremiseDropArea;