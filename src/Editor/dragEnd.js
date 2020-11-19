import OperatorConfig from './OperatorPicker/operatorConfig';
import { getMaxSteps } from '../lib';
/**
 * dragEnd()
 * 
 * Drag and drop handler for the Editor component.
 * 
 * @param {Object} drag       drag and drop event data
 * @param {Object} stateObj   object containing setters and getters for the app's state
 */
const dragEnd = (drag, stateObj) => {
  const { droppableId: sourceId, index: sourceIndex } = drag.source;
  const { symbols } = stateObj.schema;
  const tmpSchema = [...symbols];
  let dropElement;
  if (drag?.destination) {
    const { droppableId: destId, index: destIndex } = drag.destination;
    if (destId === "SchemaBuilder") {
      switch (sourceId) {
        case "SchemaBuilder": 
          [dropElement] = tmpSchema.splice(sourceIndex, 1); 
          break;
        case "LetterPicker": 
          if (!stateObj.tutorialSteps.editorLetter) {
            stateObj.setTutorialSteps({...stateObj.tutorialSteps, editorLetter: true});
          }
          dropElement = stateObj.sentenceLetters[sourceIndex];
          break;
        case "OperatorPicker":
          dropElement = OperatorConfig[sourceIndex];
          if (stateObj.tutorialSteps.editorLetter && !stateObj.tutorialSteps.editorOperator) {
            stateObj.setTutorialSteps({...stateObj.tutorialSteps, editorOperator: true});
          }
          break;
        default:
      }
      if (stateObj.sentenceLetters.length > 0) tmpSchema.splice(destIndex, 0, {...dropElement});
    }
  }
  else {
    if (sourceId === "SchemaBuilder") {
      tmpSchema.splice(sourceIndex, 1); // delete elements dragged from schemabuilder to a non-drop area
    }
  }
  
  if (!(dropElement?.elType !== 'L' && !stateObj.tutorialSteps.editorLetter)) {
    const steps = getMaxSteps(tmpSchema);
    stateObj.setSchema({...stateObj.schema, symbols: [...tmpSchema], steps: steps}); // update schema state
  } 
}

export default dragEnd;
