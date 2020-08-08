import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import grey from '@material-ui/core/colors/grey';
import Context from '../../context';
import './DnDElement.scss';

const DnDElement = (props) => {
  const { schema, setSchema } = useContext(Context);
  const bgColor = props.config.bgColor;
  const style = {
    backgroundColor: bgColor ? bgColor : grey['700']
  };
  const addToSchema = (config) => {
    setSchema([...schema, config]);
  }
  return (
    <Card 
      className="DnDElement" 
      style={style}
      elevation={10}
      onClick={ !props.config.builderEl ? () => addToSchema(props.config) : null }
    >
      {props.config.display}
    </Card>
  );
}

export default DnDElement;
