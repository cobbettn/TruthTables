import OperatorConfig from './operatorConfig';
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
  const tmpSchema = [...stateObj.schema];
  if (drag?.destination) {
    const { droppableId: destId, index: destIndex } = drag.destination;
    if (destId === "SchemaBuilder") {
      let dropElement; // element being dropped into schema builder
      switch (sourceId) {
        case "SchemaBuilder": 
          dropElement = tmpSchema.splice(sourceIndex, 1)[0]; 
          break;
        case "LetterPicker": 
          dropElement = stateObj.sentenceLetters[sourceIndex];
          break;
        case "OperatorPicker":
          dropElement = OperatorConfig[sourceIndex];
          break;
        default:
      }
      if (stateObj.sentenceLetters.length > 0) tmpSchema.splice(destIndex, 0, dropElement);
    }
  }
  else {
    if (sourceId === "SchemaBuilder") {
      tmpSchema.splice(sourceIndex, 1); // delete elements dragged from schemabuilder to a non-drop area
    }
  }
  stateObj.setSchema([...tmpSchema]); // update schema state
}

export default dragEnd;
