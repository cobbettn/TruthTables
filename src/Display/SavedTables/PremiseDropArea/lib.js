const getButtonHandlerData = (context, i) => {
  const { premises, setPremises, setSchema  } = context;
  return {
    data: premises[i],
    setData: (data) => {
      data ? premises[i] = {...data} : premises.splice(i, i + 1); // delete premise when data is null, update otherwise
      setPremises([...premises]);
    },
    setSchema: setSchema,
  };
}

export { getButtonHandlerData };
