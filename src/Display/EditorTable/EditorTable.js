import React from 'react';
import SchemaTable from '../SavedTables/SchemaTable/SchemaTable';

const EditorTable = (props) => {
  const { sentenceLetters, schema, setSchema } = props;
  return (
    <SchemaTable
      schema={ schema }
      sentenceLetters={ sentenceLetters}
      isSavedTable={ false }
      clickHandlers={
        {
          onSwitch: () => setSchema({...schema, type: schema.type === 'P' ? 'C' : 'P'})
        }
      } 
    />
  );
}

export default EditorTable;
