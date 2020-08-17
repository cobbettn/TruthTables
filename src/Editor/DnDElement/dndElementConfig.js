import grey from '@material-ui/core/colors/grey';

export const getStyles = (color) => {
  return {
    backgroundColor: color ? color['500'] : grey['700'],
  };
}

export const getOnClick = (config) => {
  const onClick = (config) => {
    if (config.count > 0) config.setSchema([...config.schema, {...config.elConfig}]);
  }
  return !config.elConfig.schemaBuilderEl ? () => onClick(config) : null;
}
