const planService = require('../services/planService');

function listSubjects(req, res, next) {
  try {
    const subjects = planService.listSubjects(req.params.planId);
    res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
}

function createSubject(req, res, next) {
  try {
    const subject = planService.createSubject(req.params.planId, req.body);
    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
}

function getSubjectDetails(req, res, next) {
  try {
    const subject = planService.getSubjectDetails(req.params.planId, req.params.subjectId);
    res.status(200).json(subject);
  } catch (error) {
    next(error);
  }
}

function updateSubject(req, res, next) {
  try {
    const subject = planService.updateSubject(req.params.planId, req.params.subjectId, req.body);
    res.status(200).json(subject);
  } catch (error) {
    next(error);
  }
}

function deleteSubject(req, res, next) {
  try {
    planService.deleteSubject(req.params.planId, req.params.subjectId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listSubjects,
  createSubject,
  getSubjectDetails,
  updateSubject,
  deleteSubject
};
