document.addEventListener('DOMContentLoaded', () => {
// 1. con1 전체 너비 자동 계산
const con1 = document.querySelector("#con1");
const hItems = document.querySelectorAll(".hItem");

let totalWidth = 0;
hItems.forEach(item => {
  totalWidth += (item.offsetWidth + 105);
});
con1.style.width = `${totalWidth}px`; // 동적으로 너비 설정

// 2. 가로 스크롤 애니메이션 설정
const horizontal = document.querySelector('.horizontal');
const sections = gsap.utils.toArray('.horizontal > section');

const scrollTween = gsap.to(sections, {
  x: () => -(totalWidth - window.innerWidth), // 총 이동 거리
  ease: 'none',
  scrollTrigger: {
    trigger: horizontal,
    start: 'top top',
    end: () => "+=" + (totalWidth - window.innerWidth), // ← 이 부분이 핵심
    onUpdate :(self)=>{

    },
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    markers: false // 디버그용, 완성되면 지워도 됨
  }
});

// 3. 각 이미지에 회전 애니메이션
const animations = [
  { target: ".iw2", properties: { rotation: 5.37 }, duration: 1, ease: "power1.inOut" },
  { target: ".iw3", properties: { rotation: -6.23 }, duration: 1, ease: "power1.inOut" },
  { target: ".iw4", properties: { rotation: 8.51 }, duration: 1, ease: "power1.inOut" },
  { target: ".iw5", properties: { rotation: -8 }, duration: 1, ease: "power1.inOut" }
];
let ani = []
animations.forEach((anim, index) => {
  ani[index] = gsap.to(anim.target, {
    ...anim.properties,
    duration: anim.duration,
    ease: anim.ease,
    scrollTrigger: {
      trigger: anim.target,
      containerAnimation: scrollTween,
      start: 'left center',
      toggleActions: "play none reverse none",
      id: anim.target
    }
  });
});

  // 각 애니메이션을 트리거하는 함수
  function triggerAnimation(index) {
    // ani[index]가 존재하는지 체크하고 애니메이션을 실행
    if (ani[index]) {
      ani[index].restart(); // 해당 섹션의 애니메이션 재시작
    }
  }

  // 각 섹션에 대한 스크롤 트리거 설정
  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "left center",
      onEnter: () => {
        triggerAnimation(index); // 해당 섹션의 애니메이션 실행
      },
      onEnterBack: () => {
        triggerAnimation(index);
      },
      containerAnimation: scrollTween // 가로 스크롤 애니메이션과 연동
    });
  });


//궤도
const canvas = document.getElementById("orbitCanvas");
  const ctx = canvas.getContext("2d");
  // 두 궤도의 중심을 같게 설정
const centerX = 400;
const centerY = 150;

  // 첫 번째 궤도의 중심과 설정
  const center1 = {x: centerX, y: centerY};
  const radius1 = 120;//큰 원의 반지름
  let angle1 = 0;
  const speed1 = 0.003;

  // 두 번째 궤도의 중심과 설정
  const center2 = { x: centerX, y: centerY };
  const radius2 = 110;
  let angle2 = 0;
  const speed2 = 0.001;

  const smallCircleRadius = 5;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // === 첫 번째 궤도 ===
    // 궤도 원
    ctx.beginPath();
    ctx.arc(center1.x, center1.y, radius1, 0, Math.PI * 2);
    ctx.strokeStyle = "#878787";
    ctx.stroke();

    // 작은 원 위치 계산 (정방향)
    const x1 = center1.x + radius1 * Math.cos(angle1);
    const y1 = center1.y + radius1 * Math.sin(angle1);

    // 작은 원 그리기
    ctx.beginPath();
    ctx.arc(x1, y1, smallCircleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#878787";
    ctx.stroke();

    // === 두 번째 궤도 ===
    ctx.beginPath();
    ctx.arc(center2.x, center2.y, radius2, 0, Math.PI * 2);
    ctx.strokeStyle = "#878787";
    ctx.stroke();

    // 작은 원 위치 계산 (역방향)
    const x2 = center2.x + radius2 * Math.cos(angle2);
    const y2 = center2.y + radius2 * Math.sin(angle2);

    ctx.beginPath();
    ctx.arc(x2, y2, smallCircleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#878787";
    ctx.fill();

    // 각도 업데이트
    angle1 += speed1; // 정방향
    angle2 -= speed2; // 역방향

    requestAnimationFrame(draw);
  }

  draw();
});