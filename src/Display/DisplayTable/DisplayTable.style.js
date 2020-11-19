import theme from '../../theme';

const buttonStyle = {
  border: `1px solid ${theme.palette.grey[900]}`,
  width: '1.5rem',
  height: '1.5rem',
  lineHeight: '1.5rem',
  display: 'flex',
  justifyContent: 'center', 
  alignContent: 'center',  
  margin: '0.1rem',
  borderRadius: '3px', 
  cursor: 'pointer',
  boxShadow: `1px 1px 1px ${theme.palette.grey[800]}`,
};
const editorTitleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  border: `1px solid ${theme.palette.primary.main}`,
  margin: '0.1rem',
  padding: '0.1rem',
  borderRadius: '2px'
};
const getTableStyles = isSavedTable => ({
  display: 'flex', 
  justifyContent: 'center', 
  backgroundColor: isSavedTable ? theme.palette.grey[600] : theme.palette.primary.main,
  margin: '0.2rem',
  padding: '0.2rem',
  borderRadius: '3px'
})

export { buttonStyle, editorTitleStyle, getTableStyles };
