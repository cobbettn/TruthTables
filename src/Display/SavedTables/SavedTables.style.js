const getBoxStyle = (context) => {
  const { premises, conclusion } = context;
  return {
    display: !conclusion && premises.length === 0 && 'none'
  };
}

export { getBoxStyle };