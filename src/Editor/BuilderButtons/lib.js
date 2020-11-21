import { getMaxSteps } from '../../lib';

const getButtonHandlers = (stateObj) => {
  const {
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
      const steps = getMaxSteps(symbols);
      type === 'P' ? 
        setPremises([...premises, {...schema, steps: steps, collapsed: false}]) :
        setConclusion({...schema, steps: steps, collapsed: false});
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