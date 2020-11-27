import theme from '../../theme';

const getDropStyle = (isDraggingOver, schema) => {
  const { symbols, type } = schema;
  return {
    display: 'flex',
    minHeight: '4rem',
    backgroundColor: (symbols.length > 0 || isDraggingOver) && theme.palette.grey[900],
    border: symbols.length > 0 && `solid 2px ${ type === 'C' ? theme.palette.secondary.light : theme.palette.primary.light }`,
    borderRadius: '3px',
    alignItems: 'center',
    padding: '0.2rem',
    overflow: 'auto',
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