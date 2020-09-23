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

export default validateSchema;
