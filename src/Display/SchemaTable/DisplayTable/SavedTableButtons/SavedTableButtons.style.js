import theme from '../../../../theme';

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
const boxStyle = {
  display: 'flex',
  justifyContent: 'center'
};

export { buttonStyle, boxStyle };