
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
  };

  const saveValidSchema = () => {
    if (isValid) {
      // save editor schema as premise or conclusion
      schema.type === 'P' ? 
        setPremises([...premises, {...schema} ]) :
        setConclusion({...schema});

      // update tutorial steps
      setTutorialSteps({...tutorialSteps, saveSchema: true, editorOperator: true});
      
      // clear schema builder
      setSchema({
        symbols: [],
        type: 'P'
      }); // clear schema editor when done
    } 
  }

  return {
    clear: clearSchemaBuilder, 
    save: saveValidSchema 
  }

}

export { getButtonHandlers };
