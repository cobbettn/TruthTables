import React, { useContext } from 'react';
import { Tooltip, Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { getTutorialStyles } from '../../lib';
import { getPaperStyles } from './LetterPicker.styles';

const LetterPicker = () => {
  const { sentenceLetters, tutorialSteps } = useContext(Context);
  const classes = getTutorialStyles();
  const paperStyles = getPaperStyles(sentenceLetters.length);
  return (
    <Tooltip
      title='Click or drag a sentence letter into schema editor'
      arrow
      open={tutorialSteps.addLetter && !tutorialSteps.editorLetter}
      classes={classes}
      placement='right'
    >
      <Paper style={ paperStyles } variant="outlined">
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
