import React, { useContext } from 'react';
import { Tooltip, Paper, Box } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { getTutorialStyles } from '../tutorialStyles';

const LetterPicker = () => {
  const { sentenceLetters, tutorialSteps } = useContext(Context);
  const classes = getTutorialStyles();
  const getDropStyles = (count) =>  ({
    display: 'flex', 
    height: '4rem', 
    alignItems: 'center',
    paddingLeft: '0.2rem',
    paddingRight: '0.2rem',
    borderRadius: '5px',
  });
  return (
    <Tooltip
      title='Click or drag a sentence letter into schema editor'
      arrow
      open={ tutorialSteps.addLetter && !tutorialSteps.editorLetter }
      classes={ classes }
      placement='right'
    > 
      <Box>
        {
          sentenceLetters.length > 0 && 
          <Paper style={ {display: 'flex', marginLeft : '1rem' } } variant="outlined">
            <Droppable droppableId="LetterPicker" direction="horizontal">
              {(provided, snapshot) => (
                <div 
                  style={ getDropStyles(sentenceLetters.length) }
                  className="hover"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...provided.dragHandleProps}
                >
                  {sentenceLetters.map((config, i) => 
                    <Draggable 
                      draggableId={config.value} 
                      key={config.value} 
                      index={i}
                    >
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
        }
      </Box>
    </Tooltip>
  );
}

export default LetterPicker;
