import React, { useContext } from 'react';
import { Box, Button, Tooltip } from '@material-ui/core';
import Context from '../../context';
import { getTutorialStyles } from '../tutorialStyles';
import { validateSchema } from '../../lib';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme';

const BuilderButtons = () => {
  const context = useContext(Context);
  const { schema, tutorialSteps } = context;
  const isValidSchema = validateSchema(schema.symbols);
  
  const getButtonHandlers = (stateObj) => {
  
    const {
      tutorialSteps, 
      setTutorialSteps, 
      schema, 
      setSchema, 
      premises, 
      setPremises, 
      setConclusion, 
      isValid,
    } = stateObj;
  
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
    };
  
    const saveValidSchema = () => {
      if (isValid) {
        // save editor schema as premise or conclusion
        schema.type === 'P' ? 
          setPremises([...premises, {...schema} ]) :
          setConclusion({...schema});
  
        // update tutorial steps
        setTutorialSteps({...tutorialSteps, saveSchema: true, editorOperator: true});
        
        // clear schema builder
        setSchema({
          symbols: [],
          type: 'P'
        }); // clear schema editor when done
      } 
    }
  
    return {
      clear: clearSchemaBuilder, 
      save: saveValidSchema 
    }
  
  };

  const { save, clear } = getButtonHandlers({...context, isValid: isValidSchema}); 
  const open = (isValidSchema && tutorialSteps.editorOperator && !tutorialSteps.saveSchema);
  
  const getStyles = (validSchema, schemaSize, schemaType) => {
    const { 
      main:   primaryMain, 
      dark:   primaryDark, 
      light:  primaryLight,
    } = theme.palette.primary;
    const {
      main:   secondaryMain,
      dark:   secondaryDark,
      light:  secondaryLight
    } = theme.palette.secondary;
    const isPremise = schemaType === 'P';
    const getClasses = makeStyles(
      {
        common : {
          minWidth: '6rem',
        },
        saveBtn: {
          marginLeft: '0.5rem',
          backgroundColor: (validSchema && schemaSize > 0) ? isPremise ? primaryMain : secondaryMain: '',
          '&:hover': {
            backgroundColor: (validSchema && schemaSize > 0) ? isPremise ? primaryDark : secondaryDark: '',
          },
          '&:active': {
            backgroundColor: (validSchema && schemaSize > 0) ? isPremise ? primaryLight : secondaryLight: '',
          },
        },
        clearBtn: {
          backgroundColor: schemaSize > 0 ? isPremise ? primaryMain : secondaryMain : '',
          '&:hover': {
            backgroundColor: schemaSize > 0 ? isPremise ? primaryDark : secondaryDark : '',
          },
          '&:active': {
            backgroundColor: schemaSize > 0 ? isPremise ? primaryLight : secondaryLight : '',
          },
        },
      }
    );
    const classes = getClasses();
    return classes;
  }

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
