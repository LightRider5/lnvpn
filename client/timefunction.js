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
    date = addHour((date = new Date()), 24);

    return date;
  }

  if (selectedValue === process.env.NEXT_PUBLIC_rice_hour) {
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
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    return date;
  }
};
export { getTimeStamp };
