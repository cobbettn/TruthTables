const validateSchema = (schema) => {
  let isValid = true;
  let L, R;
  let openParen = 0, closeParen = 0;
  const not = '\u00AC'; 
  const getSchemaSymbol = index => index >= 0 && index < schema.length ? schema[index] : null; 

  schema.forEach((symbol, i) => {
    L = getSchemaSymbol(i - 1);
    R = getSchemaSymbol(i + 1);
    switch (symbol.elType) {
      // LETTERS
      case 'L':
        // adjacent letters
        if (L?.elType === 'L' || R?.elType === 'L') isValid = false; 
        break;
      // OPERATORS
      case 'O':
        // unary
        if (symbol.value === not) {
          if (!R || (L?.elType === 'L' || L?.value === ')') || (R?.elType === 'O' && R?.value !== not)) {
            isValid = false;
          }
        }
        // binary
        else {
          if (!R || !L || L?.elType === 'O' || (R?.elType === 'O' && R?.value !== not)) isValid = false; 
        }
        break;
      // GROUPING
      case 'G':
        // open paren
        if (symbol.value === '(') {
          if (L?.elType === 'L' || L?.value === ')') isValid = false; 
          if ((R?.elType === 'O' && R?.value !== not) || R?.value === ')') isValid = false;  
          openParen++;
        }
        // close paren
        if (symbol.value === ')') {
          if (L?.elType === 'O') isValid = false;
          if (R?.elType === 'L' || R?.value === not) isValid = false;
          closeParen++;
        }
        break;
      default:
        break;
    } 
  });

  // unclosed parenthesis
  if (openParen !== closeParen) isValid = false;

   // empty schema
   if (schema.length < 1) isValid = false;

  return isValid;
}

export default validateSchema;