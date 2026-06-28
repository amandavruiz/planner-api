const store = require('../data/store');
const { generateId } = require('../utils/id');
const createHttpError = require('../utils/httpError');

function isValidDateString(dateString) {
  const date = new Date(dateString);
  return !Number.isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function toPlanSummary(plan) {
  return {
    id: plan.id,
    name: plan.name,
    totalHoursStudied: Number(plan.totalHoursStudied.toFixed(2)),
    subjectsCount: plan.subjects.length,
    subjects: plan.subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      topics: subject.topics,
      topicsCount: subject.topics.length,
      questionsSolved: subject.questionsSolved
    }))
  };
}

function getPlanOrFail(planId) {
  const plan = store.plans.find((item) => item.id === planId);
  if (!plan) {
    throw createHttpError(404, 'Plan not found');
  }
  return plan;
}

function getSubjectOrFail(plan, subjectId) {
  const subject = plan.subjects.find((item) => item.id === subjectId);
  if (!subject) {
    throw createHttpError(404, 'Subject not found for this plan');
  }
  return subject;
}

function listPlans() {
  return store.plans.map(toPlanSummary);
}

function createPlan(payload) {
  const name = payload?.name?.trim();
  if (!name) {
    throw createHttpError(400, 'name is required');
  }

  const plan = {
    id: generateId('plan'),
    name,
    totalHoursStudied: 0,
    subjects: [],
    sessions: []
  };

  store.plans.push(plan);
  return toPlanSummary(plan);
}

function getPlanDetails(planId) {
  const plan = getPlanOrFail(planId);
  return {
    ...toPlanSummary(plan),
    sessionsCount: plan.sessions.length
  };
}

function updatePlan(planId, payload) {
  const plan = getPlanOrFail(planId);

  if (payload.name !== undefined) {
    const name = String(payload.name).trim();
    if (!name) {
      throw createHttpError(400, 'name cannot be empty');
    }
    plan.name = name;
  }

  return toPlanSummary(plan);
}

function deletePlan(planId) {
  const index = store.plans.findIndex((item) => item.id === planId);
  if (index < 0) {
    throw createHttpError(404, 'Plan not found');
  }

  store.plans.splice(index, 1);
}

function listSubjects(planId) {
  const plan = getPlanOrFail(planId);

  return plan.subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    topics: subject.topics,
    topicsCount: subject.topics.length,
    questionsSolved: subject.questionsSolved
  }));
}

function createSubject(planId, payload) {
  const plan = getPlanOrFail(planId);
  const name = payload?.name?.trim();

  if (!name) {
    throw createHttpError(400, 'name is required');
  }

  const topics = Array.isArray(payload.topics)
    ? payload.topics.map((topic) => String(topic).trim()).filter(Boolean)
    : [];

  const questionsSolved = payload.questionsSolved ?? 0;
  if (!Number.isInteger(questionsSolved) || questionsSolved < 0) {
    throw createHttpError(400, 'questionsSolved must be an integer >= 0');
  }

  const subject = {
    id: generateId('subject'),
    name,
    topics,
    questionsSolved
  };

  plan.subjects.push(subject);

  return {
    ...subject,
    topicsCount: subject.topics.length
  };
}

function getSubjectDetails(planId, subjectId) {
  const plan = getPlanOrFail(planId);
  const subject = getSubjectOrFail(plan, subjectId);

  return {
    id: subject.id,
    name: subject.name,
    topics: subject.topics,
    topicsCount: subject.topics.length,
    questionsSolved: subject.questionsSolved
  };
}

function updateSubject(planId, subjectId, payload) {
  const plan = getPlanOrFail(planId);
  const subject = getSubjectOrFail(plan, subjectId);

  if (payload.name !== undefined) {
    const name = String(payload.name).trim();
    if (!name) {
      throw createHttpError(400, 'name cannot be empty');
    }
    subject.name = name;
  }

  if (payload.topics !== undefined) {
    if (!Array.isArray(payload.topics)) {
      throw createHttpError(400, 'topics must be an array of strings');
    }

    subject.topics = payload.topics
      .map((topic) => String(topic).trim())
      .filter(Boolean);
  }

  if (payload.questionsSolved !== undefined) {
    if (!Number.isInteger(payload.questionsSolved) || payload.questionsSolved < 0) {
      throw createHttpError(400, 'questionsSolved must be an integer >= 0');
    }

    subject.questionsSolved = payload.questionsSolved;
  }

  return {
    id: subject.id,
    name: subject.name,
    topics: subject.topics,
    topicsCount: subject.topics.length,
    questionsSolved: subject.questionsSolved
  };
}

