import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FastRewindTwoToneIcon from '@material-ui/icons/FastRewindTwoTone';
import FastForwardTwoToneIcon from '@material-ui/icons/FastForwardTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { buttonStyle, boxStyle } from './SavedTableButtons.style';

const SavedTableButtons = (props) => {
  const { collapsed, clickHandlers } = props;
  const tooltipProps = {
    className: 'tableButton',
    arrow: true,
    placement: 'top'
  };
  return (
    <Box style={ boxStyle }>
      <Tooltip {...{...tooltipProps,  title: collapsed ? 'expand' : 'collapse' }}>
        <Box style={buttonStyle} onClick={clickHandlers?.onCollapse}>
          { collapsed ? <ExpandMoreIcon fontSize='small'/>: <ExpandLessIcon fontSize='small'/> }
        </Box>
      </Tooltip>
      <Tooltip {...{...tooltipProps, title: 'previous operation' }}>
        <Box style={buttonStyle} onClick={clickHandlers?.onPrev}>
          <FastRewindTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
      <Tooltip {...{...tooltipProps, title: 'next operation' }}>
        <Box style={buttonStyle} onClick={clickHandlers?.onNext}>
          <FastForwardTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
      <Tooltip {...{...tooltipProps, title: 'edit' }}>
        <Box style={buttonStyle} onClick={clickHandlers?.onEdit}>
          <EditTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
      <Tooltip {...{...tooltipProps, title: 'delete' }}>
        <Box style={buttonStyle} onClick={clickHandlers?.onDelete}>
          <DeleteTwoToneIcon fontSize='small'/>
        </Box>
      </Tooltip>
    </Box>
  );
}

export default SavedTableButtons;