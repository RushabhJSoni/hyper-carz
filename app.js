const select = (selector, parent = document) => parent.querySelector(selector);
const selectAll = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const navToggle = select('.hero__nav-toggle');
const navList = select('.hero__nav-list');
const mobileQuery = window.matchMedia('(max-width: 960px)');
const startButton = select('[data-action="start-simulator"]');
const cancelButtons = selectAll('[data-action="cancel-simulator"]');
const restartButton = select('[data-action="restart-simulator"]');
const pilotForm = select('#pilot-form');
const pilotInput = select('#pilot-name');
const pilotError = select('#pilot-error');
const scenarioPanel = select('#scenario-panel');
const scenarioForm = select('#scenario-form');
const scenarioSelect = select('#scenario-select');
const scenarioRound = select('#scenario-round');
const scenarioTitle = select('#scenario-title');
const scenarioTarget = select('#scenario-target');
const scenarioRunway = select('#scenario-runway');
const scenarioConditions = select('#scenario-conditions');
const scenarioFeedback = select('#scenario-feedback');
const scenarioLog = select('#scenario-log');
const simulatorSummary = select('#simulator-summary');
const simulatorSummaryText = select('.simulator__summary-text');
const footerYear = select('#footer-year');

const cars = [
  {
    id: 'jesko',
    name: 'Jesko Absolut',
    topSpeed: 330,
    effectiveRange: '330 mph projected',
    zeroToSixty: '2.6 s',
    power: '1,600 hp',
  },
  {
    id: 'regera',
    name: 'Regera',
    topSpeed: 255,
    effectiveRange: '255 mph verified',
    zeroToSixty: '2.8 s',
    power: '1,500 hp',
  },
  {
    id: 'gemera',
    name: 'Gemera',
    topSpeed: 248,
    effectiveRange: '248 mph projected',
    zeroToSixty: '1.9 s (hybrid launch)',
    power: '1,700 hp',
  },
];

const scenarios = [
  {
    id: 'jbpg',
    title: 'Johnny Bohmer Proving Grounds validation',
    targetSpeed: 310,
    runway: 'Space Florida Launch & Landing Facility — 3-mile straight',
    conditions: 'Ambient 74°F, crosswind 6 mph from east, humidity 68%',
    dragPenalty: 12,
  },
  {
    id: 'nardo',
    title: 'Nardò high-speed consistency run',
    targetSpeed: 280,
    runway: 'Nardò Technical Center high-speed ring — 12.5 km loop',
    conditions: 'Track temp 88°F, surface recently resurfaced, headwind 4 mph',
    dragPenalty: 8,
  },
  {
    id: 'reykjavik',
    title: 'Arctic runway shakedown',
    targetSpeed: 250,
    runway: 'Keflavík air base auxiliary runway — 2.2-mile straight',
    conditions: 'Ambient 37°F, light crosswind 2 mph, dense air pressure 102.6 kPa',
    dragPenalty: -6,
  },
];

const state = {
  active: false,
  pilot: '',
  round: 0,
  score: 0,
  results: [],
};

const formatSpeed = (value) => `${value} mph`;

const getCar = (id) => cars.find((car) => car.id === id);

const resetSimulator = () => {
  state.active = false;
  state.pilot = '';
  state.round = 0;
  state.score = 0;
  state.results = [];
  scenarioPanel.hidden = true;
  pilotForm.hidden = true;
  startButton.hidden = false;
  pilotInput.value = '';
  pilotError.textContent = '';
  scenarioFeedback.textContent = '';
  if (scenarioSelect) {
    scenarioSelect.value = '';
  }
  scenarioLog.innerHTML = '';
  simulatorSummary.hidden = true;
  simulatorSummaryText.textContent = '';
};

const populateOptions = () => {
  if (!scenarioSelect) return;
  const fragment = document.createDocumentFragment();
  cars.forEach((car) => {
    const option = document.createElement('option');
    option.value = car.id;
    option.textContent = `${car.name} — ${car.effectiveRange}`;
    fragment.append(option);
  });
  scenarioSelect.append(fragment);
};

const openNav = (open) => {
  navToggle?.setAttribute('aria-expanded', String(open));
  if (!navList) return;
  if (mobileQuery.matches) {
    navList.setAttribute('aria-hidden', String(!open));
  } else {
    navList.removeAttribute('aria-hidden');
  }
};

const toggleNav = () => {
  const expanded = navToggle?.getAttribute('aria-expanded') === 'true';
  openNav(!expanded);
};

const handleNavBreakpoint = () => {
  if (!navList) return;
  if (mobileQuery.matches) {
    openNav(false);
  } else {
    navToggle?.setAttribute('aria-expanded', 'false');
    navList.removeAttribute('aria-hidden');
  }
};

const startSimulator = () => {
  state.active = true;
  startButton.hidden = true;
  pilotForm.hidden = false;
  pilotInput.focus();
};

const cancelSimulator = () => {
  resetSimulator();
};

