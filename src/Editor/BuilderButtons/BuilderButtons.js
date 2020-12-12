import React, { useContext } from 'react';
import { Box, Button, Tooltip } from '@material-ui/core';
import Context from '../../context';
import { getButtonHandlers } from './lib';
import { getTutorialStyles } from '../lib';
import { validateSchema } from '../../lib';
import { getStyles } from './BuilderButton.style';

const BuilderButtons = () => {
  const context = useContext(Context);
  const { schema, tutorialSteps } = context;
  const isValidSchema = validateSchema(schema.symbols);
  const { save, clear } = getButtonHandlers({...context, isValid: isValidSchema}); 
  const open = (isValidSchema && tutorialSteps.editorOperator && !tutorialSteps.saveSchema);
  
  const classes = getStyles(isValidSchema, schema.symbols.length, schema.type);
  const tooltipClasses = getTutorialStyles();
  const saveClasses = {root: [classes.saveBtn, classes.common].join(' ')};
  const clearClasses = {root: [classes.clearBtn, classes.common].join(' ')};
  return (
    <Box mt="1rem" style={{display: 'flex', flexDirection: 'row-reverse'}}>
      <Tooltip
        title='Save schema'
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
        disabled={ schema.symbols.length === 0 }
        onClick={ clear }
      >
        clear
      </Button>
    </Box>
  );
}

export default BuilderButtons;
