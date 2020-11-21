const getBoxStyle = (context) => {
  const { schema, premises, conclusion } = context;
  return {
    display: (schema.symbols.length > 0 || premises.length > 0 || conclusion) ? 'flex' : 'none'
};}
const paperStyle = {
  padding: '0.5rem', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export { getBoxStyle, paperStyle };
