import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';

const SchemaBuilder = () => {
  const { schema } = useContext(Context);
  const { symbols } = schema;
  const getDropStyle = isDraggingOver => ({
    display: 'flex',
    height: '3.5rem',
    backgroundColor: isDraggingOver && grey['900']
  });
  return (
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
                    <DnDElement config={{...config, schemaBuilderEl: true}}/>

                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
}

export default SchemaBuilder;
