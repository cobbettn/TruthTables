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
  display: 'flex',
  backgroundColor: isDraggingOver && theme.palette.grey[900]
});

const getDropStyle = (snapshot) => ({
  ...dropStyle(snapshot.isDraggingOver),
  flexGrow: '1',
  height: '100%'
});

export { getDropStyle, boxStyle, typeStyle };
