import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import grey from '@material-ui/core/colors/grey';
import Context from '../../context';
import './DnDElement.scss';

const DnDElement = (props) => {
  const { sentenceCount, schema, setSchema } = useContext(Context);
  const { bgColor } = props.config;
  const style = {
    backgroundColor: bgColor ? bgColor['500'] : grey['700'],
  };
  const addOnClick = (config) => {
    if (sentenceCount > 0) setSchema([...schema, {...config}]);
  }
  const onClick = () => {
    return !props.config.schemaBuilderEl ? addOnClick(props.config) : null;
  }

  return (
    <Card 
      className="DnDElement" 
      style={style}
      elevation={10}
      onClick={ onClick }
    >
      {props.config.value}
    </Card>
  );
}

export default DnDElement;