const renderScenario = () => {
  const scenario = scenarios[state.round];
  if (!scenario) {
    return;
  }

  scenarioPanel.hidden = false;
  scenarioRound.textContent = `Scenario ${state.round + 1} of ${scenarios.length}`;
  scenarioTitle.textContent = scenario.title;
  scenarioTarget.textContent = formatSpeed(scenario.targetSpeed);
  scenarioRunway.textContent = scenario.runway;
  scenarioConditions.textContent = scenario.conditions;
  scenarioFeedback.textContent = '';
  if (scenarioSelect) {
    scenarioSelect.value = '';
    scenarioSelect.focus();
  }
};

const buildLogEntry = (scenario, car, outcome) => {
  const li = document.createElement('li');
  const headline = document.createElement('strong');
  headline.textContent = outcome.success
    ? `Success — ${car.name} set ${formatSpeed(outcome.effectiveSpeed)}`
    : `Shortfall — ${car.name} peaked at ${formatSpeed(outcome.effectiveSpeed)}`;
  const summary = document.createElement('p');
  summary.textContent = outcome.success
    ? `${state.pilot} validated the ${scenario.title.toLowerCase()}.`
    : `${state.pilot} fell short of the record during the ${scenario.title.toLowerCase()}.`;

  const details = document.createElement('p');
  const penaltyText =
    scenario.dragPenalty === 0
      ? 'neutral air density'
      : scenario.dragPenalty > 0
      ? `-${scenario.dragPenalty} mph drag penalty`
      : `+${Math.abs(scenario.dragPenalty)} mph density gain`;

  details.innerHTML = `Target: <strong>${formatSpeed(scenario.targetSpeed)}</strong> &bull; Conditions impact: ${penaltyText} &bull; Power unit: ${car.power}, 0-60: ${car.zeroToSixty}`;

  li.append(headline, summary, details);
  return li;
};

const resolveScenario = (scenario, car) => {
  const variability = Math.round((Math.random() - 0.5) * 6);
  const effectiveSpeed = Math.max(0, Math.round(car.topSpeed - scenario.dragPenalty + variability));
  const success = effectiveSpeed >= scenario.targetSpeed;

  state.results.push({
    scenarioId: scenario.id,
    carId: car.id,
    success,
    effectiveSpeed,
  });

  if (success) {
    state.score += 1;
  }

  scenarioFeedback.textContent = success
    ? `${car.name} verified the run at ${formatSpeed(effectiveSpeed)}. Mission logged.`
    : `${car.name} topped out at ${formatSpeed(effectiveSpeed)} — record still pending.`;

  const entry = buildLogEntry(scenario, car, { success, effectiveSpeed });
  scenarioLog.prepend(entry);
};

const completeSimulation = () => {
  scenarioPanel.hidden = true;
  const successRate = Math.round((state.score / scenarios.length) * 100);
  let summary = `${state.pilot}, you cleared ${state.score} of ${scenarios.length} record attempts (${successRate}% success). `;

  if (state.score === scenarios.length) {
    summary += 'Full sweep. Koenigsegg HQ approves your next development prototype.';
  } else if (state.score === 0) {
    summary += 'Recommend additional simulator time before the next proving session.';
  } else {
    summary += 'Solid instincts—fine-tune your aero trims for the remaining runs.';
  }

  simulatorSummaryText.textContent = summary;
  simulatorSummary.hidden = false;
};

const handleScenarioSubmit = (event) => {
  event.preventDefault();
  const carId = scenarioSelect.value;
  const scenario = scenarios[state.round];
  if (!carId || !scenario) {
    scenarioFeedback.textContent = 'Select a Koenigsegg to deploy.';
    scenarioSelect?.focus();
    return;
  }

  const car = getCar(carId);
  if (!car) {
    scenarioFeedback.textContent = 'Unable to load car data. Refresh and try again.';
    return;
  }

  resolveScenario(scenario, car);

  state.round += 1;
  if (state.round < scenarios.length) {
    renderScenario();
  } else {
    completeSimulation();
  }
};

const handlePilotSubmit = (event) => {
  event.preventDefault();
  const value = pilotInput.value.trim();
  if (value.length < 2) {
    pilotError.textContent = 'Enter a call sign with at least two characters.';
    pilotInput.focus();
    return;
  }
  pilotError.textContent = '';
  state.pilot = value;
  pilotForm.hidden = true;
  renderScenario();
};

const initFooterYear = () => {
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
};

const init = () => {
  populateOptions();
  initFooterYear();
  handleNavBreakpoint();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', handleNavBreakpoint);
  } else {
    mobileQuery.addListener(handleNavBreakpoint);
  }

  navToggle?.addEventListener('click', toggleNav);
  startButton?.addEventListener('click', startSimulator);
  pilotForm?.addEventListener('submit', handlePilotSubmit);
  scenarioForm?.addEventListener('submit', handleScenarioSubmit);
  cancelButtons.forEach((button) => button.addEventListener('click', cancelSimulator));
  restartButton?.addEventListener('click', () => {
    resetSimulator();
    startSimulator();
  });

  document.addEventListener('click', (event) => {
    if (!navToggle || !mobileQuery.matches) return;
    if (event.target === navToggle || navToggle.contains(event.target)) {
      return;
    }
    if (navList && navList.contains(event.target)) {
      openNav(false);
      return;
    }
    if (navList && navList.getAttribute('aria-hidden') === 'false') {
      openNav(false);
    }
  });
};

document.addEventListener('DOMContentLoaded', init);
