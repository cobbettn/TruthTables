import theme from '../../theme';
import { getOpCount } from '../../lib';

const getStyles = (color, isDragging) => {
  return {
    backgroundColor: color || theme.palette.grey[700],
    border: isDragging && `white solid 2px`,
    opacity: isDragging && 0.8,
    boxShadow: isDragging && `0 0 3px 5px ${theme.palette.primary.main}`
  };
}

const getOnClick = (data) => {
  const {
    sentenceLetters,
    schema,
    setSchema,
    elConfig,
    tutorialSteps,
    setTutorialSteps
  } = data;
  const { symbols } = schema; 
  const { elType } = elConfig;
  const onClick = () => {
    if (sentenceLetters.length > 0) {
      const steps = getOpCount(symbols);
      if (elType === 'L' && !tutorialSteps.editorLetter) {
        setTutorialSteps({...tutorialSteps, editorLetter: true});
      } 
      if (elType !== 'L' && tutorialSteps.editorLetter && !tutorialSteps.editorOperator) {
          setTutorialSteps({...tutorialSteps, editorOperator: true});
      } 
      if (!(elType !== 'L' && !tutorialSteps.editorLetter)) {
        setSchema(
          {...schema, 
            type: schema.type || ' P', 
            symbols: [...symbols, elConfig], 
            steps: steps
          }
        );
      }
    }
  }
  return !elConfig.schemaBuilderEl ? () => onClick() : null;
}

const getRightClick = (data) => {
  const { schema, setSchema, config } = data;
  const { schemaBuilderEl, schemaIndex } = config;
  return schemaBuilderEl && ((event) => {
    event.preventDefault();
    schema.symbols.splice(schemaIndex, 1);
    setSchema({...schema});
  });
} 

export { getStyles, getOnClick, getRightClick };
