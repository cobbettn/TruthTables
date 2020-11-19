import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Context from '../../context'
import { getStyles, getOnClick } from './dndElementConfig';
import './DnDElement.scss';
import { Tooltip } from '@material-ui/core';

const DnDElement = (props) => {
  const { sentenceLetters, schema, setSchema, tutorialSteps, setTutorialSteps } = useContext(Context);
  const configObj = {
    letterCount: sentenceLetters.length,
    schema: schema,
    setSchema: setSchema,
    elConfig: props.config,
    tutorialSteps: tutorialSteps,
    setTutorialSteps: setTutorialSteps
  }
  const style = getStyles(props.config.bgColor, props.config.isDragging);
  const onClick = getOnClick(configObj);
  const onRightClick = props.config.schemaBuilderEl && ((event) => {
    event.preventDefault();
    schema.symbols.splice(props.config.schemaIndex, 1);
    setSchema({...schema});
  })
  return (
    <Tooltip
      title={ (!props.config.schemaBuilderEl && props.config.tooltip) || '' }
    >
      <Card 
        className="DnDElement" 
        style={style}
        elevation={10}
        onClick={ onClick }
        onContextMenu={ onRightClick }
      >
        <Typography>{props.config.value}</Typography>
      </Card>
    </Tooltip>
  );
}

export default DnDElement;
