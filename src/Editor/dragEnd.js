import Colors from '../colors';

const dragEnd = (drag, schema, setSchema) => {
  const { droppableId: sourceId, index: sourceIndex } = drag.source;
  const tmpSchema = [...schema];
  if (drag?.destination) {
    const { droppableId: destId, index: destIndex } = drag.destination;
    if (destId === "SchemaBuilder") {
      if (sourceId === "SchemaBuilder") {
        const symbol = tmpSchema.splice(sourceIndex, 1)[0]; 
        tmpSchema.splice(destIndex, 0, symbol);
      }
      else {
        const symbol = drag.draggableId.substring(0, 1);
        const schemaSymbol = { value: symbol };
        if (sourceId === "OperatorPicker") {
          schemaSymbol.elType = symbol.match(/[()]/) ? 'G' : 'O';  // grouping is diplayed in operator picker
        }
        if (sourceId === "LetterPicker") {
          const colorIndex = symbol.charCodeAt(0) - 112; // revert back to ascii
          schemaSymbol.elType = 'L';
          schemaSymbol.bgColor = Colors[colorIndex];
        }
        tmpSchema.splice(destIndex, 0, schemaSymbol);
      } 
    }
  }
  else {
    if (sourceId === "SchemaBuilder") {
      tmpSchema.splice(sourceIndex, 1); 
    }
  }
  setSchema([...tmpSchema]); // update schema state
}

export default dragEnd;
