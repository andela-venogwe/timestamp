'use strict'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to our time-stamp api' });
});

app.get('/:date', (req, res) => {
  const dateString = req.params.date;
  const dateObject = {};
  let theDate, locale, month;
  if (/^\d+$/.test(dateString)) {
    theDate = new Date(dateString * 1000);
    if (theDate.getTime() > 0) {
      dateObject.unix = dateString;
      locale = "en-us";
      month = theDate.toLocaleString(locale, { month: "long" });
      dateObject.natural = `${month} ${theDate.getDate()} ${theDate.getFullYear()}`;
    } else {
      dateObject.unix = null, dateObject.natural = null
    }
  } else {
    theDate = new Date(dateString).getTime() / 1000;
    if (theDate > 0) {
      dateObject.unix = theDate;
      dateObject.natural = dateString;
    } else {
      dateObject.unix = null, dateObject.natural = null
    }
  }
  res.status(200).json(dateObject);
});

app.listen(port, () => {
  console.log(`timestàmp api started running on port ${port}`);
});

module.exports = app;
