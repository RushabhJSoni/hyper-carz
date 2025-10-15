const select = (selector, parent = document) => parent.querySelector(selector);
const selectAll = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const navToggle = select('.nav__toggle');
const navList = select('.nav__list');
const mobileQuery = window.matchMedia('(max-width: 960px)');
const pilotForm = select('#pilot-form');
const pilotInput = select('#pilot-name');
const pilotError = select('#pilot-error');
const optionsPanel = select('#options-panel');
const scenarioPanel = select('#scenario-panel');
const scenarioForm = select('#scenario-form');
const scenarioTitle = select('#scenario-title');
const scenarioTarget = select('#scenario-target');
const scenarioRunway = select('#scenario-runway');
const scenarioConditions = select('#scenario-conditions');
const riskInput = select('#risk');
const riskOutput = select('#risk-output');
const scenarioFeedback = select('#scenario-feedback');
const scenarioLog = select('#scenario-log');
const cancelButtons = selectAll('[data-action="cancel-simulator"]');
const restartButton = select('[data-action="restart-simulator"]');
const summaryPanel = select('#simulator-summary');
const summaryText = select('.simulator__summary-text');
const summaryAvgSpeed = select('[data-summary="avg-speed"]');
const summaryThermal = select('[data-summary="thermal"]');
const summarySuccess = select('[data-summary="success"]');
const summaryRows = select('[data-summary="rows"]');
const footerYear = select('#footer-year');
const carOptionsContainer = select('#car-options');
const aeroOptionsContainer = select('#aero-options');
const tireOptionsContainer = select('#tire-options');
const ersOptionsContainer = select('#ers-options');

const cars = [
  {
    id: 'jesko',
    name: 'Jesko Absolut',
    meta: 'Low drag longtail • 1,600 hp',
    topSpeed: 330,
    stability: 64,
    reliability: 62,
    thermalBase: 78,
  },
  {
    id: 'regera',
    name: 'Regera',
    meta: 'Direct Drive hybrid • torque-rich',
    topSpeed: 305,
    stability: 70,
    reliability: 74,
    thermalBase: 70,
  },
  {
    id: 'gemera',
    name: 'Gemera',
    meta: 'TFG hybrid • Arctic specialist',
    topSpeed: 260,
    stability: 82,
    reliability: 80,
    thermalBase: 62,
  },
];

const aeroPackages = [
  {
    id: 'slip',
    name: 'Slipstream shell',
    meta: 'Trimmed wing angles • lowest drag',
    speedGain: 16,
    stability: -10,
    reliability: -4,
    heat: 6,
  },
  {
    id: 'adaptive',
    name: 'Adaptive neutral',
    meta: 'Dynamic balance • factory baseline',
    speedGain: 8,
    stability: 2,
    reliability: 3,
    heat: 8,
  },
  {
    id: 'downforce',
    name: 'High downforce',
    meta: 'Max aero load • higher drag',
    speedGain: -4,
    stability: 12,
    reliability: 6,
    heat: 10,
  },
];

const tireCompounds = [
  {
    id: 'vmax',
    name: 'V-Max slick',
    meta: 'Narrow window • peak velocity',
    speedGain: 10,
    stability: -4,
    reliability: -3,
    grip: 24,
    heat: 16,
  },
  {
    id: 'endurance',
    name: 'Endurance slick',
    meta: 'Stable carcass • multi-run stamina',
    speedGain: 4,
    stability: 4,
    reliability: 8,
    grip: 20,
    heat: 12,
  },
  {
    id: 'arctic',
    name: 'Arctic studded',
    meta: 'Studded rubber • cold deployment',
    speedGain: -10,
    stability: 14,
    reliability: 6,
    grip: 32,
    heat: 8,
  },
];

const ersStrategies = [
  {
    id: 'overboost',
    name: 'Overboost burst',
    meta: 'Full discharge • 30 sec thrust',
    speedGain: 14,
    stability: -6,
    reliability: -8,
    heat: 22,
  },
  {
    id: 'staggered',
    name: 'Staggered push',
    meta: 'Phased release • balanced temps',
    speedGain: 9,
    stability: 0,
    reliability: 4,
    heat: 16,
  },
  {
    id: 'preserve',
    name: 'Thermal save',
    meta: 'Protect cells • sustainable runs',
    speedGain: 5,
    stability: 4,
    reliability: 8,
    heat: 10,
  },
];

