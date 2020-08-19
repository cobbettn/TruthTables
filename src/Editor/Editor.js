import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import SentenceLetters from './SentenceLetters/SentenceLetters';
import LetterPicker from './LetterPicker/LetterPicker';
import OperatorPicker from './OperatorPicker/OperatorPicker';
import SchemaBuilder from './SchemaBuilder/SchemaBuilder';
import BuilderButtons from './BuilderButtons/BuilderButtons';
import Context from '../context';
import dragEnd from './dragEnd';

const Editor = () => {
  const { sentenceLetters, schema, setSchema } = useContext(Context);
  const stateObj = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    setSchema: setSchema,
  }
  const onDragEnd = (drag) => dragEnd(drag, stateObj);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box style={{display: 'flex'}}>
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
      <Box>
        <BuilderButtons/>
      </Box>
    </DragDropContext>
  );
}

export default Editor;
