document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('[data-scroll-container]');

  const con2Article = gsap.utils.toArray('.articles article');

  con2Article.forEach((el, i) => {
    gsap.fromTo(
      el,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 30%',
          scrub: true,
          scroller: scrollContainer,
          markers: true
        }
      }
    );
  });

  // ✅ simplyScroll 초기화 추가
  $('.txtAniBox2 .txtAni2').simplyScroll({
    speed: 8,
    frameRate: 60,
    pauseOnHover: false,
    pauseOnTouch: false,
    direction: 'forwards',
  });

  //첫 번째 비디오 재생
  const video = document.querySelector('.one .bt_left video');

  if (video) {
    // ScrollTrigger 등록
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: video,
      start: 'top 90%',   // 트리거 시작 지점 (화면 80% 위치에 도달하면)
      end: 'bottom 20%',  // 트리거 끝 지점
      scroller: document.querySelector('[data-scroll-container]'), // 만약 Locomotive Scroll 등 사용할 때 필요
      onEnter: () => {
        video.muted = true; // 항상 muted 유지
        video.play().catch((e) => console.log('video play error:', e));
      },
      onLeave: () => {
        video.pause();
        video.currentTime = 0; // 처음으로 되돌리고 싶다면
      },
      onEnterBack: () => {
        video.play().catch((e) => console.log('video replay error:', e));
      },
      onLeaveBack: () => {
        video.pause();
        video.currentTime = 0;
      },
      markers: true // 🔍 확인용 (개발 끝나면 지워도 됨)
    });
  }

    //두 번째 비디오 재생
    const video2 = document.querySelector('.two .bt_left video');

    if (video2) {
      // ScrollTrigger 등록
      gsap.registerPlugin(ScrollTrigger);
  
      ScrollTrigger.create({
        trigger: video2,
        start: 'top 90%',   // 트리거 시작 지점 (화면 80% 위치에 도달하면)
        end: 'bottom 20%',  // 트리거 끝 지점
        scroller: document.querySelector('[data-scroll-container]'), // 만약 Locomotive Scroll 등 사용할 때 필요
        onEnter: () => {
          video2.muted = true; // 항상 muted 유지
          video2.play().catch((e) => console.log('video play error:', e));
        },
        onLeave: () => {
          video2.pause();
          video2.currentTime = 0; // 처음으로 되돌리고 싶다면
        },
        onEnterBack: () => {
          video2.play().catch((e) => console.log('video replay error:', e));
        },
        onLeaveBack: () => {
          video2.pause();
          video2.currentTime = 0;
        },
        markers: true // 🔍 확인용 (개발 끝나면 지워도 됨)
      });
    }

  //세 번째 비디오 재생
  const video3 = document.querySelector('.three .bt_left video');

  if (video3) {
    // ScrollTrigger 등록
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: video3,
      start: 'top 90%',   // 트리거 시작 지점 (화면 80% 위치에 도달하면)
      end: 'bottom 20%',  // 트리거 끝 지점
      scroller: document.querySelector('[data-scroll-container]'), // 만약 Locomotive Scroll 등 사용할 때 필요
      onEnter: () => {
        video3.muted = true; // 항상 muted 유지
        video3.play().catch((e) => console.log('video play error:', e));
      },
      onLeave: () => {
        video3.pause();
        video3.currentTime = 0; // 처음으로 되돌리고 싶다면
      },
      onEnterBack: () => {
        video3.play().catch((e) => console.log('video replay error:', e));
      },
      onLeaveBack: () => {
        video3.pause();
        video3.currentTime = 0;
      },
      markers: true // 🔍 확인용 (개발 끝나면 지워도 됨)
    });
  }

  //네 번째 비디오 재생
  const video4 = document.querySelector('.four .bt_left video');

  if (video4) {
    // ScrollTrigger 등록
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: video4,
      start: 'top 90%',   // 트리거 시작 지점 (화면 80% 위치에 도달하면)
      end: 'bottom 20%',  // 트리거 끝 지점
      scroller: document.querySelector('[data-scroll-container]'), // 만약 Locomotive Scroll 등 사용할 때 필요
      onEnter: () => {
        video4.muted = true; // 항상 muted 유지
        video4.play().catch((e) => console.log('video play error:', e));
      },
      onLeave: () => {
        video4.pause();
        video4.currentTime = 0; // 처음으로 되돌리고 싶다면
      },
      onEnterBack: () => {
        video4.play().catch((e) => console.log('video replay error:', e));
      },
      onLeaveBack: () => {
        video4.pause();
        video4.currentTime = 0;
      },
      markers: true // 🔍 확인용 (개발 끝나면 지워도 됨)
    });
  }
  

/*   $('.txtAniBox .txtAni2').simplyScroll({
    speed: 3,
    pauseOnHover: true,
    pauseOnTouch: false,
    direction: 'backwards',
  });

  $('.txtAniBox .txtAni3').simplyScroll({
    speed: 4,
    pauseOnHover: true,
    pauseOnTouch: false,
    direction: 'forwards',
  }); */
});