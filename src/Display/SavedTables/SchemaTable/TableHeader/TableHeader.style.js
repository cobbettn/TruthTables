import theme from '../../../../theme';

const getStyle = (header, index, mainOpIndex) => {
  const style = {
    backgroundColor: header.bgColor || theme.palette.grey[700],
  }
  if (mainOpIndex === index) style.fontWeight = 'bold'
  return style;
};

export { getStyle }