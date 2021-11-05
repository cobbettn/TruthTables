import React  from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SchemaTable from '../../SchemaTable/SchemaTable';
import { getTableButtonHandlers } from '../tableButtonHandlers';
import theme from '../../../theme';

const PremiseDropArea = (props) => {
  
  const getButtonHandlerData = (context, i) => {
    const { premises, setPremises, setSchema  } = context;
    return {
      data: premises[i],
      setData: (data) => {
        data ? premises[i] = {...data} : premises.splice(i, i + 1); // delete premise when data is null, update otherwise
        setPremises([...premises]);
      },
      setSchema: setSchema,
    };
  }
  
  // styles
  const boxStyle = {
    display: 'flex', 
    minWidth: '66%', 
    flexDirection: 'column',
    overflow: 'auto',
  }

  const typeStyle = {
    color: theme.palette.grey[400]
  }

  const dropStyle = isDraggingOver => ({
    backgroundColor: isDraggingOver && theme.palette.grey[900]
  });

  const getDropStyle = (snapshot) => ({
    ...dropStyle(snapshot.isDraggingOver),
    display: 'flex',
    flexGrow: '1',
    height: '100%',
    borderRadius: '5px',
  });

  return (
    <Box style={ boxStyle }>
      <Typography variant='caption' style={ typeStyle }>Premises:</Typography>
      <Paper style={{flexGrow: '1', overflow: 'auto'}} variant="outlined">
        <Droppable droppableId='PremiseDropZone' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={ {...getDropStyle(snapshot)} }
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              { props.premises.map((premise, i) => (
                <Draggable 
                  draggableId={`p${i}`} 
                  key={`p${i}`} 
                  index={i} 
                >
                  { (provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      { 
                        <SchemaTable
                          sentenceLetters={ props.sentenceLetters }
                          schema={ premise }
                          isSavedTable={ true }
                          clickHandlers={ 
                            getTableButtonHandlers(getButtonHandlerData(props, i)) 
                          }
                        />
                      }
                    </div>
                  ) }
                </Draggable>
              )) }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
    </Box>
  );
}

export default PremiseDropArea;