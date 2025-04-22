
$('#con3 article').hover(function () {
    $('.custom_cursor').addClass('blue');
  }, function () {
    $('.custom_cursor').removeClass('blue');
  })

  $('#con3 article a').hover(function () {
    $('.custom_cursor').addClass('yellow');
  }, function () {
    $('.custom_cursor').removeClass('yellow');
  })

  $('a.one').hover(
    function () {
      const video = $('.img1 video').get(0);
      const img = $('.img1 img');
  
      // video 클래스 조작 + 재생
      $(video).addClass('move_v').removeClass('default_v');
      video.play();
  
      // img 클래스 조작
      $(img).addClass('move_i').removeClass('default_i');
    },
    function () {
      const video = $('.img1 video').get(0);
      const img = $('.img1 img');
  
      // video 클래스 조작 + 정지
      $(video).addClass('default_v').removeClass('move_v');
      video.pause();
      video.currentTime = 0;
  
      // img 클래스 조작
      $(img).addClass('default_i').removeClass('move_i');
    }
  );

  $('a.two').hover(
    function () {
      const video = $('.img2 video').get(0);
      const img = $('.img2 img');
  
      // video 클래스 조작 + 재생
      $(video).addClass('move_v').removeClass('default_v');
      video.play();
  
      // img 클래스 조작
      $(img).addClass('move_i').removeClass('default_i');
    },
    function () {
      const video = $('.img2 video').get(0);
      const img = $('.img2 img');
  
      // video 클래스 조작 + 정지
      $(video).addClass('default_v').removeClass('move_v');
      video.pause();
      video.currentTime = 0;
  
      // img 클래스 조작
      $(img).addClass('default_i').removeClass('move_i');
    }
  );

  $('a.three').hover(
    function () {
      const video = $('.img3 video').get(0);
      const img = $('.img3 img');
  
      // video 클래스 조작 + 재생
      $(video).addClass('move_v').removeClass('default_v');
      video.play();
  
      // img 클래스 조작
      $(img).addClass('move_i').removeClass('default_i');
    },
    function () {
      const video = $('.img3 video').get(0);
      const img = $('.img3 img');
  
      // video 클래스 조작 + 정지
      $(video).addClass('default_v').removeClass('move_v');
      video.pause();
      video.currentTime = 0;
  
      // img 클래스 조작
      $(img).addClass('default_i').removeClass('move_i');
    }
  );
/*   $('a.one').hover(function(){
    $('.img1 img').addClass('move_img')}, function () {
      $('.img1 img').removeClass('move_img');
  }) */

      const path = document.querySelector('.path');
      const pathLength = path.getTotalLength(); // ← 이거 중요!
      
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
      
      const links = document.querySelectorAll('.link-table .one');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          path.style.strokeOpacity = '1';
          path.style.strokeDashoffset = '0';
        });
      
        link.addEventListener('mouseleave', () => {
          path.style.strokeOpacity = '0';
          path.style.strokeDashoffset = pathLength;
        });
      });


  document.addEventListener('DOMContentLoaded', () => {
    // 기존 locomotive-scroll 설정은 여기 생략!
  
    const scrollContainer = document.querySelector('[data-scroll-container]');
  
    const fadeUpRightElements = gsap.utils.toArray('.right');
  
    fadeUpRightElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          x: -50,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            scrub: false,
            scroller: scrollContainer,
            // markers: true // ← 디버깅 시 켜기
            toggleActions: 'restart none restart none', // ⬅ 이게 핵심
            //  ↓ 내려갈 때       ↓ 트리거 벗어날 때   ↑ 올라와서 다시 진입할 때  ↑ 위로 벗어날 때
          }
        }
      );
    });
  });
  