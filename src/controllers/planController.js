const planService = require('../services/planService');

function listPlans(req, res, next) {
  try {
    const plans = planService.listPlans();
    res.status(200).json(plans);
  } catch (error) {
    next(error);
  }
}

function createPlan(req, res, next) {
  try {
    const plan = planService.createPlan(req.body);
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
}

function getPlanDetails(req, res, next) {
  try {
    const plan = planService.getPlanDetails(req.params.planId);
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
}

function updatePlan(req, res, next) {
  try {
    const plan = planService.updatePlan(req.params.planId, req.body);
    res.status(200).json(plan);
  } catch (error) {
    next(error);
  }
}

function deletePlan(req, res, next) {
  try {
    planService.deletePlan(req.params.planId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listPlans,
  createPlan,
  getPlanDetails,
  updatePlan,
  deletePlan
};
