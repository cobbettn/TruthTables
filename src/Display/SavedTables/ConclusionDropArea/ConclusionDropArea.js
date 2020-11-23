import React, { useContext } from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Context from '../../../context';
import SchemaTable from '../../SchemaTable/SchemaTable';
import theme from '../../../theme';
import { getTableButtonHandlers } from '../lib';
import { boxStyle, getDropStyle } from './ConclusionDropArea.style';

const ConclusionDropArea = () => {
  const { sentenceLetters, setSchema, conclusion, setConclusion } = useContext(Context);
  const clickHandlers = getTableButtonHandlers({
    data: conclusion,
    setData: setConclusion,
    setSchema: setSchema,
  })
  return (
    <Box style={boxStyle}>
      <Typography variant='caption' style={{color: theme.palette.grey[400]}}>Conclusion:</Typography>
      <Paper style={{flexGrow: '1'}} variant="outlined">
        <Droppable style={{height: '100%'}} droppableId='ConclusionDropZone' direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
              style={{...getDropStyle(snapshot.isDraggingOver), flexGrow: '1', height: '100%', borderRadius: '5px'}}
            >
                <Draggable 
                  draggableId={'C'} 
                  key={'C'} 
                  index={0} 
                >
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    > { 
                        conclusion && <SchemaTable
                                        sentenceLetters={ sentenceLetters }
                                        schema={ conclusion }
                                        isSavedTable={ true }
                                        clickHandlers={ clickHandlers }
                                      />
                      }
                    </div>
                  )}
                </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>  
      </Paper>
    </Box>
  );
}

export default ConclusionDropArea;
