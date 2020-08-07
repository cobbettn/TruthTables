import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import Colors from '../../colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const LetterPicker = () => {
  const { sentenceCount } = useContext(Context);
  const letters =  [...Array(sentenceCount)].map((e, i) => String.fromCharCode(112 + i));
  const style = {
    display: sentenceCount === 0 ? 'none' : null,
    marginLeft: sentenceCount > 0 ? '1rem' : null
  }
  return (
    <Paper style={style} variant="outlined">
      <Droppable droppableId="LetterPicker" direction="horizontal">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            style={{display: 'flex'}}
          >
            {letters.map((letter, i) => 
              <Draggable draggableId={letter} key={letter} index={i} >
                {(provided, snapshot) => (
                  <div className="DraggableElement"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DnDElement key={letter} config={{value: letter, display: letter, elType: 'L', bgColor: Colors[i]['500']}}/>
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

export default LetterPicker;
