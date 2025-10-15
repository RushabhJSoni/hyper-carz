const select = (selector, parent = document) => parent.querySelector(selector);
const selectAll = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const navToggle = select('.nav__toggle');
const navList = select('.nav__list');
const mobileQuery = window.matchMedia('(max-width: 960px)');
const startButton = select('[data-action="start-simulator"]');
const cancelButtons = selectAll('[data-action="cancel-simulator"]');
const restartButton = select('[data-action="restart-simulator"]');
const pilotForm = select('#pilot-form');
const pilotInput = select('#pilot-name');
const pilotError = select('#pilot-error');
const scenarioPanel = select('#scenario-panel');
const scenarioForm = select('#scenario-form');
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
const carOptionsContainer = select('#car-options');
const aeroOptionsContainer = select('#aero-options');
const tireOptionsContainer = select('#tire-options');
const ersOptionsContainer = select('#ers-options');

const cars = [
  {
    id: 'jesko',
    name: 'Jesko Absolut',
    topSpeed: 330,
    speedBias: 6,
    stability: 64,
    reliability: 66,
    thermalBase: 72,
    meta: '330 mph projected • V-max package',
  },
  {
    id: 'cc850',
    name: 'CC850',
    topSpeed: 280,
    speedBias: 4,
    stability: 72,
    reliability: 74,
    thermalBase: 64,
    meta: 'Engage Shift System • 1,385 hp',
  },
  {
    id: 'gemera',
    name: 'Gemera',
    topSpeed: 248,
    speedBias: 2,
    stability: 78,
    reliability: 80,
    thermalBase: 58,
    meta: 'Tiny Friendly Giant hybrid • 1,700 hp',
  },
];

const aeroPackages = [
  {
    id: 'low',
    title: 'Streamline v-max',
    meta: 'Longtail close-outs • trimmed wing angles',
    speedGain: 14,
    stability: -12,
    reliability: -4,
    heat: 6,
  },
  {
    id: 'balanced',
    title: 'Adaptive neutral',
    meta: 'Active aero blending lift and drag reductions',
    speedGain: 7,
    stability: 0,
    reliability: 2,
    heat: 7,
  },
  {
    id: 'downforce',
    title: 'High-downforce attack',
    meta: 'Max wing incidence • enhanced yaw authority',
    speedGain: -6,
    stability: 14,
    reliability: 5,
    heat: 9,
  },
];

const tireCompounds = [
  {
    id: 'vmax',
    title: 'V-Max slick',
    meta: 'Narrow temp window • lowest rolling resistance',
    speedGain: 6,
    stability: -4,
    reliability: -3,
    grip: 22,
    heat: 18,
  },
  {
    id: 'endurance',
    title: 'Endurance slick',
    meta: 'Stable carcass • multi-run thermal resilience',
    speedGain: 2,
    stability: 4,
    reliability: 6,
    grip: 19,
    heat: 12,
  },
  {
    id: 'wet',
    title: 'Intermediate compound',
    meta: 'Cut tread • excels on low-grip or cold surfaces',
    speedGain: -8,
    stability: 10,
    reliability: 8,
    grip: 28,
    heat: 8,
  },
];

const ersStrategies = [
  {
    id: 'overboost',
    title: 'Overboost deployment',
    meta: 'Full discharge for 30 sec • max thrust',
    speedGain: 10,
    stability: -5,
    reliability: -8,
    heat: 24,
  },
  {
    id: 'balanced',
    title: 'Balanced push',
    meta: 'Staggered delivery • steady-state temps',
    speedGain: 6,
    stability: 0,
    reliability: 2,
    heat: 16,
  },
  {
    id: 'endurance',
    title: 'Thermal save',
    meta: 'Protects cells • sustained repeatability',
    speedGain: 3,
    stability: 4,
    reliability: 6,
    heat: 10,
  },
];

