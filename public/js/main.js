// ─── Mobile Nav Toggle ────────────────────────────────────────────────────────
function toggleNav() {
  const links = document.querySelector('.nav-links');
  if (links) links.classList.toggle('open');
}

// ─── Highlight active nav link ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const path  = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.style.background    = 'var(--lavender-lt)';
      link.style.color         = 'var(--text-dark)';
      link.style.borderColor   = 'var(--lavender)';
    }
  });

  // Stagger-animate cards on load
  const cards = document.querySelectorAll('.glass-card, .action-card, .habit-item, .goal-item, .mood-entry');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.06}s`;
    card.classList.add('card-entrance');
  });
});

// Inject entrance animation via style
const style = document.createElement('style');
style.textContent = `
  .card-entrance {
    animation: fadeUp 0.5s ease both;
  }
`;
document.head.appendChild(style);
