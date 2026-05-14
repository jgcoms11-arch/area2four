const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
const nt = document.getElementById('navToggle'), nl = document.getElementById('navLinks');
nt.addEventListener('click', () => nl.classList.toggle('open'));
nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open')));
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } });
});
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.anim').forEach(el => obs.observe(el));
setTimeout(() => document.querySelectorAll('.anim:not(.in)').forEach(el => el.classList.add('in')), 2000);
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement, isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = '0'; });
    if (!isOpen) { item.classList.add('open'); item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a').scrollHeight + 'px'; }
  });
});
