""
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("[data-scroll-container]");
  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
  });

  scroll.on("scroll", ScrollTrigger.update);
  // 모든 앵커에 이벤트 적용
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // 기본 이동 방지

      const targetId = this.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        scroll.scrollTo(targetEl);
      }
    });
  });
  ScrollTrigger.defaults({ scroller: scrollContainer });

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    /*     pinType: scrollContainer.style.transform ? "transform" : "fixed", */
  });

  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  ScrollTrigger.refresh();

  const customCursor = document.querySelector('.custom_cursor');
  window.addEventListener('mousemove', (e) => {
    customCursor.style.top = `${e.clientY}px`;
    customCursor.style.left = `${e.clientX}px`;
  });

  setTimeout(function() {
    $('.txtAni').simplyScroll({
      pauseOnHover: false,
      speed: 3,
    });
  }, 300);

  setTimeout(() => {
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('#con0 video').play();
    location.href = '#';
  }, 3000);


  //스크롤 내리면 내비 올라가는 효과
  const nav = document.querySelector("header");

  let lastScrollTop = 0;

  scroll.on("scroll", (args) => {
    const currentScroll = args.scroll.y;

    if (currentScroll > lastScrollTop) {
      nav.classList.add("sc");
    } else {
      nav.classList.remove("sc");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
  //

  //커서에 블루클래스 추가하는 거
  $('nav ul li').hover(function () {
    $('.custom_cursor').addClass('yellow');
  }, function () {
    $('.custom_cursor').removeClass('yellow');
  })

  $('header h1').hover(function () {
    $('.custom_cursor').addClass('yellow');
  }, function () {
    $('.custom_cursor').removeClass('yellow');
  })

  $('.bt_btn a').hover(function () {
    $('.custom_cursor').addClass('yellow');
  }, function () {
    $('.custom_cursor').removeClass('yellow');
  })

  $('.iw1').hover(function () {
    $('.custom_cursor').addClass('blue');
  }, function () {
    $('.custom_cursor').removeClass('blue');
  })

  $('.black').hover(function () {
    $('.custom_cursor').addClass('blue');
  }, function () {
    $('.custom_cursor').removeClass('blue');
  })

  $('footer').hover(function () {
    $('.custom_cursor').addClass('yellow');
  }, function () {
    $('.custom_cursor').removeClass('yellow');
  })

  $('.carousel-item:nth-child(1) .carousel-box').hover(function () {
    $('.custom_cursor').addClass('blue');
  }, function () {
    $('.custom_cursor').removeClass('blue');
  })
});
