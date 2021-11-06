import React, { useContext } from 'react';
import { Tooltip, Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import context from '../../context';
import DnDElement from '../DnDElement/DnDElement';
import { getTutorialStyles } from '../tutorialStyles';
import { operatorConfig } from '../operatorConfig';

const OperatorPicker = () => {
  const { tutorialSteps } = useContext(context);
  const classes = getTutorialStyles();

  return (
    <Tooltip
      title='Click or drag an operator into the schema editor'
      arrow
      open={tutorialSteps.editorLetter && !tutorialSteps.editorOperator}
      classes={classes}
    >
      <Paper style={{display: 'flex'}} variant="outlined">
        <Droppable droppableId="OperatorPicker" direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={{display: 'flex', height: '4rem', padding: '0.2rem', alignItems: 'center', borderRadius: '5px'}}
              className='hover'
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
                      <DnDElement config={{
                        ...config, 
                        isDragging: snapshot.isDragging, 
                      }}
                      />
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

export default OperatorPicker;