const scenarios = [
  {
    id: 'ksc',
    title: 'Shuttle Landing Facility certification',
    runway: 'Kennedy Space Center Runway 33L • 4.5 km concrete',
    conditions: 'Ambient 76°F • crosswind 7 kt NE • density altitude +160 ft',
    targetSpeed: 315,
    dragPenalty: 9,
    airDensityBenefit: -3,
    stabilityDemand: 72,
    reliabilityDemand: 64,
    thermalLimit: 135,
    thermalStress: 18,
    variability: 6,
    defaultRisk: 48,
    sectors: [
      { name: 'Launch & spool', distance: 1.4, surfaceFriction: 0.92, wind: 4 },
      { name: 'V-max chase', distance: 1.6, surfaceFriction: 0.9, wind: 6 },
      { name: 'Brake zone & cooldown', distance: 1.5, surfaceFriction: 0.95, wind: 3 },
    ],
    defaults: { car: 'jesko', aero: 'slip', tire: 'vmax', ers: 'overboost' },
  },
  {
    id: 'nardo',
    title: 'Nardò Technical Center consistency run',
    runway: 'Nardò high-speed ring • 12.5 km banked loop',
    conditions: 'Track temp 88°F • headwind 4 kt • resurfaced polymer grip',
    targetSpeed: 285,
    dragPenalty: 6,
    airDensityBenefit: -1,
    stabilityDemand: 74,
    reliabilityDemand: 72,
    thermalLimit: 138,
    thermalStress: 24,
    variability: 5,
    defaultRisk: 42,
    sectors: [
      { name: 'Out lap thermal', distance: 3.2, surfaceFriction: 0.88, wind: 3 },
      { name: 'Constant velocity hold', distance: 5.5, surfaceFriction: 0.9, wind: 5 },
      { name: 'Cooling sweep', distance: 3.8, surfaceFriction: 0.91, wind: 2 },
    ],
    defaults: { car: 'regera', aero: 'adaptive', tire: 'endurance', ers: 'staggered' },
  },
  {
    id: 'asbru',
    title: 'Ásbrú Arctic runway shakedown',
    runway: 'Keflavík Air Base auxiliary runway • 3.5 km asphalt',
    conditions: 'Ambient 34°F • gusting crosswind 12 kt • frozen edges',
    targetSpeed: 255,
    dragPenalty: -2,
    airDensityBenefit: 5,
    stabilityDemand: 80,
    reliabilityDemand: 76,
    thermalLimit: 128,
    thermalStress: 14,
    variability: 7,
    defaultRisk: 38,
    sectors: [
      { name: 'Surface recon pass', distance: 1.0, surfaceFriction: 0.82, wind: 8 },
      { name: 'Acceleration window', distance: 1.3, surfaceFriction: 0.84, wind: 12 },
      { name: 'Stability hold', distance: 1.2, surfaceFriction: 0.8, wind: 10 },
    ],
    defaults: { car: 'gemera', aero: 'downforce', tire: 'arctic', ers: 'preserve' },
  },
];

const reconModifiers = {
  baseline: { label: 'Baseline systems check', speed: 0, stability: 0, reliability: 0, thermal: 0, prep: 'No additional prep time.' },
  surface: {
    label: 'Surface temperature sweep',
    speed: 2,
    stability: 2,
    reliability: 4,
    thermal: -6,
    prep: 'Adds tyre blanket pre-conditioning; reduces thermal spike.',
  },
  wind: {
    label: 'Wind shear LiDAR',
    speed: 1,
    stability: 5,
    reliability: 2,
    thermal: 2,
    prep: 'Maps crosswind gusts; aids stability but extends systems load.',
  },
};

const state = {
  pilotName: '',
  selections: { car: cars[0].id, aero: aeroPackages[0].id, tire: tireCompounds[0].id, ers: ersStrategies[0].id },
  scenarioIndex: 0,
  results: [],
  active: false,
  timeoutId: null,
};

const getOptionById = (collection, id) => collection.find((item) => item.id === id);

const renderOptionGroup = (container, options, group) => {
  container.innerHTML = '';
  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-card';
    button.dataset.id = option.id;
    button.innerHTML = `<strong>${option.name}</strong><span>${option.meta}</span>`;
    button.addEventListener('click', () => {
      state.selections[group] = option.id;
      updateOptionSelection(container, option.id);
      if (state.active) {
        announceSelection(group, option.name);
      }
    });
    container.appendChild(button);
  });
  updateOptionSelection(container, state.selections[group]);
};

