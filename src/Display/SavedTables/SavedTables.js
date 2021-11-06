import React from 'react';
import { Collapse, Box, Typography } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import PremiseDropArea from './PremiseDropArea/PremiseDropArea';
import ConclusionDropArea from './ConclusionDropArea/ConclusionDropArea';
import { getTableDimensions } from '../../lib';
import theme from '../../theme';

const SavedTables = (props) => {
  const premiseDropZone = 'PremiseDropZone';
  const conclusionDropZone = 'ConclusionDropZone';
  
  // dnd handler for saved tables
  const dragEnd = (drag, context) => {
    const { destination, source } = drag;
    const { premises, setPremises, conclusion, setConclusion } = context;
    const { index: sourceIndex, droppableId: sourceId } = source;
    if (sourceId === premiseDropZone) {
      if (destination?.droppableId === premiseDropZone) {
        const [el] = premises.splice(sourceIndex, 1);
        premises.splice(destination.index, 0, el);
        setPremises([...premises]);
      }
      if (destination?.droppableId === conclusionDropZone) {
        const [el] = premises.splice(sourceIndex, 1);
        if (conclusion) setPremises([...premises, { ...conclusion, type: 'P'}]);
        setConclusion({...el, type : 'C'});
      }
      // delete by drag off 
      if (!destination) {
        premises.splice(sourceIndex, 1);
        setPremises([...premises]);
      }
    }
    if (sourceId === conclusionDropZone) {
      if (destination?.droppableId === premiseDropZone) {
        setPremises([...premises, {...conclusion, type: 'P'}]);
        setConclusion(null);
      }
      // delete by drag off 
      if (!destination) {
        setConclusion(null);
      }
    }
  }

  // determine if premise(s) imply conclusion
  const getImplies = (props) => {
    let implies = false; 
    const { sentenceLetters, premises, conclusion } = props;
    const { numRows } = getTableDimensions(sentenceLetters.length);
    if (premises.length > 0 && !!conclusion) {
      implies = true;
    
      let reducedPremises = [];
      
      for (let i = 0; i < numRows; i++) {
        let rowVal;
        premises.forEach(premise => {
          const mainOpVal = premise.maxStepsOpCol[i];
          rowVal = rowVal === undefined ? mainOpVal : (rowVal && mainOpVal);
        });
        reducedPremises.push(rowVal);
      }
      
      for (let i = 0; i < numRows; i++) {
        if (reducedPremises[i] === true && conclusion.maxStepsOpCol[i] === false) {
          implies = false;
          break;
        }
      }
    }
  
    return implies;
  }

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