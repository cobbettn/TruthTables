import theme from '../../../theme';

const getStyle = (isSavedTable, symbols) => ({ 
  alignSelf: 'center',
  display: symbols.length === 0 && 'none',
  backgroundColor: !isSavedTable ? theme.palette.primary.dark : theme.palette.grey[700],
});

export { getStyle } ;