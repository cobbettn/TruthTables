const validateSchema = (schema) => {
  // WFF?
  let valid = false;

  if (schema.length === 1) {
    if (schema[0].elType === 'L') {
      valid = true; // a schema with one sentence letter is well formed
    }
  }
  
  return valid;
}

export default validateSchema;