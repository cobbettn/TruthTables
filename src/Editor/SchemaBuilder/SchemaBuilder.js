import React, { useContext } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import theme from '../../theme'
import DnDElement from '../DnDElement/DnDElement';

const SchemaBuilder = () => {
  const { schema } = useContext(Context);
  const { symbols } = schema;
  const getDropStyle = (isDraggingOver) => ({
    display: 'flex',
    height: '3.5rem',
    backgroundColor: isDraggingOver && grey['900'],
    border: schema.symbols.length > 0 && 
      `solid 2px ${ schema.type === 'C' ? theme.palette.secondary.light : theme.palette.primary.light }`,
    borderRadius: '3px',
    alignItems: 'center'
  });
  return (
    <Box style={{paddingTop: '2rem', display: 'flex', flexDirection: 'column'}}>
      <Typography variant='caption' style={{color: theme.palette.grey[400]}}>Schema Editor:</Typography>
      <Paper variant="outlined">
        <Droppable droppableId='SchemaBuilder' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={getDropStyle(snapshot.isDraggingOver)}
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
