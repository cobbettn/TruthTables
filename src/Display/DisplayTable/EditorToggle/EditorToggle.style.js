import theme from '../../../theme';

const editorTitleStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  border: `1px solid ${theme.palette.primary.main}`,
  margin: '0.1rem',
  padding: '0.1rem',
  borderRadius: '2px'
};
const typeStyle = {
  paddingLeft: '0.25rem',
  lineHeight: '1.5rem',
};

export { editorTitleStyle, typeStyle };