import React, { useContext } from 'react';
import { Box, Button, makeStyles, Tooltip } from '@material-ui/core';
import validateSchema from '../../validateSchema';
import Context from '../../context';
import styles from './BuilderButton.style';
import { getMaxSteps, getTutorialStyles } from '../../lib';

const BuilderButtons = () => {
  const { schema, setSchema, premises, setPremises, setConclusion, tutorialSteps, setTutorialSteps } = useContext(Context);
  const { symbols, type } = schema;
  const isValidSchema = validateSchema(symbols);
  const schemaSize = symbols.length;
  const useStyles = styles(makeStyles, isValidSchema, schemaSize, type);
  const classes = useStyles();
  const tooltipClasses = getTutorialStyles();
  const clearSchemaBuilder = () => {
    if (!tutorialSteps.saveSchema) {
      setTutorialSteps({
        addLetter: true,
        editorLetter: false,
        editorOperator: false,
        saveSchema: false
      });
    }
    setSchema({
      symbols: [],
      type: 'P'
    });
  } 
  const saveValidSchema = () => {
    if (isValidSchema) {
      const steps = getMaxSteps(symbols);
      type === 'P' ? 
        setPremises([...premises, {symbols: symbols, steps: steps, collapsed: false}]) :
        setConclusion({symbols: symbols, steps: steps, collapsed: false});
      setTutorialSteps({...tutorialSteps, saveSchema: true, editorOperator: true});
      setSchema({
        symbols: [],
        type: 'P'
      });
    } 
  }
  return (
    <Box mt="1rem" style={{display: 'flex', flexDirection: 'row-reverse'}}>
      <Tooltip
        title='Save schema to create an argument premise'
        arrow
        open={isValidSchema && tutorialSteps.editorOperator && !tutorialSteps.saveSchema}
        classes={tooltipClasses}
      >
        <Button 
          classes={ {root: [classes.saveBtn, classes.common].join(' ')} }
          variant="outlined"
          disabled={ !isValidSchema }
          onClick={ saveValidSchema }
        >
          save
        </Button>
      </Tooltip>
      <Button
        classes={ {root: [classes.clearBtn, classes.common].join(' ')} }
        variant="outlined"
        disabled={ schemaSize === 0 }
        onClick={ clearSchemaBuilder }
      >
        clear
      </Button>
    </Box>
  );
}

export default BuilderButtons;
