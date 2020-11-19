import grey from '@material-ui/core/colors/grey';
import { getMaxSteps } from '../lib';

export const getStyles = (color, isDragging) => {
  return {
    backgroundColor: color || grey['700'],
    border: isDragging && `white solid 2px`,
    opacity: isDragging && 0.8
  };
}

export const getOnClick = (config) => {
  const {
    letterCount,
    schema,
    setSchema,
    elConfig,
    tutorialSteps,
    setTutorialSteps
  } = config;
  const { symbols } = schema; 
  const { elType } = elConfig;
  const onClick = () => {
    if (letterCount > 0) {
      const steps = getMaxSteps(symbols);
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
