import React, { useContext } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import validateSchema from '../validateSchema';
import Context from '../../context';
import styles from './BuilderButton.style';

const BuilderButtons = () => {
  const { schema, setSchema, schemataList, setSchemataList } = useContext(Context);
  const isValidSchema = validateSchema(schema);
  const schemaSize = schema.length;
  const useStyles = styles(makeStyles, isValidSchema, schemaSize);
  const classes = useStyles();
  const clearSchemaBuilder = () => setSchema([]);
  const saveValidSchema = () => {
    if (isValidSchema) {
      setSchemataList([...schemataList, schema]); // save
      clearSchemaBuilder(); // clear schema builder
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
