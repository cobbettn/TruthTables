import React from 'react';
import { getSchemaTable } from '../displayTableLogic';

const EditorTable = (props) => {
  const { sentenceLetters, schema } = props;
  const { symbols } = schema;
  const editorTableData = {
    sentenceLetters: sentenceLetters,
    schema: symbols,
    showButtons: false
  }
  const editorTable = getSchemaTable(editorTableData);
  return (
    <div style={{display: 'flex'}}>
      { editorTable }
    </div>
  );
}

export default EditorTable;
