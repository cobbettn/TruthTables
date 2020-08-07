import React from 'react';
import Card from '@material-ui/core/Card';
import grey from '@material-ui/core/colors/grey';
import './DnDElement.scss';

const DnDElement = (props) => {
  const bgColor = props.config.bgColor;
  const style = {
    backgroundColor: bgColor ? bgColor : grey['700']
  };
  return (
    <Card 
      className="DnDElement" 
      style={style}
      elevation={10}
    >
      {props.config.display}
    </Card>
  );
}

export default DnDElement;
