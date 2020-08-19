import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import Context from '../../context'
import { getStyles, getOnClick } from './dndElementConfig';
import './DnDElement.scss';

const DnDElement = (props) => {
  const { sentenceLetters, schema, setSchema } = useContext(Context);
  const configObj = {
    letterCount: sentenceLetters.length,
    schema: schema,
    setSchema: setSchema,
    elConfig: props.config,
  }
  const style = getStyles(props.config.bgColor);
  const onClick = getOnClick(configObj);
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
