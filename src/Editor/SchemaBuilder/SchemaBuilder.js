import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';

const SchemaBuilder = () => {
  const { schema } = useContext(Context);
  return (
    <Paper variant="outlined">
      <Droppable droppableId='SchemaBuilder' direction="horizontal">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            style={{display: 'flex', height: '3.5rem'}}
          >
            {schema.map((config, i) => (
              <Draggable draggableId={config.value} key={i} index={i} >
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DnDElement config={{...config, builderEl: true}}/>
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