function deleteSubject(planId, subjectId) {
  const plan = getPlanOrFail(planId);
  const index = plan.subjects.findIndex((item) => item.id === subjectId);

  if (index < 0) {
    throw createHttpError(404, 'Subject not found for this plan');
  }

  plan.subjects.splice(index, 1);
  plan.sessions = plan.sessions.filter((session) => session.subjectId !== subjectId);
  plan.totalHoursStudied = Number(
    plan.sessions.reduce((total, session) => total + session.durationHours, 0).toFixed(2)
  );
}

function createSession(planId, payload) {
  const plan = getPlanOrFail(planId);

  if (!payload || !isValidDateString(payload.date)) {
    throw createHttpError(400, 'date is required in YYYY-MM-DD format');
  }

  const durationHours = Number(payload.durationHours);
  if (!Number.isFinite(durationHours) || durationHours <= 0) {
    throw createHttpError(400, 'durationHours must be a positive number');
  }

  let subjectId = null;
  if (payload.subjectId !== undefined && payload.subjectId !== null && payload.subjectId !== '') {
    subjectId = String(payload.subjectId);
    getSubjectOrFail(plan, subjectId);
  }

  const notes = payload.notes ? String(payload.notes).trim() : '';

  const session = {
    id: generateId('session'),
    date: payload.date,
    durationHours: Number(durationHours.toFixed(2)),
    subjectId,
    notes
  };

  plan.sessions.push(session);
  plan.totalHoursStudied = Number(
    plan.sessions.reduce((total, item) => total + item.durationHours, 0).toFixed(2)
  );

  return session;
}

function isDateInRange(dateString, startDate, endDate) {
  const value = parseDate(dateString);
  return value >= startDate && value <= endDate;
}

function getWeekRange(referenceDate) {
  const day = referenceDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(referenceDate);
  start.setDate(referenceDate.getDate() + diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start, end };
}

function getMonthRange(referenceDate) {
  const start = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  const end = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);
  return { start, end };
}

function getDailyRange(referenceDate) {
  return { start: referenceDate, end: referenceDate };
}

function getPlanProgress(planId, period = 'daily', referenceDateString) {
  const plan = getPlanOrFail(planId);
  const normalizedPeriod = String(period || 'daily').toLowerCase();

  if (!['daily', 'weekly', 'monthly'].includes(normalizedPeriod)) {
    throw createHttpError(400, 'period must be daily, weekly or monthly');
  }

  const dateString = referenceDateString || new Date().toISOString().slice(0, 10);
  if (!isValidDateString(dateString)) {
    throw createHttpError(400, 'date must use YYYY-MM-DD format');
  }

  const referenceDate = parseDate(dateString);

  let range;
  if (normalizedPeriod === 'daily') {
    range = getDailyRange(referenceDate);
  } else if (normalizedPeriod === 'weekly') {
    range = getWeekRange(referenceDate);
  } else {
    range = getMonthRange(referenceDate);
  }

  const sessions = plan.sessions.filter((session) =>
    isDateInRange(session.date, range.start, range.end)
  );

  const totalHoursStudied = Number(
    sessions.reduce((total, session) => total + session.durationHours, 0).toFixed(2)
  );

  return {
    period: normalizedPeriod,
    referenceDate: dateString,
    interval: {
      start: range.start.toISOString().slice(0, 10),
      end: range.end.toISOString().slice(0, 10)
    },
    totalHoursStudied,
    sessionsCount: sessions.length,
    sessions
  };
}

module.exports = {
  listPlans,
  createPlan,
  getPlanDetails,
  updatePlan,
  deletePlan,
  listSubjects,
  createSubject,
  getSubjectDetails,
  updateSubject,
  deleteSubject,
  createSession,
  getPlanProgress
};
