import grey from '@material-ui/core/colors/grey';
import { getMaxSteps } from '../lib';

export const getStyles = (color) => {
  return {
    backgroundColor: color || grey['700'],
  };
}

export const getOnClick = (config) => {
  const onClick = (config) => {
    if (config.letterCount > 0) {
      const { symbols } = config.schema;
      const steps = getMaxSteps(symbols);
      config.setSchema({...config.schema, symbols: [...symbols, config.elConfig], steps: steps});
    }
  }
  return !config.elConfig.schemaBuilderEl ? () => onClick(config) : null;
}
