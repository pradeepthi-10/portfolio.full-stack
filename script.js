/* ── STARS ───────────────────────────────── */
const container = document.getElementById('particles');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star-dot';
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;
    --dur:${3+Math.random()*5}s;--del:${Math.random()*5}s;
    opacity:${0.1+Math.random()*0.6};
    width:${Math.random()<0.3?3:2}px;height:${Math.random()<0.3?3:2}px;`;
  container.appendChild(s);
}

/* ── NAVBAR ──────────────────────────────── */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 30);
  updateDots();
  updateActiveNav();
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ── TYPED ───────────────────────────────── */
const phrases = ['AIML Engineering Student','Problem Solver','AI & ML Enthusiast','DSA Enthusiast','CS Engineering Student'];
let pi = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');
function type() {
  const cur = phrases[pi];
  typedEl.textContent = del ? cur.slice(0,ci-1) : cur.slice(0,ci+1);
  del ? ci-- : ci++;
  if (!del && ci === cur.length) { del = true; setTimeout(type, 1800); return; }
  if (del && ci === 0) { del = false; pi = (pi+1)%phrases.length; }
  setTimeout(type, del ? 55 : 105);
}
type();

/* ── SMOOTH SCROLL ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
});

/* ── DOT NAV ─────────────────────────────── */
const sections = ['home','about','skills','projects','achievements','certifications','contact'];
const dotEls = document.querySelectorAll('.dot-nav');

dotEls.forEach(d => {
  d.addEventListener('click', () => {
    const t = document.getElementById(d.dataset.target);
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
  d.setAttribute('title', d.dataset.target.charAt(0).toUpperCase() + d.dataset.target.slice(1));
});

function updateDots() {
  const mid = window.scrollY + window.innerHeight / 2;
  let active = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= mid) active = id;
  });
  dotEls.forEach(d => d.classList.toggle('active', d.dataset.target === active));
}

function updateActiveNav() {
  const mid = window.scrollY + 120;
  let active = '';
  sections.slice(1).forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= mid) active = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + active);
  });
}

/* ── SCROLL REVEAL ───────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const siblings = Array.from(e.target.parentElement.children).filter(c => c.classList.contains('reveal'));
      const delay = siblings.indexOf(e.target) * 90;
      setTimeout(() => e.target.classList.add('in'), delay);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => ro.observe(r));

/* ── SKILL BARS ──────────────────────────── */
const sgo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.fill').forEach(f => {
        f.style.width = f.dataset.w + '%';
      });
      sgo.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.sgroup').forEach(g => sgo.observe(g));

/* ── COUNTER ANIMATION ───────────────────── */
function animCount(el, target, decimals=0, suffix='') {
  let start = null;
  const dur = 1600;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = ease * target;
    el.textContent = decimals ? val.toFixed(1) + suffix : Math.floor(val) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const aco = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const cc = document.getElementById('cc-count');
      const cg = document.getElementById('cgpa-count');
      if (cc) animCount(cc, 500, 0, '+');
      if (cg) animCount(cg, 9.0, 1);
      aco.disconnect();
    }
  });
}, { threshold: 0.3 });
const achSection = document.getElementById('achievements');
if (achSection) aco.observe(achSection);

/* ── CONTACT FORM ────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('sbtn');
  const st  = document.getElementById('fstatus');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner" style="animation:spin 1s linear infinite"></i> Sending…';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    st.textContent = '✓ Thanks! I\'ll get back to you within 24 hours.';
    st.className = 'fstatus ok';
    document.getElementById('cform').reset();
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      st.textContent = '';
      st.className = 'fstatus';
    }, 4000);
  }, 1500);
}

/* ── FOOTER YEAR ─────────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();
function openLightbox(id) { document.getElementById(id).classList.add('open'); }
function closeLightbox(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('keydown', e => { if(e.key==='Escape') document.querySelectorAll('.cert-lightbox.open').forEach(el=>el.classList.remove('open')); });
