import { getOpCount, getTableModel, computeTable, getTableDimensions } from '../../lib';

const getButtonHandlers = (stateObj) => {
  const {
    sentenceLetters,
    tutorialSteps, 
    setTutorialSteps, 
    schema, 
    setSchema, 
    premises, 
    setPremises, 
    setConclusion, 
    isValid,
  } = stateObj;
  const { symbols, type } = schema;
  const clearSchemaBuilder = () => {
    if (!tutorialSteps.saveSchema) {
      setTutorialSteps({
        addLetter: true,
        editorLetter: false,
        editorOperator: false,
        saveSchema: false
      });
    }
    setSchema({
      symbols: [],
      type: 'P'
    });
  } 
  const saveValidSchema = () => {
    if (isValid) {
      const steps = getOpCount(symbols);
      const updateSchema = {...schema, steps: steps, collapsed: false};
      const { numRows } = getTableDimensions(sentenceLetters.length);
      const tableModel = getTableModel(stateObj);
      const { mainOpColumn } = computeTable(updateSchema, tableModel, numRows);
      if (mainOpColumn) {
        const tableInfo = {
          valid: !mainOpColumn.some(el => el === false),
          invalid: mainOpColumn.some(el => el === false),
          satisfiable: mainOpColumn.some(el => el === true),
          unsatisfiable: !mainOpColumn.some(el => el === true)
        }
        updateSchema.tableInfo = tableInfo;
      }

      type === 'P' ? 
        setPremises([...premises, updateSchema ]) :
        setConclusion(updateSchema);
      setTutorialSteps({...tutorialSteps, saveSchema: true, editorOperator: true});
      setSchema({
        symbols: [],
        type: 'P'
      });
    } 
  }
  return {
    clear: clearSchemaBuilder, 
    save: saveValidSchema 
  }
}







export { getButtonHandlers }