const SessionService = require("../services/sessionService");
const asyncHandler = require("../middlewares/asyncMiddleware");

const configSession = asyncHandler(async (req, res, next) => {
  const { debut, end, interval } = req.body;
  const parseDMY = (s) => {
    let [d, m, y] = s.split(/\D/);
    return new Date(y, m - 1, d);
  };
  try {
    const sessions = await SessionService.configSession(
      parseDMY(debut),
      parseDMY(end),
      interval
    );
    res.status(200).json({
      sessions: sessions,
      action: `Sessions Created from ${debut} to ${end} with an intervalle of ${interval} days `,
    });
  } catch (error) {
    next(error);
  }
});
const getSessions = asyncHandler(async (req, res, next) => {
  try {
    const sessions = await SessionService.getSessions();
    res.status(200).json({
      sessions: sessions,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { configSession, getSessions };