const updateOptionSelection = (container, selectedId) => {
  selectAll('.option-card', container).forEach((card) => {
    card.dataset.selected = card.dataset.id === selectedId ? 'true' : 'false';
  });
};

const announceSelection = (group, name) => {
  scenarioFeedback.dataset.state = 'caution';
  scenarioFeedback.textContent = `Configuration updated: ${group} set to ${name}. Re-run when ready.`;
};

const setScenarioDetails = () => {
  const scenario = scenarios[state.scenarioIndex];
  scenarioTitle.textContent = scenario.title;
  scenarioTarget.textContent = `${scenario.targetSpeed} mph`;
  scenarioRunway.textContent = scenario.runway;
  scenarioConditions.textContent = scenario.conditions;
  riskInput.value = scenario.defaultRisk;
  riskOutput.textContent = `${scenario.defaultRisk}%`;
  scenarioFeedback.dataset.state = '';
  const baseline = scenario.defaults;
  const baselineSummary = [
    getOptionById(cars, baseline.car).name,
    getOptionById(aeroPackages, baseline.aero).name,
    getOptionById(tireCompounds, baseline.tire).name,
    getOptionById(ersStrategies, baseline.ers).name,
  ].join(' • ');
  scenarioFeedback.textContent = `Factory baseline: ${baselineSummary}. Dial risk to ${scenario.defaultRisk}% and execute when ready.`;
  scenarioLog.innerHTML = '';
};

const resetState = () => {
  state.pilotName = '';
  state.selections = { ...scenarios[0].defaults };
  state.scenarioIndex = 0;
  state.results = [];
  state.active = false;
  clearTimeout(state.timeoutId);
  state.timeoutId = null;
  pilotForm.reset();
  pilotError.textContent = '';
  pilotInput.disabled = false;
  select('[data-action="start-simulator"]').disabled = false;
  optionsPanel.hidden = true;
  scenarioPanel.hidden = true;
  summaryPanel.hidden = true;
  summaryRows.innerHTML = '';
  summaryText.textContent = '';
  summaryAvgSpeed.textContent = '—';
  summaryThermal.textContent = '—';
  summarySuccess.textContent = '—';
  renderOptionGroup(carOptionsContainer, cars, 'car');
  renderOptionGroup(aeroOptionsContainer, aeroPackages, 'aero');
  renderOptionGroup(tireOptionsContainer, tireCompounds, 'tire');
  renderOptionGroup(ersOptionsContainer, ersStrategies, 'ers');
};

