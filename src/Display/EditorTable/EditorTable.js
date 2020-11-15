import React from 'react';
import { getSchemaTable } from '../displayTableLogic';

const EditorTable = (props) => {
  const { sentenceLetters, schema } = props;
  const editorTableData = {
    sentenceLetters: sentenceLetters,
    schema: schema,
    showButtons: false
  }
  const editorTable = getSchemaTable(editorTableData);
  return (
    <div>{ editorTable }</div>
  );
}

export default EditorTable;
