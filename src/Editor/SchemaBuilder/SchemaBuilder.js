import React, { useContext } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { getDropStyle, boxStyle, typeStyle } from './SchemaBuilder.style';

const SchemaBuilder = () => {
  const { schema } = useContext(Context);
  return (
    <Box style={ boxStyle }>
      <Typography variant='caption' style={ typeStyle }>Schema Editor:</Typography>
      <Paper variant="outlined">
        <Droppable style={{overflow: 'auto'}} droppableId='SchemaBuilder' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={getDropStyle(snapshot.isDraggingOver, schema)}
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              {schema.symbols && schema.symbols.map((config, i) => (
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
                      <DnDElement config={
                          {...config, 
                            schemaBuilderEl: true, 
                            schemaIndex: i,
                            isDragging: snapshot.isDragging
                          }
                        }
                      />
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
