import theme from '../../../theme';

const boxStyle = {
  display: 'flex', 
  flexBasis: '66%', 
  flexDirection: 'column',
}

const typeStyle = {
  color: theme.palette.grey[400]
}

const dropStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver && theme.palette.grey[900]
});

const getDropStyle = (snapshot) => ({
  ...dropStyle(snapshot.isDraggingOver),
  display: 'flex',
  flexGrow: '1',
  height: '100%',
  borderRadius: '5px'
});

export { getDropStyle, boxStyle, typeStyle };
