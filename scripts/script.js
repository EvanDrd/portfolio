// Animation typing
const phrases = [
  "Je transforme les idées en interfaces.",
  "Je suis passionné par l'apprentissage continu. ",
  "Bienvenue dans mon univers de développeur."
];
const typingElement = document.getElementById("typing");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  let displayed = currentPhrase.substring(0, charIndex);
  typingElement.textContent = displayed;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(type, 80);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 40);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, 1500);
  }
}

type();

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

function animateCount(target, endValue, duration = 1500) {
  let start = 0;
  const step = Math.ceil(endValue / (duration / 16));
  const update = () => {
    start += step;
    if (start >= endValue) {
      target.textContent = endValue;
    } else {
      target.textContent = start;
      requestAnimationFrame(update);
    }
  };
  requestAnimationFrame(update);
}

const url = `https://api.jsonbin.io/v3/b/${CONFIG.JSONBIN_ID}`;

fetch(url, {
  method: "GET",
  headers: {
    "X-Master-Key": CONFIG.API_KEY
  }
})
  .then(res => res.json())
  .then(data => {
    const currentCount = data.record.visits + 1;

    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": CONFIG.API_KEY
      },
      body: JSON.stringify({ visits: currentCount })
    }).then(() => currentCount);
  })
  .then(updatedCount => {
    animateCount(document.getElementById("visits"), updatedCount);
  })
  .catch(err => {
    console.error("Erreur JSONBin :", err);
    document.getElementById("visits").textContent = "—";
  });




