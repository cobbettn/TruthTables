import React from 'react';
import TableHeader from '../SchemaTable/TableHeader/TableHeader';
import TableRows from '../SchemaTable/TableRows/TableRows';
import DisplayTable from '../SchemaTable/DisplayTable/DisplayTable';
import { validateSchema } from '../../lib';
import { getTableDimensions, getLegend, getTableModel, computeTable } from '../lib';
import { getStyle } from './SchemaTable.style';

const SchemaTable = (props) => {
  const { schema, sentenceLetters, clickHandlers, isSavedTable } = props;
  let { symbols, steps } = schema;
  const { numRows } = getTableDimensions(sentenceLetters.length);
  const legend = getLegend(sentenceLetters);
  const tableModel = getTableModel(symbols, numRows, legend);
  const style = getStyle(isSavedTable, symbols);

  let schemaTableHeaders = (<TableHeader symbols={symbols}/>);
  let schemaTable = (<TableRows symbols={symbols} model={tableModel}/>);
  
  if (validateSchema(symbols)) {
    const mainOpIndex = computeTable({
      tableModel: tableModel,
      schema: schema, 
      numRows: numRows,
      steps: steps
    });
    schemaTableHeaders = (<TableHeader symbols={symbols} mainOpIndex={mainOpIndex}/>);
    schemaTable = (<TableRows model={tableModel} mainOpIndex={mainOpIndex}/>);
  }

  return (
    <DisplayTable
      style={style}
      headers={schemaTableHeaders}
      table={schemaTable}
      clickHandlers={clickHandlers}
      isSavedTable={isSavedTable}
      collapsed={schema.collapsed}
      schemaType={schema.type}
    />
  );
};

export default SchemaTable;