const scenarios = [
  {
    id: 'ksc',
    title: 'Shuttle Landing Facility v-max certification',
    targetSpeed: 315,
    runway: 'Kennedy Space Center Runway 33L • 4.5 km concrete',
    conditions: 'Ambient 76°F • crosswind 7 kt NE • density altitude +160 ft',
    dragPenalty: 9,
    airDensityBenefit: -3,
    stabilityDemand: 72,
    reliabilityDemand: 65,
    failureThreshold: 48,
    stabilityBonus: -2,
    reliabilityBonus: -3,
    thermalLimit: 130,
    surfaceTemp: 92,
    variability: 6,
    defaults: { car: 'jesko', aero: 'low', tire: 'vmax', ers: 'overboost' },
  },
  {
    id: 'nardo',
    title: 'Nardò Technical Center high-speed consistency run',
    targetSpeed: 285,
    runway: 'Nardò high-speed ring • 12.5 km banked loop',
    conditions: 'Track temp 88°F • headwind 4 kt • resurfaced polymer grip',
    dragPenalty: 6,
    airDensityBenefit: -1,
    stabilityDemand: 68,
    reliabilityDemand: 72,
    failureThreshold: 42,
    stabilityBonus: 4,
    reliabilityBonus: 2,
    thermalLimit: 138,
    surfaceTemp: 110,
    variability: 5,
    defaults: { car: 'cc850', aero: 'balanced', tire: 'endurance', ers: 'balanced' },
  },
  {
    id: 'asbru',
    title: 'Ásbrú Arctic runway shakedown',
    targetSpeed: 255,
    runway: 'Keflavík Air Base auxiliary runway • 3.5 km asphalt',
    conditions: 'Ambient 34°F • gusting crosswind 12 kt • frozen edges',
    dragPenalty: -2,
    airDensityBenefit: 4,
    stabilityDemand: 78,
    reliabilityDemand: 68,
    failureThreshold: 50,
    stabilityBonus: -6,
    reliabilityBonus: -2,
    thermalLimit: 118,
    surfaceTemp: 42,
    variability: 8,
    defaults: { car: 'gemera', aero: 'downforce', tire: 'wet', ers: 'endurance' },
  },
];

const carsMap = new Map(cars.map((car) => [car.id, car]));
const aeroMap = new Map(aeroPackages.map((pkg) => [pkg.id, pkg]));
const tireMap = new Map(tireCompounds.map((compound) => [compound.id, compound]));
const ersMap = new Map(ersStrategies.map((strategy) => [strategy.id, strategy]));
const scenarioMap = new Map(scenarios.map((scenario) => [scenario.id, scenario]));

const state = {
  active: false,
  pilot: '',
  round: 0,
  score: 0,
  results: [],
};

const formatSpeed = (value) => `${Math.max(0, value)} mph`;

const renderOptionGroup = (container, options, name) => {
  if (!container) return;
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  options.forEach((option) => {
    const label = document.createElement('label');
    label.className = 'scenario-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = option.id;
    input.required = true;

    const title = document.createElement('span');
    title.className = 'scenario-option__title';
    title.textContent = option.title ?? option.name;

    const meta = document.createElement('span');
    meta.className = 'scenario-option__meta';
    meta.textContent = option.meta;

    label.append(input, title, meta);
    fragment.append(label);
  });

  container.append(fragment);
};

const highlightSelection = (name) => {
  if (!scenarioForm) return;
  selectAll(`input[name="${name}"]`, scenarioForm).forEach((input) => {
    const wrapper = input.closest('.scenario-option');
    if (wrapper) {
      wrapper.classList.toggle('is-selected', input.checked);
    }
  });
};

const setRadioValue = (name, value) => {
  if (!scenarioForm) return;
  selectAll(`input[name="${name}"]`, scenarioForm).forEach((input) => {
    input.checked = input.value === value;
  });
  highlightSelection(name);
};

const populateOptions = () => {
  renderOptionGroup(carOptionsContainer, cars, 'car');
  renderOptionGroup(aeroOptionsContainer, aeroPackages, 'aero');
  renderOptionGroup(tireOptionsContainer, tireCompounds, 'tire');
  renderOptionGroup(ersOptionsContainer, ersStrategies, 'ers');
  ['car', 'aero', 'tire', 'ers'].forEach(highlightSelection);
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
  scenarioLog.innerHTML = '';
  simulatorSummary.hidden = true;
  simulatorSummaryText.textContent = '';
  scenarioForm?.reset();
  ['car', 'aero', 'tire', 'ers'].forEach(highlightSelection);
};

const startSimulator = () => {
  state.active = true;
  startButton.hidden = true;
  pilotForm.hidden = false;
  pilotInput.focus();
};

const applyScenarioDefaults = (scenario) => {
  if (!scenario || !scenario.defaults) return;
  Object.entries(scenario.defaults).forEach(([group, value]) => {
    setRadioValue(group, value);
  });
};

