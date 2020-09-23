import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const LetterPicker = () => {
  const { sentenceLetters } = useContext(Context);
  const getPaperStyles = (count) => { 
    const style = {
      display: count === 0 ? 'none' : 'flex'
    }
    if (count > 0) style.marginLeft = '1rem';
    return style;
  }
  return (
    <Paper style={getPaperStyles(sentenceLetters.length)} variant="outlined">
      <Droppable droppableId="LetterPicker" direction="horizontal">
        {(provided, snapshot) => (
          <div 
            style={{display: 'flex'}}
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
          >
            {sentenceLetters.map((config, i) => 
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
