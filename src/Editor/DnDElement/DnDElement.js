import React, { useContext } from 'react';
import { Tooltip, Card, Typography } from '@material-ui/core';
import Context from '../../context'
import { getStyles, getOnClick, getRightClick } from './lib';
import './DnDElement.scss';

const DnDElement = (props) => {
  const { sentenceLetters, schema, setSchema, tutorialSteps, setTutorialSteps } = useContext(Context);
  const { config } = props;
  const { isDragging, tooltip, schemaBuilderEl, value, bgColor } = config;
  const configObj = {
    letterCount: sentenceLetters.length,
    schema: schema,
    setSchema: setSchema,
    elConfig: config,
    tutorialSteps: tutorialSteps,
    setTutorialSteps: setTutorialSteps
  }
  const style = getStyles(bgColor, isDragging);
  const onClick = getOnClick(configObj);
  const onRightClick = getRightClick(config, schema, setSchema);
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
