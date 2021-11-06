import React, { useContext } from 'react';
import { Tooltip, Card, Typography } from '@material-ui/core';
import Context from '../../context';
import theme from '../../theme';
import { getOpCount } from '../../lib';
import './DnDElement.scss';

const DnDElement = (props) => {
  const context = useContext(Context);
  const { config } = props;
  const { isDragging, tooltip, schemaBuilderEl, value, bgColor } = config;
  const getStyles = (color, isDragging) => {
    return {
      backgroundColor: color || theme.palette.grey[700],
      border: isDragging && `white solid 2px`,
      opacity: isDragging && 0.8,
      boxShadow: isDragging && `0 0 3px 5px ${theme.palette.primary.main}`
    };
  }
  const style = getStyles(bgColor, isDragging);

  const getOnClick = (data) => {
    const {
      sentenceLetters,
      schema,
      setSchema,
      elConfig,
      tutorialSteps,
      setTutorialSteps
    } = data;
    const { symbols } = schema; 
    const { elType } = elConfig;
    const onClick = () => {
      if (sentenceLetters.length > 0) {
        const steps = getOpCount(symbols);
        if (elType === 'L' && !tutorialSteps.editorLetter) {
          setTutorialSteps({...tutorialSteps, editorLetter: true});
        } 
        if (elType !== 'L' && tutorialSteps.editorLetter && !tutorialSteps.editorOperator) {
            setTutorialSteps({...tutorialSteps, editorOperator: true});
        } 
        if (!(elType !== 'L' && !tutorialSteps.editorLetter)) {
          setSchema(
            {...schema, 
              type: schema.type || ' P', 
              symbols: [...symbols, elConfig], 
              steps: steps
            }
          );
        }
      }
    }
    return !elConfig.schemaBuilderEl ? () => onClick() : null;
  }
  const onClick = getOnClick({...context, elConfig: config});
  const getRightClick = (data) => {
    const { schema, setSchema, config } = data;
    const { schemaBuilderEl, schemaIndex } = config;
    return schemaBuilderEl && ((event) => {
      event.preventDefault();
      schema.symbols.splice(schemaIndex, 1);
      setSchema({...schema});
    });
  } 
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
