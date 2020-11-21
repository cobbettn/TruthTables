const getPaperStyles = (count) => { 
  const style = {
    display: 'flex',
    width: count === 0 && '0px'
  }
  if (count > 0) style.marginLeft = '1rem';
  return style;
}

export { getPaperStyles };