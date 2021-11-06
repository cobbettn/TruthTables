import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { DragDropContext } from 'react-beautiful-dnd';
import Context from '../context';
import SentenceLetters from './SentenceLetters/SentenceLetters';
import LetterPicker from './LetterPicker/LetterPicker';
import OperatorPicker from './OperatorPicker/OperatorPicker';
import SchemaBuilder from './SchemaBuilder/SchemaBuilder';
import BuilderButtons from './BuilderButtons/BuilderButtons';
import { operatorConfig } from '../Editor/operatorConfig'
import { getOpCount } from '../lib';
import './Editor.scss';

const Editor = () => {
  const context = useContext(Context);
  /**
 * dragEnd()
 * 
 * Drag and drop logic for the Editor component.
 * 
 * @param {Object} drag     drag and drop event data
 * @param {Object} context  app state setters and getters
 */
const dragEnd = (drag, context) => {
  const { sentenceLetters, schema, setSchema, tutorialSteps, setTutorialSteps } = context;
  const { droppableId: sourceId, index: sourceIndex } = drag.source;
  const tmpSchema = [...schema.symbols];
  let dropElement;
  if (drag?.destination) {
    const { droppableId: destId, index: destIndex } = drag.destination;
    if (destId === "SchemaBuilder") {
      switch (sourceId) {
        case "SchemaBuilder": 
          [dropElement] = tmpSchema.splice(sourceIndex, 1); 
          break;
        case "LetterPicker": 
          if (!tutorialSteps.editorLetter) {
            setTutorialSteps({tutorialSteps, editorLetter: true});
          }
          dropElement = sentenceLetters[sourceIndex];
          break;
        case "OperatorPicker":
          dropElement = operatorConfig[sourceIndex];
          if (tutorialSteps.editorLetter && !tutorialSteps.editorOperator) {
            setTutorialSteps({...tutorialSteps, editorOperator: true});
          }
          break;
        default:
      }
      if (sentenceLetters.length > 0) tmpSchema.splice(destIndex, 0, {...dropElement});
    }
  }
  else {
    if (sourceId === "SchemaBuilder") {
      tmpSchema.splice(sourceIndex, 1); // delete elements dragged from schemabuilder to a non-drop area
    }
  }
  
  if (!(dropElement?.elType !== 'L' && !tutorialSteps.editorLetter)) {
    const steps = getOpCount(tmpSchema);
    setSchema({...schema, symbols: [...tmpSchema], steps: steps}); // update schema state
  } 
}
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
