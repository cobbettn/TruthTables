import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getSavedPremiseTables } from '../../displayTableLogic';
import Context from '../../../context';
import { Typography, Box } from '@material-ui/core';
import theme from '../../../theme';

const PremiseDropArea = (props) => {
  const { premises, setPremises } = props;
  const { sentenceLetters, setSchema } = useContext(Context);
  const savedPremisesData = {
    sentenceLetters: sentenceLetters,
    premises: premises,
    setPremises: setPremises,
    setSchema: setSchema,
  }
  const premiseTables = premises && getSavedPremiseTables(savedPremisesData);
  const getDropStyle = isDraggingOver => ({
    display: 'flex',
    backgroundColor: isDraggingOver && grey['900']
  });
  const boxStyle = {
    display: 'flex', 
    flexBasis: '66%', 
    flexDirection: 'column',
  }
  return (
    <Box style={boxStyle}>
      <Typography variant='caption' style={{color: theme.palette.grey[400]}}>Premises:</Typography>
      <Paper style={{flexGrow: '1'}}variant="outlined">
        <Droppable droppableId='PremiseDropZone' direction="horizontal">
          {(provided, snapshot) => (
            <div 
              style={{...getDropStyle(snapshot.isDraggingOver), flexGrow: '1', height: '100%'}}
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              { premiseTables && premiseTables.map((premiseTable, i) => (
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
                      { premiseTable }
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