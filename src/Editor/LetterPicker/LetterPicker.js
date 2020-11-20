import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Tooltip } from '@material-ui/core';
import { getTutorialStyles } from '../../lib';

const LetterPicker = () => {
  const { sentenceLetters, tutorialSteps } = useContext(Context);
  const getPaperStyles = (count) => { 
    const style = {
      display: 'flex',
      width: count === 0 && '0px'
    }
    if (count > 0) style.marginLeft = '1rem';
    return style;
  }
  const classes = getTutorialStyles();
  return (
    <Tooltip
      title='Click or drag a sentence letter into schema editor'
      arrow
      open={tutorialSteps.addLetter && !tutorialSteps.editorLetter}
      classes={classes}
      placement='right'
    >
      <Paper style={getPaperStyles(sentenceLetters.length)} variant={sentenceLetters.length > 0 ?'outlined' : null }>
        <Droppable droppableId="LetterPicker" direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={{display: 'flex', padding: '0.2rem', borderRadius: '5px'}}
              className='hover'
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
                      <DnDElement config={{...config, isDragging: snapshot.isDragging}}/>
                    </div>
                  )}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
    </Tooltip>
  );
}

export default LetterPicker;
