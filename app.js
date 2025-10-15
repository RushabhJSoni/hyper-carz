const cars = [
  {
    name: 'Regera',
    topSpeed: 251,
    image: 'Regera.jpg',
    description: "A luxurious hybrid megacar blending a twin-turbo V8 with electric torque.",
  },
  {
    name: 'Jesko Absolut',
    topSpeed: 300,
    image: 'absolut.jpg',
    description: "A drag-optimised missile engineered for Koenigsegg's ultimate top-speed run.",
  },
  {
    name: 'Gemera',
    topSpeed: 250,
    image: 'gemera.jpg',
    description: 'The four-seat mega-GT that balances outrageous performance with practicality.',
  },
];

const MAX_ATTEMPTS = 5;
const HINT_MESSAGE = cars
  .map((car) => car.topSpeed)
  .sort((a, b) => a - b)
  .join(', ');

const selectors = {
  startButton: '[data-action="start-experience"]',
  welcomeMessage: '#welcome-message',
  cashMessage: '#cash-message',
  workflow: '#experience-workflow',
  nameForm: '#experience-name-form',
  nameInput: '#experience-name-input',
  nameError: '#experience-name-error',
  budgetStep: '#experience-budget-step',
  resultsList: '#challenge-results',
  rewardFigure: '#challenge-reward',
  rewardImage: '#reward-image',
  rewardCaption: '#reward-caption',
  challengeForm: '#challenge-form',
  challengeInput: '#challenge-input',
  challengeStatus: '#challenge-status',
  challengeError: '#challenge-error',
};

const state = {
  name: '',
  hasFunds: false,
  attempts: 0,
  challengeActive: false,
};

document.addEventListener('DOMContentLoaded', () => {
  const elements = getElements();

  if (!elements) {
    return;
  }

  const cancelExperienceButtons = document.querySelectorAll('[data-action="cancel-experience"]');
  cancelExperienceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      cancelExperience(elements, 'Maybe next time! When you are ready, we\'ll be here with the keys.');
    });
  });

  const budgetYesButton = document.querySelector('[data-action="budget-yes"]');
  const budgetNoButton = document.querySelector('[data-action="budget-no"]');
  const cancelGameButton = document.querySelector('[data-action="cancel-game"]');

  elements.startButton.addEventListener('click', () => {
    startExperience(elements);
  });

  elements.nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleNameSubmission(elements);
  });

  if (budgetYesButton) {
    budgetYesButton.addEventListener('click', () => {
      state.hasFunds = true;
      elements.cashMessage.textContent = `Good to see you again, ${state.name || 'friend'}! Let\'s find your perfect megacar.`;
      beginChallenge(elements);
    });
  }

  if (budgetNoButton) {
    budgetNoButton.addEventListener('click', () => {
      state.hasFunds = false;
      elements.cashMessage.innerHTML =
        'Dreams start somewhere. Check out <a href="https://www.lingscars.com/links" target="_blank" rel="noopener">Ling\'s Cars</a> for more budget-friendly options.';
      beginChallenge(elements);
    });
  }

  elements.challengeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleChallengeSubmission(elements);
  });

  if (cancelGameButton) {
    cancelGameButton.addEventListener('click', () => {
      cancelChallenge(elements);
    });
  }
});

function getElements() {
  const elements = {
    startButton: document.querySelector(selectors.startButton),
    welcomeMessage: document.querySelector(selectors.welcomeMessage),
    cashMessage: document.querySelector(selectors.cashMessage),
    workflow: document.querySelector(selectors.workflow),
    nameForm: document.querySelector(selectors.nameForm),
    nameInput: document.querySelector(selectors.nameInput),
    nameError: document.querySelector(selectors.nameError),
    budgetStep: document.querySelector(selectors.budgetStep),
    resultsList: document.querySelector(selectors.resultsList),
    rewardFigure: document.querySelector(selectors.rewardFigure),
    rewardImage: document.querySelector(selectors.rewardImage),
    rewardCaption: document.querySelector(selectors.rewardCaption),
    challengeForm: document.querySelector(selectors.challengeForm),
    challengeInput: document.querySelector(selectors.challengeInput),
    challengeStatus: document.querySelector(selectors.challengeStatus),
    challengeError: document.querySelector(selectors.challengeError),
  };

  const allElementsPresent = Object.values(elements).every((value) => Boolean(value));

  if (!allElementsPresent) {
    return null;
  }

  return elements;
}

function startExperience(elements) {
  resetState();
  resetChallengeDisplay(elements);
  elements.workflow.hidden = false;
  elements.nameForm.hidden = false;
  elements.budgetStep.hidden = true;
  elements.nameInput.value = '';
  elements.nameError.textContent = '';
  elements.cashMessage.textContent = '';
  elements.welcomeMessage.textContent = "Let's get you in the driver's seat.";
  elements.startButton.textContent = 'Start the Hyper-Carz challenge';
  setStartButtonVisible(elements.startButton, false);
  window.setTimeout(() => {
    elements.nameInput.focus();
  }, 0);
}

