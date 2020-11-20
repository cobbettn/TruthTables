import React, { useContext } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { getDropStyle, boxStyle, typeStyle } from './SchemaBuilder.style';

const SchemaBuilder = () => {
  const { schema } = useContext(Context);
  const { symbols } = schema;
  return (
    <Box style={boxStyle}>
      <Typography variant='caption' style={typeStyle}>Schema Editor:</Typography>
      <Paper variant="outlined">
        <Droppable droppableId='SchemaBuilder' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={getDropStyle(snapshot.isDraggingOver, schema)}
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              {symbols && symbols.map((config, i) => (
                <Draggable 
                  draggableId={`${config.value}${i}`} 
                  key={`${config.value}${i}`} 
                  index={i} 
                >
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >

                      {/* schemaBuilderEl determines whether DnDElement is in the builder or a picker */}
                      <DnDElement config={
                        {...config, 
                          schemaBuilderEl: true, 
                          schemaIndex: i,
                          isDragging: snapshot.isDragging
                        }
                      }/>

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
    </Box>
  );
}

export default SchemaBuilder;
