import React from 'react';
import TableHeader from '../SchemaTable/TableHeader/TableHeader';
import TableRows from '../SchemaTable/TableRows/TableRows';
import DisplayTable from '../SchemaTable/DisplayTable/DisplayTable';
import { validateSchema } from '../../lib';
import { getTableDimensions, getTableModel, computeTable } from '../../lib';
import { getStyle } from './SchemaTable.style';

const SchemaTable = (props) => {
  const { schema, sentenceLetters, isSavedTable } = props;
  let { symbols } = schema;
  let tableModel = getTableModel({...props});
  const { numRows } = getTableDimensions(sentenceLetters.length)
  const style = getStyle(isSavedTable);
  
  let schemaTableHeaders = (<TableHeader symbols={symbols}/>);
  let schemaTable = (<TableRows symbols={symbols} model={tableModel}/>);
  
  if (validateSchema(symbols, sentenceLetters)) {
    const { mainOpIndex, mainOpColumn } = computeTable(schema, tableModel, numRows);
    schema.mainOpColumn = mainOpColumn;
    schemaTableHeaders = (<TableHeader symbols={symbols} mainOpIndex={mainOpIndex}/>);
    schemaTable = (<TableRows model={tableModel} mainOpIndex={mainOpIndex}/>);
  }
  
  return (
    <DisplayTable
      { ...props }
      style={ style }
      headers={ schemaTableHeaders }
      table={ schemaTable }
    />
  );
};

export default SchemaTable;