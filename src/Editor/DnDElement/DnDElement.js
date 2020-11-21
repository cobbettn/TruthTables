import React, { useContext } from 'react';
import { Tooltip, Card, Typography } from '@material-ui/core';
import Context from '../../context'
import { getStyles, getOnClick, getRightClick } from './lib';
import './DnDElement.scss';

const DnDElement = (props) => {
  const context = useContext(Context);
  const { config } = props;
  const { isDragging, tooltip, schemaBuilderEl, value, bgColor } = config;
  const style = getStyles(bgColor, isDragging);
  const onClick = getOnClick({...context, elConfig: config});
  const onRightClick = getRightClick({...context, config: config});
  return (
    <Tooltip
      title={ (!schemaBuilderEl && tooltip) || '' }
    >
      <Card 
        className="DnDElement" 
        style={ style }
        elevation={10}
        onClick={ onClick }
        onContextMenu={ onRightClick }
      >
        <Typography>{ value }</Typography>
      </Card>
    </Tooltip>
  );
}

export default DnDElement;