const renderScenario = () => {
  const scenario = scenarios[state.round];
  if (!scenario) return;

  scenarioPanel.hidden = false;
  scenarioRound.textContent = `Scenario ${state.round + 1} of ${scenarios.length}`;
  scenarioTitle.textContent = scenario.title;
  scenarioTarget.textContent = formatSpeed(scenario.targetSpeed);
  scenarioRunway.textContent = scenario.runway;
  scenarioConditions.textContent = scenario.conditions;
  scenarioFeedback.textContent = '';

  scenarioForm?.reset();
  ['car', 'aero', 'tire', 'ers'].forEach(highlightSelection);
  applyScenarioDefaults(scenario);
};

const evaluatePlan = (scenario, plan) => {
  const car = carsMap.get(plan.car);
  const aero = aeroMap.get(plan.aero);
  const tires = tireMap.get(plan.tire);
  const ers = ersMap.get(plan.ers);

  if (!car || !aero || !tires || !ers) {
    return null;
  }

  let speed = car.topSpeed + (car.speedBias || 0);
  let stabilityScore = car.stability;
  let reliabilityScore = car.reliability;
  let thermalLoad = car.thermalBase;

  const integrate = (component) => {
    speed += component.speedGain || 0;
    stabilityScore += component.stability || 0;
    reliabilityScore += component.reliability || 0;
    thermalLoad += component.heat || 0;
  };

  integrate(aero);
  integrate(tires);
  integrate(ers);

  speed -= scenario.dragPenalty;
  speed += scenario.airDensityBenefit;
  stabilityScore += scenario.stabilityBonus;
  reliabilityScore += scenario.reliabilityBonus;

  const totalThermal = thermalLoad + scenario.surfaceTemp;
  let thermalOverload = false;
  if (totalThermal > scenario.thermalLimit) {
    thermalOverload = true;
    const thermalPenalty = Math.round((totalThermal - scenario.thermalLimit) * 0.6);
    speed -= thermalPenalty;
  }

  const stabilityMargin = stabilityScore - scenario.stabilityDemand;
  if (stabilityMargin < 0) {
    speed += Math.round(stabilityMargin * 0.9);
  }

  const reliabilityMargin = reliabilityScore - scenario.reliabilityDemand;
  const reliabilityIndex = (reliabilityScore + stabilityScore) / 2;
  const failureProbability = Math.max(5, Math.round(scenario.failureThreshold - reliabilityIndex));
  const reliabilityRoll = Math.random() * 100;
  const reliabilityFailure = reliabilityRoll < failureProbability;

  const variation = Math.round((Math.random() - 0.5) * scenario.variability);
  speed += variation;

  const effectiveSpeed = Math.round(speed);
  const success = !reliabilityFailure && effectiveSpeed >= scenario.targetSpeed;

  let reason = 'pace';
  let feedback;

  if (reliabilityFailure) {
    reason = 'reliability';
    feedback = 'Telemetry flagged a driveline fault and the run was aborted.';
  } else if (thermalOverload && effectiveSpeed < scenario.targetSpeed) {
    reason = 'thermal';
    feedback = 'Thermal management forced a lift before trap speed verification. Dial back hybrid aggression.';
  } else if (stabilityMargin < 0 && effectiveSpeed < scenario.targetSpeed) {
    reason = 'stability';
    feedback = 'Crosswind correction exceeded available aero authority. Consider more downforce.';
  } else if (success) {
    reason = 'success';
    feedback = `${car.name} confirmed the attempt at ${formatSpeed(effectiveSpeed)}. Data logged for homologation.`;
  } else {
    feedback = `${car.name} peaked at ${formatSpeed(effectiveSpeed)} — short of the verification threshold.`;
  }

  const telemetry = {
    effectiveSpeed,
    stabilityMargin: Math.round(stabilityMargin),
    reliabilityMargin: Math.round(reliabilityMargin),
    thermal: Math.round(totalThermal),
    failureProbability,
  };

  return { success, reason, feedback, telemetry, plan: { car, aero, tires, ers } };
};

