import React from 'react';
import { Box, Typography, Tooltip, Switch } from '@material-ui/core';
import theme from '../../../../theme';
const EditorToggle = (props) => {
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
  const { schemaType, clickHandlers } = props;
  return (
    <Box style={ editorTitleStyle }>
      <Typography 
        style={ typeStyle } 
        variant='caption'
      >
        { schemaType === 'P' ? 'Premise' : 'Conclusion'}
      </Typography>
      <Tooltip 
        title='save as a premise or conclusion'
        placement='top'
        arrow={true}
      >
        <Switch
          size='small'
          checked={schemaType === 'C'}
          onChange={clickHandlers?.onSwitch}
        />
      </Tooltip>
    </Box>
  );
}

export default EditorToggle;