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
