import React from 'react';
import SchemaTable from '../SchemaTable/SchemaTable';

const EditorTable = (props) => {
  return (
    <SchemaTable
      sentenceLetters={ props.sentenceLetters }  
      schema={ props.schema }
      isSavedTable={ false }
      clickHandlers={{
        onSwitch: () => props.setSchema({...props.schema, type: props.schema.type === 'P' ? 'C' : 'P'})
      }} 
    />
  );
}

export default EditorTable;
