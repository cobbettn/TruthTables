import React, { useContext } from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../../context';
import { getDropStyle, boxStyle, typeStyle } from './PremiseDropArea.style';
import SchemaTable from '../../SchemaTable/SchemaTable';
import { getTableButtonHandlers } from '../lib';
import { getButtonHandlerData } from './lib';

const PremiseDropArea = () => {
  const context = useContext(Context);
  return (
    <Box style={ boxStyle }>
      <Typography variant='caption' style={ typeStyle }>Premises:</Typography>
      <Paper style={ {flexGrow: '1'} }variant="outlined">
        <Droppable droppableId='PremiseDropZone' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={ {...getDropStyle(snapshot)} }
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              { context.premises.map((premise, i) => (
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
                        <SchemaTable
                          { ...context } 
                          schema={ premise }
                          isSavedTable={ true }
                          clickHandlers={ 
                            getTableButtonHandlers(getButtonHandlerData(context, i)) 
                          }
                        />
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