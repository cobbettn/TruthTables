// const validateSchema = (schema) => {
//   const not = '\u00AC';

//   const schemaSize = schema.length;
  
//   // check for empty schema
//   if (schemaSize === 0) return false; 

//   // check that schema doesnt start with binary operator
//   if (schemaSize > 0 && schema[0].elType === 'O' && schema[0].value !== not) return false;
//   // check that schema doesnt end with binary operator
//   if (schemaSize > 0 && schema[schemaSize - 1].elType === 'O' && schema[schemaSize - 1].value !== not) return false;
  
//   // checks for correct number of closing and opening parenthesis
//   // checks for adjacent letters
//   // checks for adjacent binary operators and double negations
//   let openParenCount = 0, closeParenCount = 0; 
//   let letterCount = 0, operatorCount = 0, notCount = 0;
  
//   schema.forEach((symbol, i) => {
//     // parenthesis
//     if (symbol.value === '(') openParenCount++;
//     if (symbol.value === ')') closeParenCount++;
    
//     // letters
//     if (symbol.elType === 'L') {
//       operatorCount = notCount = 0;
//       letterCount++;
//     }
//     else {
//       letterCount = 0;
//     }

//     // operators
//     if (symbol.elType === 'O') {
//       if (symbol.value === not) {
//         notCount++;
//         operatorCount = letterCount = 0;
//         if (schema[i - 1] && schema[i - 1].elType === 'L') return false; // not can't directly follow a letter
//       } 
//       else {
//         operatorCount++;
//         notCount = letterCount = 0;
//       } 
//     }

//     if (letterCount > 1 || operatorCount > 1 || notCount > 1) return false;
//   });

//   if (openParenCount !== closeParenCount) return false; 

//   return true;
// }

// // export default validateSchema;


///// 


const validate = (schema) => {
  let isValid = true;
  
  let L, R;
  let openParen = 0, closeParen = 0;

  const not = '\u00AC';

  const getSchemaSymbol = index => index >= 0 && index < schema.length ? schema[index] : null; 

  // empty schema
  if (schema.length < 1) isValid = false;

  schema.forEach((symbol, i) => {
    L = getSchemaSymbol(i - 1);
    R = getSchemaSymbol(i + 1);

    switch (symbol.elType) {
      // LETTERS
      case 'L':
        if (L?.elType === 'L' || R?.elType === 'L') isValid = false;
        break;
      // OPERATORS
      case 'O':
        if (!R) {
          isValid = false;
        }
        else {
          if (symbol.value !== not && !L) isValid = false; 
        }
        break;
      // GROUPING
      case 'G':
        if (symbol.value === '(') {
          if (L?.elType === 'L') isValid = false;
          if (R?.value === ')') isValid = false;
          openParen++;
        }
        if (symbol.value === ')') {
          if (R?.elType === 'L') isValid = false;
          closeParen++;
        }
        break;
      default:
        break;
    } 
  });

  if (openParen !== closeParen) isValid = false;

  return isValid;
}

export default validate;