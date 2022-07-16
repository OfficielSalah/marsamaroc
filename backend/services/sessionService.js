const Session = require("../models/Session");
const ErrorResponse = require("../utils/errorResponse");

const daysInMonth = (month) => {
  if (
    month === 0 ||
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 7 ||
    month === 9 ||
    month === 11
  ) {
    return 31;
  } else {
    return 30;
  }
};

const convert = (date) => {
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  return (result = mm + "/" + dd);
};

const configSession = async (debut, end, interval) => {
  if (!debut || !end || !interval) {
    throw new ErrorResponse("login or email or password not valid", 400);
  }
  let sessions = [];
  let num = 1;
  let start = debut;
  while (start < end) {
    let j = new Date(start);
    j.setDate(j.getDate() + interval);

    let date_d = convert(start);
    let date_f = convert(j);

    sessions.push({
      num: num,
      date_d: date_d,
      date_f: date_f,
    });

    await Session.create({
      num,
      date_d,
      date_f,
    });
    let k = new Date(j);

    if (k.getDate() === 30) {
      if (daysInMonth(k.getMonth()) === 30) {
        k.setDate(k.getDate() + 1);
      } else k.setDate(k.getDate() + 2);
    } else {
      k.setDate(k.getDate() + 1);
    }

    start = new Date(k);
    num++;
  }

  return sessions;
};

const getSessions = async () => {
  const sessions = await Session.find();
  return sessions;
};
module.exports = {
  configSession,
  getSessions,
};
