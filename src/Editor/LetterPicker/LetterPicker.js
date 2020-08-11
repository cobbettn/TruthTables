import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import Colors from '../../colors';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const LetterPicker = () => {
  const { sentenceCount } = useContext(Context);
  const letterConfig = [...Array(sentenceCount)].map((el, i) => {
    return {
      value: String.fromCharCode(112 + i), 
      bgColor: Colors[i],
      elType: 'L',
    }
  });
  const style = {
    display: sentenceCount === 0 ? 'none' : null,
    marginLeft: sentenceCount > 0 ? '1rem' : null,
  }
  return (
    <Paper style={style} variant="outlined">
      <Droppable droppableId="LetterPicker" direction="horizontal">
        {(provided, snapshot) => (
          <div 
            style={{display: 'flex'}}
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
          >
            {letterConfig.map((config, i) => 
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

export default LetterPicker;
