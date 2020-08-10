import React from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import SentenceLetters from './SentenceLetters/SentenceLetters';
import LetterPicker from './LetterPicker/LetterPicker';
import OperatorPicker from './OperatorPicker/OperatorPicker';
import SchemaBuilder from './SchemaBuilder/SchemaBuilder';

const dragEnd = (x) => {
  console.log(x); // logs out drag data
}

const Editor = () => {
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Box id="topRow" style={{display: 'flex'}}>
        <Box>
          <SentenceLetters/>
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
    </DragDropContext>
  );
}

export default Editor;
