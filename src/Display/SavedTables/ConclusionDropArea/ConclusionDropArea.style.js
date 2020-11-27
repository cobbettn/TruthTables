import theme from '../../../theme';

const getDropStyle = isDraggingOver => ({
  display: 'flex',
  flexGrow: '1',
  backgroundColor: isDraggingOver && theme.palette.grey[900]
});
const boxStyle = {
  display: 'flex', 
  minWidth: '33%',
  marginLeft: '0.5rem', 
  flexDirection:'column',
}

export { getDropStyle, boxStyle };