import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import Context from '../context';
import dragEnd from './dragEnd';
import SentenceLetters from './SentenceLetters/SentenceLetters';
import LetterPicker from './LetterPicker/LetterPicker';
import OperatorPicker from './OperatorPicker/OperatorPicker';
import SchemaBuilder from './SchemaBuilder/SchemaBuilder';
import BuilderButtons from './BuilderButtons/BuilderButtons';

const Editor = () => {
  const context = useContext(Context);
  const onDragEnd = (drag) => dragEnd(drag, context);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box style={{display: 'flex', alignItems: 'center'}}>
        <Box>
          <SentenceLetters style={{height: '4rem'}}/>
        </Box>
        <Box>
          <LetterPicker/>
        </Box>
        <Box ml="1rem">
          <OperatorPicker/>
        </Box>
      </Box>
      <Box mt="1rem">
        <SchemaBuilder/>
      </Box>
      <Box>
        <BuilderButtons/>
      </Box>
    </DragDropContext>
  );
}

export default Editor;
