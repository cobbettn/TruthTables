import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getSchemaTable, getTableButtonHandlers } from '../../displayTableLogic'
import Context from '../../../context';
import { Box, Typography } from '@material-ui/core';
import theme from '../../../theme';

const ConclusionDropArea = (props) => {
  const { conclusion, setConclusion } = props;
  const { sentenceLetters, setSchema } = useContext(Context);
  const schemaTableData = {
    sentenceLetters: sentenceLetters,
    schema: conclusion,
    showButtons: true,
    clickHandlers: getTableButtonHandlers({
      data: conclusion,
      setData: setConclusion,
      setSchema: setSchema,
      type: 'C',
      index: null
    })
  }
  const conclusionTable = conclusion && getSchemaTable(schemaTableData);
  const getDropStyle = isDraggingOver => ({
    display: 'flex',
    flexGrow: '1',
    backgroundColor: isDraggingOver && grey['900']
  });
  const boxStyle = {
    display: 'flex', 
    flexBasis:'33%', 
    marginLeft: '0.5rem', 
    flexDirection:'column',
  }
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
              style={{...getDropStyle(snapshot.isDraggingOver), flexGrow: '1', height: '100%'}}
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
                    >
                      { 
                        conclusionTable
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
