import React, { useContext } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import validateSchema from '../validateSchema';
import Context from '../../context';
import theme from '../../theme';

const BuilderButtons = () => {
  const { schema } = useContext(Context);
  const validSchema = validateSchema(schema);
  const schemaSize = schema.length;
  const useStyles = makeStyles({
    common : {
      minWidth: '6rem',
    },
    saveBtn: {
      backgroundColor: validSchema ? theme.palette.primary.main : null,
      '&:hover': {
        backgroundColor: validSchema ? theme.palette.primary.dark : null,
      },
      '&:active': {
        backgroundColor: validSchema ? theme.palette.primary.light : null,
      },
      marginLeft: '0.5rem',
    },
    clearBtn: {
      backgroundColor: schemaSize > 0 ? theme.palette.primary.main : null,
      '&:hover': {
        backgroundColor: schemaSize > 0 ? theme.palette.primary.dark : null,
      },
      '&:active': {
        backgroundColor: schemaSize > 0 ? theme.palette.primary.light : null,
      },
    }
  });
  const classes = useStyles();
  console.dir(classes);
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
