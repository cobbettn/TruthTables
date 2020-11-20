import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getTableButtonHandlers } from '../../lib';
import Context from '../../../context';
import { Typography, Box } from '@material-ui/core';
import theme from '../../../theme';
import SchemaTable from '../SchemaTable/SchemaTable';

const PremiseDropArea = () => {
  const { sentenceLetters, setSchema, premises, setPremises } = useContext(Context);
  
  const getDropStyle = isDraggingOver => ({
    display: 'flex',
    borderRadius: '4px',
    backgroundColor: isDraggingOver && grey[900]
  });
 
  const boxStyle = {
    display: 'flex', 
    flexBasis: '66%', 
    flexDirection: 'column',
  }

  const premiseTables = premises?.map((premise, i) => (
    
    <SchemaTable
      sentenceLetters={sentenceLetters}
      schema= {{...premise}}
      isSavedTable={true}
      clickHandlers={ getTableButtonHandlers(
        {
          data: premise,
          setData: (data) => {
            data ? premises[i] = {...data} : premises.splice(i, i + 1); // delete premise when data is null, update otherwise
            setPremises([...premises]);
          },
          setSchema: setSchema
        }
      )}
    />
    
  ));

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
                      { 
                        premiseTable 
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