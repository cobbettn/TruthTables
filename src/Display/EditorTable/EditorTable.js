import React from 'react';
import { getSchemaTable } from '../displayTableLogic';

const EditorTable = (props) => {
  const { sentenceLetters, schema, setSchema } = props;
  const editorTableData = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    showButtons: false,
    clickHandlers : {
      onSwitch: () => setSchema({...schema, type: schema.type === 'P' ? 'C' : 'P'})
    }
  }
  const editorTable = getSchemaTable(editorTableData);
  return (
    <div>{ editorTable }</div>
  );
}

export default EditorTable;
