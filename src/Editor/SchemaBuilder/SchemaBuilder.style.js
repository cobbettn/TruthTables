import theme from '../../theme';

const getDropStyle = (isDraggingOver, schema) => {
  const { symbols, type } = schema;
  return {
    display: 'flex',
    height: '4rem',
    backgroundColor: (symbols.length > 0 || isDraggingOver) && theme.palette.grey[900],
    border: symbols.length > 0 && `solid 2px ${ type === 'C' ? theme.palette.secondary.light : theme.palette.primary.light }`,
    borderRadius: '3px',
    alignItems: 'center',
    paddingLeft: '0.1rem',
  };
}
const boxStyle = {
  paddingTop: '2rem', 
  display: 'flex', 
  flexDirection: 'column'
};
const typeStyle = { 
  color: theme.palette.grey[400]
};

export { getDropStyle, boxStyle, typeStyle };