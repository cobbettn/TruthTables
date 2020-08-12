import React, { useContext } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import validateSchema from '../validateSchema';
import Context from '../../context';
import styles from './BuilderButton.style';

const BuilderButtons = () => {
  const { schema } = useContext(Context);
  const validSchema = validateSchema(schema);
  const schemaSize = schema.length;
  const useStyles = styles(makeStyles, validSchema, schemaSize);
  const classes = useStyles();
  return (
    <Box mt="1rem" style={{display: 'flex', flexDirection: 'row-reverse'}}>
      <Button 
        classes={{root: [classes.saveBtn, classes.common].join(' ')}}
        variant="outlined"
      >
        Save
      </Button>
      <Button
        classes={{root: [classes.clearBtn, classes.common].join(' ')}}
        variant="outlined">
        Clear
      </Button>
    </Box>
  );
}

export default BuilderButtons;
