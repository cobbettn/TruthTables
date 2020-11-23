import React from 'react';
import { Box, Typography, Tooltip, Switch } from '@material-ui/core';
import { editorTitleStyle, typeStyle } from './EditorToggle.style';

const EditorToggle = (props) => {
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