const runSimulation = (scenario) => {
  const car = getOptionById(cars, state.selections.car);
  const aero = getOptionById(aeroPackages, state.selections.aero);
  const tire = getOptionById(tireCompounds, state.selections.tire);
  const ers = getOptionById(ersStrategies, state.selections.ers);
  const risk = Number(riskInput.value);
  const recon = scenarioForm.elements.recon.value;
  const reconMod = reconModifiers[recon];

  let speedPotential =
    car.topSpeed +
    aero.speedGain +
    tire.speedGain +
    ers.speedGain -
    scenario.dragPenalty +
    scenario.airDensityBenefit +
    (reconMod.speed || 0);

  let stability = car.stability + aero.stability + tire.stability + ers.stability + (reconMod.stability || 0);
  let reliability = car.reliability + aero.reliability + tire.reliability + ers.reliability + (reconMod.reliability || 0);
  let thermal = car.thermalBase + aero.heat + tire.heat + ers.heat + scenario.thermalStress + (reconMod.thermal || 0);

  const riskFactor = risk / 100;
  const aggression = riskFactor * 12;
  speedPotential += aggression;
  stability -= riskFactor * 8;
  reliability -= riskFactor * 12;
  thermal += riskFactor * 14;

  const stabilityMargin = Math.round(stability - scenario.stabilityDemand);
  const reliabilityMargin = Math.round(reliability - scenario.reliabilityDemand);
  const thermalPeak = Math.round(thermal);

  if (stabilityMargin < 0) {
    speedPotential += stabilityMargin * 0.5;
  }

  if (reliabilityMargin < 0) {
    speedPotential += reliabilityMargin * 0.45;
  }

  const variability = scenario.variability + riskFactor * 3;
  const randomDrift = Math.random() * variability * 2 - variability;
  let terminalSpeed = Math.max(180, Math.round(speedPotential + randomDrift));

  let status = 'Success';
  let feedbackState = 'success';
  let narrative = `Terminal speed verified at ${terminalSpeed} mph with ${
    stabilityMargin >= 0 ? 'positive' : 'tight'
  } stability margin.`;

  if (thermalPeak > scenario.thermalLimit + 6 || reliabilityMargin < -18) {
    status = 'Abort';
    feedbackState = 'failure';
    terminalSpeed = Math.max(180, Math.round(speedPotential * 0.78));
    narrative = `Thermal overload triggered torque limiting at ${thermalPeak}°C. Run aborted before ${terminalSpeed} mph.`;
  } else if (terminalSpeed < scenario.targetSpeed - 6 || stabilityMargin < -6 || reliabilityMargin < -6) {
    status = 'Caution';
    feedbackState = 'caution';
    narrative = `Telemetry flagged margins (${stabilityMargin} stability / ${reliabilityMargin} reliability). Terminal speed peaked at ${terminalSpeed} mph.`;
  }

  const sectorLogs = scenario.sectors.map((sector, index) => {
    const sectorAggression = 1 + riskFactor * 0.35 - index * 0.05;
    const sectorGrip = sector.surfaceFriction + (tire.grip / 100) + (recon === 'surface' ? 0.08 : 0);
    const sectorStability = stabilityMargin + sector.wind - riskFactor * 4;
    const sectorThermal = Math.round(thermalPeak - (index * 6 + (recon === 'surface' ? 4 : 0)));

    return `Sector ${index + 1}: ${sector.name} — grip index ${sectorGrip.toFixed(2)}, stability delta ${sectorStability.toFixed(
      1,
    )}, thermal ${sectorThermal}°C.`;
  });

  const result = {
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    terminalSpeed,
    stabilityMargin,
    reliabilityMargin,
    thermalPeak,
    status,
    narrative,
    recon: reconMod.label,
    risk,
    selections: { ...state.selections },
    sectors: sectorLogs,
  };

  return { result, feedbackState };
};

const renderScenarioOutcome = ({ result, feedbackState }) => {
  scenarioFeedback.dataset.state = feedbackState;
  scenarioFeedback.textContent = result.narrative;
  scenarioLog.innerHTML = '';
  result.sectors.forEach((log) => {
    const li = document.createElement('li');
    li.textContent = log;
    scenarioLog.appendChild(li);
  });
};

const advanceScenario = () => {
  const isLastScenario = state.scenarioIndex >= scenarios.length - 1;
  if (isLastScenario) {
    finalizeSimulation();
    return;
  }

  scenarioFeedback.dataset.state = 'caution';
  scenarioFeedback.textContent = 'Advancing to the next proving ground. Recheck your configuration for the new conditions.';
  select('[type="submit"]', scenarioForm).disabled = true;

  state.timeoutId = window.setTimeout(() => {
    state.scenarioIndex += 1;
    const nextScenario = scenarios[state.scenarioIndex];
    state.selections = { ...nextScenario.defaults };
    renderOptionGroup(carOptionsContainer, cars, 'car');
    renderOptionGroup(aeroOptionsContainer, aeroPackages, 'aero');
    renderOptionGroup(tireOptionsContainer, tireCompounds, 'tire');
    renderOptionGroup(ersOptionsContainer, ersStrategies, 'ers');
    setScenarioDetails();
    select('[type="submit"]', scenarioForm).disabled = false;
    state.timeoutId = null;
  }, 2600);
};

