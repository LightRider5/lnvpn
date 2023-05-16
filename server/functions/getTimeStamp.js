// Transforms duration into timestamp
const getTimeStamp = (selectedValue) => {
  // const date = new Date()
  if (selectedValue == process.env.PRICE_QUARTER) {
    date = addMonths((date = new Date()), 3);
    return date;
  }
  if (selectedValue == process.env.PRICE_MONTH) {
    date = addMonths((date = new Date()), 1);
    return date;
  }
  if (selectedValue == process.env.PRICE_WEEK) {
    date = addWeeks((date = new Date()), 1);
    return date;
  }
  if (selectedValue == process.env.PRICE_DAY) {
    date = addHour((date = new Date()), 24);
    return date;
  }

  if (selectedValue == process.env.PRICE_HOUR) {
    date = addHour((date = new Date()), 1);
    return date;
  }

  function addHour(date = new Date(), hour) {
    date.setHours(date.getHours() + hour);
    return date;
  }
  function addWeeks(date = new Date(), weeks) {
    date.setDate(date.getDate() + weeks * 7);
    return date;
  }

  function addMonths(date = new Date(), months) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }
};

module.exports = { getTimeStamp };
