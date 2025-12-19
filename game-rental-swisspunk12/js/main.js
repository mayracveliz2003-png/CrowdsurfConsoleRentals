// main.js — parallax and mobile nav
document.addEventListener('DOMContentLoaded', ()=>{
  // nav toggle: robustly scope to the nearest nav container and use aria-controls
  (function(){
    const navToggle = document.querySelector('.nav-toggle');
    if(!navToggle) return;
    const siteNav = navToggle.closest('.site-nav') || document.querySelector('.site-nav');
    const menuId = navToggle.getAttribute('aria-controls');
    const navMenu = menuId ? document.getElementById(menuId) : siteNav && siteNav.querySelector('.nav-menu');

    function closeNav(){
      siteNav && siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }

    function openNav(){
      siteNav && siteNav.classList.add('open');
      navToggle.setAttribute('aria-expanded','true');
      const first = navMenu && navMenu.querySelector('a');
      if(first) first.focus();
    }

    navToggle.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      if(expanded) closeNav(); else openNav();
    });

    // close when clicking outside
    document.addEventListener('click', (e)=>{
      if(!siteNav) return;
      if(!siteNav.contains(e.target) && siteNav.classList.contains('open')) closeNav();
    });

    // close on Escape
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeNav(); });

    // close when a nav link is activated (but allow the anchor to proceed)
    if(navMenu){
      navMenu.addEventListener('click', (e)=>{
        const a = e.target.closest && e.target.closest('a');
        if(a){
          // allow default navigation, then close menu
          setTimeout(closeNav, 10);
        }
      });
      // prevent clicks inside from bubbling to document
      navMenu.addEventListener('click', (e)=> e.stopPropagation());
    }
  })();

  // parallax scroll: simple, performant approach
  const parallaxEls = Array.from(document.querySelectorAll('.parallax'));
  if(parallaxEls.length && 'requestAnimationFrame' in window){
    let latestKnownScrollY = 0;
    let ticking = false;
    window.addEventListener('scroll', ()=>{
      latestKnownScrollY = window.scrollY;
      if(!ticking){
        window.requestAnimationFrame(()=>{
          const sc = latestKnownScrollY;
          parallaxEls.forEach(el=>{
            const speed = parseFloat(el.dataset.speed) || 0.1;
            const offset = sc * speed;
            el.style.transform = `translateY(${offset}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, {passive:true});
  }
});
