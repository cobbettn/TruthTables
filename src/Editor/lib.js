import { makeStyles } from '@material-ui/core';
import { operatorConfig } from './OperatorPicker/lib';
import { getMaxSteps } from '../lib';

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
    const steps = getMaxSteps(tmpSchema);
    setSchema({...schema, symbols: [...tmpSchema], steps: steps}); // update schema state
  } 
}

const getTutorialStyles = makeStyles(theme => (
  {
    arrow: {
      color: theme.palette.common.white
    },
    tooltip : {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontSize: '12px',
      boxShadow: `2px 2px 2px ${theme.palette.common.black}`
    }
  }
));

export { getTutorialStyles, dragEnd };

