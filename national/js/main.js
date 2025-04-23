$(function(){
  AOS.init();

    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    let swiper = new Swiper(".main_visual", {
        loop:true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".main_visual .swiper-pagination",
          clickable: true
        },
        on: {
          autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
/*             progressContent.textContent = `${Math.ceil(time / 1000)}s`; */
          }
        }
      });

      let swiper2 = new Swiper(".gal_Swiper", {
        effect: "cards",
        grabCursor: true,
      });//<-카드들 다 만들고 작동시켜보기

      $('.main_visual').hover(function(){
        $('.main_visual .left').animate({
          left : '40px'
        },300)
      },function(){
        $('.main_visual .left').animate({
          left : '-40px'
        },300)
      })
      $('.main_visual').hover(function(){
        $('.main_visual .right').animate({
          right : '40px'
        },300)
      },function(){
        $('.main_visual .right').animate({
          right : '-40px'
        },300)
      })
      $('.main_visual').hover(function(){
        $('.main_visual .top').animate({
          top : '23px'
        },300)
      },function(){
        $('.main_visual .top').animate({
          top : '-23px'
        },300)
      })
      $('.main_visual').hover(function(){
        $('.main_visual .bottom').animate({
          bottom : '23px'
        },300)
      },function(){
        $('.main_visual .bottom').animate({
          bottom : '-23px'
        },300)
      }) //=>걍 css animation 돌려라

      let swiper3 = new Swiper('.store_swiper', {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".store_next",
          prevEl: ".store_prev",
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      });
});