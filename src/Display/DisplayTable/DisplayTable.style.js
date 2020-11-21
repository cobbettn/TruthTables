import theme from '../../theme';

const getTableStyles = isSavedTable => ({
  display: 'flex', 
  justifyContent: 'center', 
  backgroundColor: isSavedTable ? theme.palette.grey[600] : theme.palette.primary.main,
  margin: '0.2rem',
  padding: '0.2rem',
  borderRadius: '3px'
})

export { getTableStyles };
