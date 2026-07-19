const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const menuLabel = document.querySelector('[data-menu-label]');

const toggleHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
};

toggleHeader();
window.addEventListener('scroll', toggleHeader, { passive: true });

const setMenuState = (isOpen) => {
  menu?.classList.toggle('is-open', isOpen);
  menuButton?.setAttribute('aria-expanded', String(isOpen));
  if (menuLabel) menuLabel.textContent = isOpen ? '메뉴 닫기' : '메뉴 열기';
};

menuButton?.addEventListener('click', () => {
  setMenuState(!menu?.classList.contains('is-open'));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuState(false);
  });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

reveals.forEach((element) => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const mermaidNodes = Array.from(document.querySelectorAll('.mermaid'));

if (mermaidNodes.length) {
  import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
    .then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        themeVariables: {
          background: '#17171a',
          primaryColor: '#202027',
          primaryTextColor: '#f1f1f4',
          primaryBorderColor: '#8586b8',
          lineColor: '#a9abec',
          secondaryColor: '#1a1a20',
          tertiaryColor: '#24242c',
          clusterBkg: '#17171a',
          clusterBorder: '#626376',
          edgeLabelBackground: '#17171a',
          fontFamily: 'Space Grotesk, Noto Sans KR, sans-serif'
        },
        flowchart: { htmlLabels: true, curve: 'basis', useMaxWidth: true }
      });
      return mermaid.run({ nodes: mermaidNodes });
    })
    .catch(() => {
      mermaidNodes.forEach((node) => node.classList.add('mermaid--fallback'));
    });
}
