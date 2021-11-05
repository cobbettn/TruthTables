import React from 'react';
import { Collapse, Box, Typography } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';
import { dragEnd, getImplies } from './lib';
import theme from '../../theme';

const SavedTables = (props) => {
  const onDragEnd = (drag) => dragEnd(drag, props);
  const savedTable = (props.premises.length !== 0 || !!props.conclusion);
  const savedArgument = (props.premises.length !== 0 && !!props.conclusion);
  const implies = getImplies(props);
  const impliesText = `${props.premises.length === 1 ? 'Premise implies' : 'Premises imply' }`;
  const notImpliesText = `${props.premises.length === 1 ? 'Premise does not imply' : 'Premises do not imply' }`;
  return (
    <Box>
      <Collapse in={ savedTable }>
        <Collapse in={ savedArgument }>
          <Typography style={{
            display: 'flex', 
            justifyContent: 'center', 
            textShadow: '2px 2px black', 
            color: theme.palette.grey[400],
          }} variant='caption'>
            { implies ? impliesText : notImpliesText } conclusion.
          </Typography> 
        </Collapse>
        <DragDropContext onDragEnd={ onDragEnd }>
          <Box style={ { display: 'flex', flexDirection:'row' } }>
            <PremiseDropArea {...props}/>
            <ConclusionDropArea {...props}/>
          </Box>
        </DragDropContext>
      </Collapse>
    </Box>
  );
}

export default SavedTables;