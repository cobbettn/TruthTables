
const getBoxStyle = (symbols, premises, conclusion) => {
  return {
    display: (symbols.length > 0 || premises.length > 0 || conclusion) ? 'flex' : 'none'
};}
const paperStyle = {
  padding: '0.5rem', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export { getBoxStyle, paperStyle }