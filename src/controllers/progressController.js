const planService = require('../services/planService');

function createSession(req, res, next) {
  try {
    const session = planService.createSession(req.params.planId, req.body);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
}

function getProgress(req, res, next) {
  try {
    const progress = planService.getPlanProgress(
      req.params.planId,
      req.query.period,
      req.query.date
    );

    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSession,
  getProgress
};