function handleNameSubmission(elements) {
  const name = elements.nameInput.value.trim();

  if (name.length === 0) {
    elements.nameError.textContent = 'Please let us know your name to continue.';
    elements.nameInput.focus();
    return;
  }

  state.name = name;
  elements.nameError.textContent = '';
  elements.welcomeMessage.textContent = `Welcome, ${state.name}!`;
  showBudgetStep(elements);
}

function showBudgetStep(elements) {
  elements.nameForm.hidden = true;
  elements.budgetStep.hidden = false;
  const firstChoiceButton = elements.budgetStep.querySelector('button');
  if (firstChoiceButton) {
    firstChoiceButton.focus();
  }
}

function beginChallenge(elements) {
  state.challengeActive = true;
  state.attempts = 0;
  elements.workflow.hidden = true;
  elements.challengeForm.hidden = false;
  elements.challengeInput.value = '';
  elements.challengeError.textContent = '';
  updateChallengeStatus(elements);
  window.setTimeout(() => {
    elements.challengeInput.focus();
  }, 0);
}

function handleChallengeSubmission(elements) {
  if (!state.challengeActive) {
    return;
  }

  const value = elements.challengeInput.value.trim();
  const speed = Number.parseInt(value, 10);

  if (!Number.isFinite(speed) || speed <= 0 || speed > 320) {
    elements.challengeError.textContent = 'Enter a Koenigsegg-worthy top speed between 1 and 320 mph.';
    elements.challengeInput.focus();
    return;
  }

  elements.challengeError.textContent = '';
  state.attempts += 1;
  appendResult(elements.resultsList, `Attempt ${state.attempts}: ${speed} mph`);

  const matchingCar = cars.find((car) => car.topSpeed === speed);

  if (matchingCar) {
    showReward(elements, matchingCar);
    const victoryMessage = state.hasFunds
      ? `Congratulations, ${state.name}! Your Koenigsegg awaits.`
      : `Well played, ${state.name}! Saving up for a Koenigsegg starts with knowledge.`;
    appendResult(elements.resultsList, victoryMessage);
    finishChallenge(elements);
    return;
  }

  if (state.attempts >= MAX_ATTEMPTS) {
    appendResult(
      elements.resultsList,
      `Close call, ${state.name}! None of those guesses matched a Koenigsegg record. Review the hints and try again when you are ready.`,
    );
    finishChallenge(elements);
    return;
  }

  updateChallengeStatus(elements);
  elements.challengeInput.value = '';
  elements.challengeInput.focus();
}

function cancelChallenge(elements) {
  if (!state.challengeActive) {
    cancelExperience(elements, 'No worries—we\'ll save your spot in the Hyper-Carz garage.');
    return;
  }

  const attemptsWord = state.attempts === 1 ? 'attempt' : 'attempts';
  appendResult(elements.resultsList, `Game cancelled after ${state.attempts} ${attemptsWord}.`);
  finishChallenge(elements);
}

function finishChallenge(elements) {
  state.challengeActive = false;
  elements.challengeForm.hidden = true;
  elements.challengeInput.value = '';
  elements.challengeStatus.textContent = '';
  elements.challengeError.textContent = '';
  setStartButtonVisible(elements.startButton, true);
  elements.startButton.textContent = 'Play the Hyper-Carz challenge again';
  elements.startButton.focus();
}

function cancelExperience(elements, message) {
  resetState();
  elements.workflow.hidden = true;
  elements.challengeForm.hidden = true;
  elements.challengeStatus.textContent = '';
  elements.challengeError.textContent = '';
  resetChallengeDisplay(elements);
  setStartButtonVisible(elements.startButton, true);
  elements.startButton.textContent = 'Start the Hyper-Carz challenge';
  elements.welcomeMessage.textContent = message;
  elements.cashMessage.textContent = '';
}

function resetState() {
  state.name = '';
  state.hasFunds = false;
  state.attempts = 0;
  state.challengeActive = false;
}

function resetChallengeDisplay(elements) {
  elements.resultsList.innerHTML = '';
  elements.rewardFigure.hidden = true;
  elements.rewardImage.removeAttribute('src');
  elements.rewardImage.removeAttribute('alt');
  elements.rewardCaption.textContent = '';
}

function showReward(elements, car) {
  elements.rewardImage.src = car.image;
  elements.rewardImage.alt = `${car.name} on display`;
  elements.rewardCaption.textContent = `${car.topSpeed} mph is the correct top speed of the Koenigsegg ${car.name}! ${car.description}`;
  elements.rewardFigure.hidden = false;
}

function updateChallengeStatus(elements) {
  const nextAttempt = state.attempts + 1;
  elements.challengeStatus.textContent = `Attempt ${nextAttempt} of ${MAX_ATTEMPTS} — choose from these target speeds: ${HINT_MESSAGE} mph.`;
}

function appendResult(listElement, text) {
  const item = document.createElement('li');
  item.textContent = text;
  listElement.appendChild(item);
}

function setStartButtonVisible(button, isVisible) {
  button.hidden = !isVisible;
}
