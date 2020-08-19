import OperatorConfig from '../Editor/OperatorPicker/operatorConfig';
/**
 * dragEnd()
 * 
 * Drag and drop handler for the Editor component.
 * 
 * @param {Object} drag       drag and drop event data
 * @param {Object} stateObj   object containing setters and getters for the application state
 */
const dragEnd = (drag, stateObj) => {
  const { droppableId: sourceId, index: sourceIndex } = drag.source;
  const tmpSchema = [...stateObj.schema];
  if (drag?.destination) {
    const { droppableId: destId, index: destIndex } = drag.destination;
    if (destId === "SchemaBuilder") {
      let element;
      switch (sourceId) {
        case "SchemaBuilder": 
          element = tmpSchema.splice(sourceIndex, 1)[0]; 
          break;
        case "LetterPicker": 
          element = stateObj.sentenceLetters[sourceIndex];
          break;
        case "OperatorPicker":
          element = OperatorConfig[sourceIndex];
          break;
        default:
      }
      if (stateObj.sentenceLetters.length > 0) tmpSchema.splice(destIndex, 0, element);
    }
  }
  else {
    if (sourceId === "SchemaBuilder") {
      tmpSchema.splice(sourceIndex, 1); 
    }
  }
  stateObj.setSchema([...tmpSchema]); // update schema state
}

export default dragEnd;
