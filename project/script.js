const messages = {
  krithika:
    "Krithika, your kindness and strength inspire everyone around you. Keep shining and Happy Women's Day!",
  praneetha:
    'Praneetha, your determination and positivity make you unstoppable. The world is brighter because of you.',
  harshini: 'Harshini, your smile spreads happiness wherever you go. Never stop being amazing.',
  anu: 'Anu, your creativity and courage make the world a better place. Believe in yourself always.',
  durga:
    'Durga, your strength truly lives up to your name. You inspire everyone around you every day.'
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
  bgMusic
    .play()
    .then(() => {
      audioToggle.textContent = 'Mute Music';
    })
    .catch(() => {
      audioToggle.textContent = 'Tap to Play Music';
    });
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

  if (bgMusic.paused) {
    bgMusic.play();
    audioToggle.textContent = 'Mute Music';
  } else {
    bgMusic.pause();
    audioToggle.textContent = 'Play Music';
  }
});
