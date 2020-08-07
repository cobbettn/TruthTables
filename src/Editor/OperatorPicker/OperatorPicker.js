import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DnDElement from '../DnDElement/DnDElement';

const operators = [
  {value: 'AND',  display: '\u2227', elType: 'O'}, 
  {value: 'OR',   display: '\u2228', elType: 'O'}, 
  {value: 'NOT',  display: '\u00AC', elType: 'O'}, 
  {value: 'IF',   display: '\u21D2', elType: 'O'}, 
  {value: 'IFF',  display: '\u21D4', elType: 'O'}, 
  {value: 'XOR',  display: '\u22BB', elType: 'O'}, 
  {value: 'OP',   display: '(', elType: 'G'}, 
  {value: 'CP',   display: ')', elType: 'G'},
];

const OperatorPicker = () => {
  return (
    <Paper style={{display: 'flex'}} variant="outlined">
      <Droppable droppableId="OperatorPicker" direction="horizontal">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            style={{display: 'flex'}}
          >
            {operators.map((operator, i) => 
              <Draggable draggableId={operator.value} key={operator.value} index={i} >
                {(provided, snapshot) => (
                  <div className="DraggableElement"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DnDElement config={operator}/>
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