const buildLogEntry = (scenario, outcome) => {
  const li = document.createElement('li');
  li.className = 'log-entry';

  const headline = document.createElement('div');
  headline.className = 'log-entry__headline';

  const title = document.createElement('strong');
  title.textContent = scenario.title;

  const status = document.createElement('span');
  status.className = 'log-entry__status';
  status.textContent = outcome.success ? 'Verified' : 'Abort';

  headline.append(title, status);

  const summary = document.createElement('p');
  summary.className = 'log-entry__summary';
  summary.textContent = `${state.pilot} deployed the ${outcome.plan.car.name} with ${outcome.plan.aero.title.toLowerCase()} aero, ${outcome.plan.tires.title.toLowerCase()} tires, and ${outcome.plan.ers.title.toLowerCase()}.`;

  const telemetry = document.createElement('p');
  telemetry.className = 'log-entry__details';
  const stabilityValue = outcome.telemetry.stabilityMargin >= 0 ? `+${outcome.telemetry.stabilityMargin}` : outcome.telemetry.stabilityMargin;
  const reliabilityValue = outcome.telemetry.reliabilityMargin >= 0 ? `+${outcome.telemetry.reliabilityMargin}` : outcome.telemetry.reliabilityMargin;
  telemetry.innerHTML = `Telemetry: <strong>${formatSpeed(outcome.telemetry.effectiveSpeed)}</strong> &bull; Stability margin ${stabilityValue} &bull; Reliability margin ${reliabilityValue} &bull; Thermal ${outcome.telemetry.thermal}&deg;C &bull; Failure window ${outcome.telemetry.failureProbability}%`;

  const detail = document.createElement('p');
  detail.className = 'log-entry__details';
  if (outcome.success) {
    detail.textContent = 'Certification approved. Factory data team recorded a clean trace for the archives.';
  } else if (outcome.reason === 'reliability') {
    detail.textContent = 'Power unit protection intervened. Inspect the driveline before the next sortie.';
  } else if (outcome.reason === 'thermal') {
    detail.textContent = 'Thermal spike triggered torque limiting. Deploy a calmer ERS map or endurance tires.';
  } else if (outcome.reason === 'stability') {
    detail.textContent = 'Stability deficit detected. Increase downforce or select a chassis with broader aero authority.';
  } else {
    detail.textContent = 'Speed delta remained below target. Revisit aero trim and deployment strategy.';
  }

  li.append(headline, summary, telemetry, detail);
  return li;
};

const resolveScenario = (scenario, plan) => {
  const outcome = evaluatePlan(scenario, plan);
  if (!outcome) {
    scenarioFeedback.textContent = 'Unable to compute strategy outcome. Refresh and try again.';
    return;
  }

  scenarioFeedback.textContent = outcome.feedback;
  state.results.push({
    scenarioId: scenario.id,
    success: outcome.success,
    telemetry: outcome.telemetry,
    reason: outcome.reason,
  });

  if (outcome.success) {
    state.score += 1;
  }

  const entry = buildLogEntry(scenario, outcome);
  scenarioLog.prepend(entry);
};

const completeSimulation = () => {
  scenarioPanel.hidden = true;
  const successRate = Math.round((state.score / scenarios.length) * 100);
  let summary = `${state.pilot}, ${state.score} of ${scenarios.length} sorties verified (${successRate}% success). `;

  if (state.score === scenarios.length) {
    summary += 'Flawless execution — Koenigsegg HQ approves your calibration package for customer delivery.';
  } else if (state.score === 0) {
    summary += 'Control recommends additional simulator time before the next proving session.';
  } else {
    summary += 'Solid instincts. Review the mission log to sharpen aero and thermal calls for the next attempt.';
  }

  const bestRun = state.results
    .filter((result) => result.telemetry)
    .reduce((top, current) => {
      if (!top || current.telemetry.effectiveSpeed > top.telemetry.effectiveSpeed) {
        return current;
      }
      return top;
    }, null);

  if (bestRun) {
    const scenarioName = scenarioMap.get(bestRun.scenarioId)?.title ?? 'latest mission';
    summary += ` Highest trap speed: ${formatSpeed(bestRun.telemetry.effectiveSpeed)} during the ${scenarioName}.`;
  }

  simulatorSummaryText.textContent = summary;
  simulatorSummary.hidden = false;
};

const handleScenarioSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(scenarioForm);
  const plan = {
    car: formData.get('car'),
    aero: formData.get('aero'),
    tire: formData.get('tire'),
    ers: formData.get('ers'),
  };

  if (!plan.car || !plan.aero || !plan.tire || !plan.ers) {
    scenarioFeedback.textContent = 'Select a chassis, aero trim, tire compound, and hybrid deployment to proceed.';
    return;
  }

  const scenario = scenarios[state.round];
  if (!scenario) {
    scenarioFeedback.textContent = 'Scenario data unavailable. Refresh and try again.';
    return;
  }

  resolveScenario(scenario, plan);

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
  scenarioForm?.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement && event.target.type === 'radio') {
      highlightSelection(event.target.name);
    }
  });
  cancelButtons.forEach((button) => button.addEventListener('click', resetSimulator));
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
