import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DnDElement from '../DnDElement/DnDElement';

// AND, OR, NOT, CONDITIONAL, IFF, XOR, OPEN PARENTHESIS, CLOSE PARENTHESIS
const operatorConfig = [
  {value: '\u2227', elType: 'O'}, 
  {value: '\u2228', elType: 'O'}, 
  {value: '\u00AC', elType: 'O'}, 
  {value: '\u21D2', elType: 'O'}, 
  {value: '\u21D4', elType: 'O'}, 
  {value: '\u22BB', elType: 'O'}, 
  {value: '(', elType: 'G'}, 
  {value: ')', elType: 'G'},
];

const OperatorPicker = () => {
  return (
    <Paper style={{display: 'flex'}} variant="outlined">
      <Droppable droppableId="OperatorPicker" direction="horizontal">
        {(provided, snapshot) => (
          <div 
            style={{display: 'flex'}}
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
          >
            {operatorConfig.map((config, i) => 
              <Draggable draggableId={config.value} key={config.value} index={i} >
                {(provided, snapshot) => (
                  <div 
                    className="DraggableElement"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DnDElement config={config}/>
                  </div>
                )}
              </Draggable>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
}

export default OperatorPicker;
