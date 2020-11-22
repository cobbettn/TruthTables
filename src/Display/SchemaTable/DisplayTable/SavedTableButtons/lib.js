const getTooltipProps = (title) => {
  return {
    title: title,
    className: 'tableButton',
    arrow: true,
    placement: 'bottom'
  };
};

export { getTooltipProps };