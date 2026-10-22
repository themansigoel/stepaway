// Native disclosure navigation: expanded without JavaScript, compact on phones.
(() => {
  const menu = document.querySelector('details.studio-menu');
  if (!menu) return;
  const small = window.matchMedia('(max-width: 700px)');
  const update = () => { menu.open = !small.matches; };
  update();
  small.addEventListener('change', update);
  menu.addEventListener('click', event => {
    if (small.matches && event.target.closest('a')) menu.open = false;
  });
})();
