import { green, red, grey } from '@material-ui/core/colors';

const getCellStyle = (val, index, mainOpIndex) => {
  const isMainOpColumn = mainOpIndex === index;
  const style = {
    backgroundColor: 
      val === true  ? 
        isMainOpColumn ? green[700] : green[500] :
      val === false ? 
        isMainOpColumn ? red[700]   : red[500]   : 
      grey[500]
  };
  if (mainOpIndex === index) {
    style.fontWeight = 'bold'
  }
  return style;
}

export { getCellStyle };