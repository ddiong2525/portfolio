// 가로 스크롤 애니메이션
const wrapper = document.querySelector("#con1"); // carousel wrapper
const scrollLength = wrapper.scrollWidth - window.innerWidth; // 가로 스크롤 길이

// 가로 스크롤 애니메이션 설정
const horizontalTween = gsap.to(wrapper, {
  x: -scrollLength,
  ease: "none", // 스크롤과 함께 움직이게
  scrollTrigger: {
    trigger: "#con1", // 트리거는 .carousel
    start: "top top", // 페이지 상단부터
    end: () => `+=${scrollLength}`, // 스크롤 끝까지
    scrub: 1, // 스크롤에 따라 애니메이션이 진행됨
    pin: true, // 스크롤이 끝날 때까지 고정
    onLeave: () => {
      // 가로 스크롤이 끝났을 때, 그 다음 섹션으로 부드럽게 이동
      gsap.to(window, {
        scrollTo: "#con2", // 다음 섹션으로 스크롤
        duration: 1, // 애니메이션 속도
        ease: "power2.out"
      });
    }
  }
});






//섹션별 스크롤 효과
function scrollFooter(scrollY, heightFooter) {
  console.log(scrollY);
  console.log(heightFooter);

  if (scrollY >= heightFooter) {
    $("footer").css({
      bottom: "0px",
    });
  } else {
    $("footer").css({
      bottom: "-" + heightFooter + "px",
    });
  }
}

// ✅ 여기 수정!
$(window).on("load", function () {
  var windowHeight = $(window).height(),
    footerHeight = $("footer").height(),
    heightDocument =
      windowHeight + $(".content").height() + $("footer").height() - 20;

  $("#scroll-animate, #scroll-animate-main").css({
    height: heightDocument + "px",
  });

  $("#con0").css({
    height: windowHeight + "px",
    "line-height": windowHeight + "px",
  });

  $(".wrapper-parallax").css({
    "margin-top": windowHeight + "px",
  });

  scrollFooter(window.scrollY, footerHeight);

  window.onscroll = function () {
    var scroll = window.scrollY;

    $("#scroll-animate-main").css({
      top: "-" + scroll + "px",
    });

    $("#con0").css({
      "background-position-y": 50 - (scroll * 100) / heightDocument + "%",
    });

    scrollFooter(scroll, footerHeight);
  };
});










$('nav ul li').hover(function () {
  $('.custom_cursor').addClass('blue');
}, function () {
  $('.custom_cursor').removeClass('blue');
})

$('header h1').hover(function () {
  $('.custom_cursor').addClass('blue');
}, function () {
  $('.custom_cursor').removeClass('blue');
})

let lastScrollTop = 0;
const nav = document.querySelector("header");



