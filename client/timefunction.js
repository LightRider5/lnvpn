var getTimeStamp = (selectedValue) => {
  var date = new Date();
  if (selectedValue === process.env.NEXT_PUBLIC_price_quater) {
    date = addMonths((date = new Date()), 3);
    return date;
  }
  if (selectedValue === process.env.NEXT_PUBLIC_price_month) {
    date = addMonths((date = new Date()), 1);

    return date;
  }
  if (selectedValue === process.env.NEXT_PUBLIC_price_week) {
    date = addWeeks((date = new Date()), 1);

    return date;
  }
  if (selectedValue === process.env.NEXT_PUBLIC_price_day) {
    date = addHours((date = new Date()), 24);

    return date;
  }

  if (selectedValue === process.env.NEXT_PUBLIC_price_hour) {
    date = addHours((date = new Date()), 1);

    return date;
  }

  function addHours(date = new Date(), hours) {
    date.setUTCHours(date.getUTCHours() + hours);
    return date;
  }
  function addWeeks(date = new Date(), weeks) {
    date.setUTCDate(date.getUTCDate() + weeks * 7);
    return date;
  }

  function addMonths(date = new Date(), months) {
    var d = date.getUTCDate();
    date.setUTCMonth(date.getUTCMonth() + months);
    if (date.getUTCDate() !== d) {
      date.setUTCDate(0);
    }
    return date;
  }
};

export { getTimeStamp };
