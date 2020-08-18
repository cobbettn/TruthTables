import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getLetters, getStyles } from './letterPickerConfig';

const LetterPicker = () => {
  const { sentenceCount } = useContext(Context);
  const style = getStyles(sentenceCount);
  const letterConfig = getLetters(sentenceCount);
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
