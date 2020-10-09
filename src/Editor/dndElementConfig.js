import grey from '@material-ui/core/colors/grey';

export const getStyles = (color) => {
  return {
    backgroundColor: color || grey['700'],
  };
}

export const getOnClick = (config) => {
  const onClick = (config) => {
    if (config.letterCount > 0) {
      const { symbols } = config.schema;
      config.setSchema({...config.schema, symbols: [...symbols, config.elConfig]});
    }
  }
  return !config.elConfig.schemaBuilderEl ? () => onClick(config) : null;
}
