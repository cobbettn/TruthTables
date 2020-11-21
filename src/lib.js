import { makeStyles } from "@material-ui/core";

/**
 * Checks if a schema is well-formed
 * 
 * @param {*} schema 
 */
const validateSchema = (schema) => {
  let isValid = true;

  if (schema.length === 0) {
    return false; // empty schema
  } 
  else {
    let L, R;
    let openParen = 0, closeParen = 0;
    // compare each symbol in the schema with its adjacent symbols
    schema.forEach((symbol, i) => {
      L = schema[i - 1];
      R = schema[i + 1];
      switch (symbol.elType) {
        case 'L': // LETTERS
          if (L?.elType === 'L') {
            isValid = false;
          }
          break;
        case 'N': // NEGATION
          if (!R || L?.elType === 'L' || R?.elType === 'O') {
            isValid = false;
          }
          break;
        case 'O': // BINARY OPERATORS
          if (!R || !L || R?.elType === 'O' || L?.elType === 'O') {
            isValid = false;
          }  
          break;
        case 'G': // GROUPING
          if (symbol.value === '(') { // open logic
            if (L?.elType === 'L' || L?.value === ')' || R?.value === ')') {
              isValid = false; 
            }
            openParen++;
          }
          if (symbol.value === ')') { // close logic
            if (L?.elType === 'O' || L?.elType === 'N' || R?.elType === 'L' || R?.elType === 'N' ) {
              isValid = false;
            } 
            closeParen++;
          }
          break;
        default:
      } 
    });
    // unclosed parentheses
    if (openParen !== closeParen) isValid = false;
  }

  return isValid;
}

const getMaxSteps = (schema) => {
  const stepsReducer = (acc, cur) => cur.elType === 'O' || cur.elType === 'N' ? acc + 1 : acc;
  return schema?.reduce(stepsReducer, 0);
}

const getTutorialStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.white
  },
  tooltip : {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: '12px',
    boxShadow: `2px 2px 2px ${theme.palette.common.black}`
  }
}));

export { getMaxSteps, getTutorialStyles, validateSchema };