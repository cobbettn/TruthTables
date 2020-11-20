const getCellDisplayValue = (val) => {
  let cellDisplayValue = '?';
  if (typeof val === 'string') {
    cellDisplayValue = val;
  }
  else if (val === true) {
    cellDisplayValue = 'T';
  }
  else if (val === false) {
    cellDisplayValue = 'F';
  }
  return cellDisplayValue;
}

export { getCellDisplayValue };