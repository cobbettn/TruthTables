import theme from '../../theme';

const getStyle = (isSavedTable) => ({ 
  alignSelf: 'center',
  backgroundColor: !isSavedTable ? theme.palette.primary.dark : theme.palette.grey[700],
});

export { getStyle } ;