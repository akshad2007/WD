const messages = {
  krithika:
    "Still in shock that it's been 10 years since we met!  You are one of the best woman I met.. You have always been strong and beautiful you can face everything and I'm with you in thing..May let nothing stop you stay strong stay wow 🤩🤩",
  praneetha:
    'One of the real independent strong woman I met,Be it sports be in life be it anything you always are the best Always be like this and never let anyone stop you from being the amazing person you are.🌸',
  harshini: 'Ive seen you go through so much and you have always come out stronger. You are a true inspiration to everyone around you. Keep shining and never let anyone dim your light. stay strong and keep being the amazing person you are.💪🌸',
  anu: 'The always calm friendly and that beautiful character of yours is all that make you a beautiful woman,keep this going everything you face  your strength a very happy womans day💞💞.',
  durga:
    'I know you had to face so much and yet you never gave up on yourself and that is wwhat makes you the best keep it up and grow stronger dont forget I always will be there for you. Never giveup on yourself💪🌸'
};

const songs = {
  krithika: 'songs/heroes-tonight.mp3',
  praneetha: 'songs/symbolism.mp3',
  harshini: 'songs/invincible.mp3',
  anu: 'songs/sky-high.mp3',
  durga: 'songs/on-and-on.mp3'
};

const fallbackMessage = "Every woman is special. Happy Women's Day!";

const nameInput = document.getElementById('nameInput');
const revealBtn = document.getElementById('revealBtn');
const messageCard = document.getElementById('messageCard');
const messageText = document.getElementById('messageText');
const bgMusic = document.getElementById('bgMusic');
const audioToggle = document.getElementById('audioToggle');
const floatingLayer = document.getElementById('floatingLayer');

let floatInterval;

function normalizeName(name) {
  return name.trim().toLowerCase();
}

function launchConfetti() {
  const duration = 2500;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      startVelocity: 30,
      spread: 360,
      ticks: 80,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#ff6ea7', '#ffd1ea', '#b797ff', '#ffffff']
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

function spawnFloatItem() {
  const item = document.createElement('span');
  item.className = 'float-item';
  item.textContent = Math.random() > 0.45 ? '💖' : '🌸';
  item.style.left = `${Math.random() * 100}%`;
  item.style.setProperty('--drift', `${(Math.random() - 0.5) * 180}px`);
  item.style.animationDuration = `${6 + Math.random() * 6}s`;
  floatingLayer.appendChild(item);

  setTimeout(() => item.remove(), 13000);
}

function runFloatingAnimation() {
  if (floatInterval) {
    clearInterval(floatInterval);
  }
  for (let i = 0; i < 16; i += 1) {
    setTimeout(spawnFloatItem, i * 180);
  }
  floatInterval = setInterval(spawnFloatItem, 450);
}

function updateMessageCard(message) {
  messageText.textContent = message;
  messageCard.classList.remove('hidden', 'show');
  void messageCard.offsetWidth;
  messageCard.classList.add('show');
}

function playSong(path) {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  bgMusic.src = path;
  bgMusic.muted = false;
  bgMusic.play();
  audioToggle.textContent = 'Mute Music';
}

function revealMessage() {
  const key = normalizeName(nameInput.value);
  const message = messages[key] || fallbackMessage;
  updateMessageCard(message);
  launchConfetti();
  runFloatingAnimation();

  if (songs[key]) {
    playSong(songs[key]);
  } else {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.removeAttribute('src');
    audioToggle.textContent = 'No Song for this Name';
  }
}

revealBtn.addEventListener('click', revealMessage);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    revealMessage();
  }
});

audioToggle.addEventListener('click', () => {
  if (!bgMusic.src) {
    return;
  }

  bgMusic.muted = !bgMusic.muted;
  audioToggle.textContent = bgMusic.muted ? 'Unmute Music' : 'Mute Music';
});
