import React from 'react';
import SchemaTable from '../../SchemaTable/SchemaTable';
import { getTableButtonHandlers } from '../../lib';

const getPremiseTables = (data) => {
 const { sentenceLetters, premises, setPremises, setSchema } = data;
 const getButtonHandlerData = (premise, i) => ({
    data: premise,
    setData: (data) => {
      data ? premises[i] = {...data} : premises.splice(i, i + 1); // delete premise when data is null, update otherwise
      setPremises([...premises]);
    },
    setSchema: setSchema,
  });
  return premises.map((premise, i) => 
    <SchemaTable
      sentenceLetters={ sentenceLetters }
      schema= { premise }
      isSavedTable={ true }
      clickHandlers={ getTableButtonHandlers(getButtonHandlerData(premise, i)) }
    />
  );
}

export { getPremiseTables };
