import Colors from '../../colors';
export const getLetters =  (count) => {
  return [...Array(count)].map((el, i) => {
    return {
      value: String.fromCharCode(112 + i), 
      bgColor: Colors[i]['500'],
      elType: 'L',
    }
  });
}

export const getStyles = (count) => { 
  return {
    display: count === 0 ? 'none' : null,
    marginLeft: count > 0 ? '1rem' : null,
  }
}
