const parseSchema = (schema) => {
  let depth = 0, maxDepth = 0, maxDepthIndeces = [], operator = [], letter = [], negation = [];
  schema.forEach((el, i) => {
    switch(el.elType) {
      case 'G':
        if (el.value === '(') {
          depth++;
          if (depth === maxDepth) {
            maxDepthIndeces.push(i);
          }
          else if (depth > maxDepth) {
            maxDepth = depth;
            maxDepthIndeces = [i];
          }
        }
        else {
          depth--;
        }
        break;
      case 'L':
        letter.push({val: el.value, index: i});
        break;
      case 'O':
        operator.push({val: el.value, index: i})
        break;
      case 'N':
        negation.push(i);
        break;
      default:
        break;
    }
  });

  console.log(maxDepthIndeces);
  console.log('L', letter)
  console.log('O' ,operator)
  console.log('N', negation)
  
};
export default parseSchema;