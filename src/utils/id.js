const counters = {
  plan: 0,
  subject: 0,
  session: 0
};

function generateId(type) {
  counters[type] += 1;
  return `${type}_${counters[type]}`;
}

module.exports = { generateId };
