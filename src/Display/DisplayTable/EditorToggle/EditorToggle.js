import React from 'react';
import { Box, Typography, Tooltip, Switch } from '@material-ui/core';
import { editorTitleStyle } from '../DisplayTable.style';

const EditorToggle = (props) => {
  const { schemaType, clickHandlers } = props;
  return (
    <Box style={editorTitleStyle}>
      <Typography 
        style={{paddingLeft: '0.25rem', lineHeight: '1.5rem'}} 
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