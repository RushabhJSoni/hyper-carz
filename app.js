const cars = [
  {
    name: 'Regera',
    topSpeed: 251,
    image: 'Regera.jpg',
    description: 'A luxurious hybrid megacar blending a twin-turbo V8 with electric torque.',
  },
  {
    name: 'Jesko Absolut',
    topSpeed: 300,
    image: 'absolut.jpg',
    description: 'A drag-optimised missile engineered for Koenigsegg\'s ultimate top-speed run.',
  },
  {
    name: 'Gemera',
    topSpeed: 250,
    image: 'gemera.jpg',
    description: 'The four-seat mega-GT that balances outrageous performance with practicality.',
  },
];

const MAX_ATTEMPTS = 5;

const selectors = {
  startButton: '[data-action="start-experience"]',
  welcomeMessage: '#welcome-message',
  cashMessage: '#cash-message',
  resultsList: '#challenge-results',
  rewardFigure: '#challenge-reward',
  rewardImage: '#reward-image',
  rewardCaption: '#reward-caption',
};

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector(selectors.startButton);

  if (!startButton) {
    return;
  }

  startButton.addEventListener('click', async () => {
    const welcomeMessage = document.querySelector(selectors.welcomeMessage);
    const cashMessage = document.querySelector(selectors.cashMessage);

    if (!welcomeMessage || !cashMessage) {
      return;
    }

    const name = await requestUserName();

    if (!name) {
      welcomeMessage.textContent = 'Maybe next time! When you are ready, we\'ll be here with the keys.';
      cashMessage.textContent = '';
      return;
    }

    welcomeMessage.textContent = `Welcome, ${name}!`;

    const hasFunds = await confirmBudget(name, cashMessage);

    if (hasFunds === null) {
      welcomeMessage.textContent = 'No worries—we\'ll save your spot in the Hyper-Carz garage.';
      cashMessage.textContent = '';
      return;
    }

    playTopSpeedChallenge(name, hasFunds);
  });
});

async function requestUserName() {
  let attempts = 0;

  while (attempts < 3) {
    const input = prompt('What\'s your name, pilot?');

    if (input === null) {
      return '';
    }

    const trimmed = input.trim();

    if (trimmed.length > 0) {
      return trimmed;
    }

    alert('Let\'s try that again with at least one character.');
    attempts += 1;
  }

  return '';
}

async function confirmBudget(name, cashMessageElement) {
  while (true) {
    const answer = prompt('Do you have a million dollars available for a Koenigsegg? (yes / no)');

    if (answer === null) {
      return null;
    }

    const normalized = answer.trim().toLowerCase();

    if (normalized === 'yes' || normalized === 'y') {
      cashMessageElement.textContent = `Good to see you again, ${name}! Let\'s find your perfect megacar.`;
      return true;
    }

    if (normalized === 'no' || normalized === 'n') {
      cashMessageElement.innerHTML =
        'Dreams start somewhere. Check out <a href="https://www.lingscars.com/links" target="_blank" rel="noopener">Ling\'s Cars</a> for more budget-friendly options.';
      return false;
    }

    alert('Please answer with yes or no.');
  }
}

function playTopSpeedChallenge(name, hasFunds) {
  const resultsList = document.querySelector(selectors.resultsList);
  const rewardFigure = document.querySelector(selectors.rewardFigure);
  const rewardImage = document.querySelector(selectors.rewardImage);
  const rewardCaption = document.querySelector(selectors.rewardCaption);

  if (!resultsList || !rewardFigure || !rewardImage || !rewardCaption) {
    return;
  }

  resultsList.innerHTML = '';
  rewardFigure.hidden = true;
  rewardImage.removeAttribute('src');
  rewardImage.removeAttribute('alt');
  rewardCaption.textContent = '';

  const hints = cars.map((car) => car.topSpeed).sort((a, b) => a - b);
  const promptMessage =
    `Guess the top speed (mph) of a Koenigsegg. You have ${MAX_ATTEMPTS} attempts. Hint: ${hints.join(', ')}.`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const response = prompt(`${promptMessage} Attempt ${attempt} of ${MAX_ATTEMPTS}.`);

    if (response === null) {
      appendResult(resultsList, `Game cancelled after ${attempt - 1} attempt${attempt === 2 ? '' : 's'}.`);
      return;
    }

    const speed = Number.parseInt(response, 10);

    if (!Number.isFinite(speed) || speed <= 0 || speed > 320) {
      alert('Enter a realistic Koenigsegg top speed between 1 and 320 mph.');
      attempt -= 1;
      continue;
    }

    appendResult(resultsList, `Attempt ${attempt}: ${speed} mph`);

    const matchingCar = cars.find((car) => car.topSpeed === speed);

    if (matchingCar) {
      rewardImage.src = matchingCar.image;
      rewardImage.alt = `${matchingCar.name} on display`;
      rewardCaption.textContent = `${speed} mph is the correct top speed of the Koenigsegg ${matchingCar.name}! ${matchingCar.description}`;
      rewardFigure.hidden = false;

      const victoryMessage = hasFunds
        ? `Congratulations, ${name}! Your Koenigsegg awaits.`
        : `Well played, ${name}! Saving up for a Koenigsegg starts with knowledge.`;

      appendResult(resultsList, victoryMessage);
      return;
    }
  }

  appendResult(
    resultsList,
    `Close call, ${name}! None of those guesses matched a Koenigsegg record. Review the hints and try again when you are ready.`,
  );
}

function appendResult(listElement, text) {
  const item = document.createElement('li');
  item.textContent = text;
  listElement.appendChild(item);
}
