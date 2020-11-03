import React, { useContext } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import validateSchema from '../../validateSchema';
import Context from '../../context';
import styles from './BuilderButton.style';
import { getMaxSteps } from '../../lib';

const BuilderButtons = () => {
  const { schema, setSchema, premises, setPremises, setConclusion } = useContext(Context);
  const { symbols, type } = schema;
  const isValidSchema = validateSchema(symbols);
  const schemaSize = symbols.length;
  const useStyles = styles(makeStyles, isValidSchema, schemaSize);
  const classes = useStyles();
  const clearSchemaBuilder = () => setSchema({
    symbols: [],
    type: 'P'
  });
  const saveValidSchema = () => {
    if (isValidSchema) {
      const steps = getMaxSteps(symbols);
      type === 'P' ? 
        setPremises([...premises, {symbols: symbols, steps: steps}]) :
        setConclusion({symbols: symbols, steps: steps});
      clearSchemaBuilder();
    } 
  }
  return (
    <Box mt="1rem" style={{display: 'flex', flexDirection: 'row-reverse'}}>
      <Button 
        classes={ {root: [classes.saveBtn, classes.common].join(' ')} }
        variant="outlined"
        disabled={ !isValidSchema }
        onClick={ saveValidSchema }
      >
        save
      </Button>
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
