const Session = require("../models/Session");
const asyncHandler = require("express-async-handler");

const ajouterSession = asyncHandler(async (req, res) => {
  const { num, date_d, date_f } = req.body;

  const sessionExist = await Service.findOne({ num });
  if (sessionExist) {
    res.status(403);
    throw new Error("Session Already Exist");
  }
  const session = new Session({ num, date_d, date_f });
  const createdSession = await session.save();

  if (createdSession) {
    res.json({
      num: createdSession.num,
      date_d: createdSession.date_d,
      date_f: createdSession.date_f,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find();
  res.json({ sessions });
});

module.exports = { ajouterSession, getSessions };
