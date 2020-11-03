const getMaxSteps = (schema) => {
  const stepsReducer = (acc, cur) => cur.elType === 'O' || cur.elType === 'N' ? acc + 1 : acc;
  return schema.reduce(stepsReducer, 0);
}

export { getMaxSteps }