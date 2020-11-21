import React, { useContext } from 'react';
import { Box, Button, makeStyles, Tooltip } from '@material-ui/core';
import Context from '../../context';
import { getButtonHandlers } from './lib';
import { validateSchema, getTutorialStyles } from '../../lib';
import { getStyles } from './BuilderButton.style';

const BuilderButtons = () => {
  const context = useContext(Context);
  const { schema, tutorialSteps } = context;
  const isValidSchema = validateSchema(schema.symbols);
  const schemaSize = schema.symbols.length;
  const { save, clear } = getButtonHandlers({...context, isValid: isValidSchema}); 
  const open = (isValidSchema && tutorialSteps.editorOperator && !tutorialSteps.saveSchema);
  
  // find a way to make the styling less clunky 
  const useStyles = getStyles(makeStyles, isValidSchema, schemaSize, schema.type);
  const classes = useStyles();
  const tooltipClasses = getTutorialStyles();
  const saveClasses = {root: [classes.saveBtn, classes.common].join(' ')};
  const clearClasses = {root: [classes.clearBtn, classes.common].join(' ')};
  return (
    <Box mt="1rem" style={{display: 'flex', flexDirection: 'row-reverse'}}>
      <Tooltip
        title='Save schema to create an argument premise'
        arrow
        open={ open }
        classes={tooltipClasses}
      >
        <Button 
          classes={ saveClasses }
          variant="outlined"
          disabled={ !isValidSchema }
          onClick={ save }
        >
          save
        </Button>
      </Tooltip>
      <Button
        classes={ clearClasses }
        variant="outlined"
        disabled={ schemaSize === 0 }
        onClick={ clear }
      >
        clear
      </Button>
    </Box>
  );
}

export default BuilderButtons;
