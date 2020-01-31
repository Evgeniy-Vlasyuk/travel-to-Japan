/* header scroll */

(function () {
  const nav = document.querySelector('.fixed-wrapper');
  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      nav.classList.add('fixed-wrapper-active');
    } else {
      nav.classList.remove('fixed-wrapper-active');
    }
  };
}());

/*burger*/

(function () {
  const burgerItem = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__nav');
  const menuCloseItem = document.querySelector('.header__nav-close');
  const menuLinks = document.querySelectorAll('.header__link');
  burgerItem.addEventListener('click', () => {
    menu.classList.add('header__nav_active');
    menuCloseItem.addEventListener('click', () => {
      menu.classList.remove('header__nav_active');
    });
  });
  if (window.innerWidth <= 768) {
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
      });
    }
  }
}());

// Smooth scroll to anchors and correct stop

(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.fixed-wrapper').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach(each => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
}());