const finalizeSimulation = () => {
  state.active = false;
  clearTimeout(state.timeoutId);
  state.timeoutId = null;
  scenarioPanel.hidden = true;
  summaryPanel.hidden = false;

  const speedAverage =
    state.results.reduce((total, entry) => total + entry.terminalSpeed, 0) / (state.results.length || 1);
  const thermalValues = state.results.map((entry) => entry.thermalPeak);
  const thermalPeak = thermalValues.length ? Math.max(...thermalValues) : 0;
  const successCount = state.results.filter((entry) => entry.status === 'Success').length;
  const successRate = state.results.length ? Math.round((successCount / state.results.length) * 100) : 0;

  summaryText.textContent = `${state.pilotName}, ${state.results.length} mission${
    state.results.length === 1 ? '' : 's'
  } logged.`;
  summaryAvgSpeed.textContent = `${Math.round(speedAverage)} mph`;
  summaryThermal.textContent = `${thermalPeak}°C`;
  summarySuccess.textContent = `${successRate}%`;
  summaryRows.innerHTML = '';

  state.results.forEach((entry) => {
    const row = document.createElement('tr');
    row.dataset.status = entry.status;
    row.innerHTML = `
      <td>${entry.scenarioTitle}</td>
      <td>${entry.terminalSpeed} mph</td>
      <td>${entry.stabilityMargin}</td>
      <td>${entry.thermalPeak}°C</td>
      <td>${entry.status}</td>
    `;
    summaryRows.appendChild(row);
  });
};

const startConsole = () => {
  const pilotName = pilotInput.value.trim();
  if (!pilotName) {
    pilotError.textContent = 'Enter a call sign to access the console.';
    pilotInput.focus();
    return;
  }

  pilotError.textContent = '';
  state.pilotName = pilotName;
  state.selections = { ...scenarios[0].defaults };
  renderOptionGroup(carOptionsContainer, cars, 'car');
  renderOptionGroup(aeroOptionsContainer, aeroPackages, 'aero');
  renderOptionGroup(tireOptionsContainer, tireCompounds, 'tire');
  renderOptionGroup(ersOptionsContainer, ersStrategies, 'ers');
  optionsPanel.hidden = false;
  scenarioPanel.hidden = false;
  summaryPanel.hidden = true;
  state.scenarioIndex = 0;
  state.results = [];
  state.active = true;
  pilotInput.disabled = true;
  select('[data-action="start-simulator"]').disabled = true;
  setScenarioDetails();
};

const handleScenarioSubmit = (event) => {
  event.preventDefault();
  if (!state.active) return;

  clearTimeout(state.timeoutId);
  state.timeoutId = null;

  const scenario = scenarios[state.scenarioIndex];
  const { result, feedbackState } = runSimulation(scenario);
  state.results = [...state.results, result];
  renderScenarioOutcome({ result, feedbackState });

  if (result.status === 'Abort') {
    finalizeSimulation();
  } else {
    advanceScenario();
  }
};

const handleAbort = () => {
  if (!state.active) return;
  state.results.push({
    scenarioId: 'abort',
    scenarioTitle: scenarios[state.scenarioIndex].title,
    terminalSpeed: 0,
    stabilityMargin: 0,
    reliabilityMargin: 0,
    thermalPeak: 0,
    status: 'Abort',
    narrative: 'Mission aborted by pilot.',
  });
  finalizeSimulation();
};

const handleRestart = () => {
  resetState();
};

const handleRiskChange = () => {
  riskOutput.textContent = `${riskInput.value}%`;
};

const initNav = () => {
  const closeNav = () => {
    navList.dataset.open = 'false';
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const openNav = () => {
    navList.dataset.open = 'true';
    navToggle.setAttribute('aria-expanded', 'true');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navList.dataset.open === 'true';
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  selectAll('.nav__list a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileQuery.matches) {
        closeNav();
      }
    });
  });

  mobileQuery.addEventListener('change', () => {
    if (!mobileQuery.matches) {
      closeNav();
    }
  });

  closeNav();
};

const init = () => {
  initNav();
  footerYear.textContent = new Date().getFullYear();
  optionsPanel.hidden = true;
  scenarioPanel.hidden = true;
  summaryPanel.hidden = true;
  renderOptionGroup(carOptionsContainer, cars, 'car');
  renderOptionGroup(aeroOptionsContainer, aeroPackages, 'aero');
  renderOptionGroup(tireOptionsContainer, tireCompounds, 'tire');
  renderOptionGroup(ersOptionsContainer, ersStrategies, 'ers');

  pilotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    startConsole();
  });

  scenarioForm.addEventListener('submit', handleScenarioSubmit);
  riskInput.addEventListener('input', handleRiskChange);
  cancelButtons.forEach((button) => button.addEventListener('click', handleAbort));
  restartButton.addEventListener('click', handleRestart);
};

document.addEventListener('DOMContentLoaded', init);
