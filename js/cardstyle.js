document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("oo");
    const ctx = canvas.getContext("2d");
  
    const gravity = 0.5;
    const bounceStrength = 0.9;
  
    let mouseX = -1000;
    let mouseY = -1000;
    let draggingBall = null;
    let images = [];
  
    const imageData = [
      { src: "./img/3 1.png", x: 100, y: 100, size: 70 },
      { src: "./img/2 25.png", x: 250, y: 80, size: 70 },
      { src: "./img/1 999.png", x: 400, y: 120, size: 70 },
      { src: "./img/4 1.png", x: 180, y: 200, size: 70 },
      { src: "./img/5 1.png", x: 320, y: 180, size: 70 },
    ];
  
    // ✅ Retina 대응 + 정확한 렌더링 사이즈 유지
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const width = 544;
      const height = 678;
  
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
  
      canvas.width = width * dpr;
      canvas.height = height * dpr;
  
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 고해상도 대응
    }
  
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    // ✅ Ball 클래스
    class Ball {
      constructor(x, y, vx, vy, img, radius = 100) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.img = img;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
      }
  
      draw() {
        ctx.drawImage(
          this.img,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        );
      }
  
      update() {
        if (!this.dragging) {
          this.vy += gravity;
          this.x += this.vx;
          this.y += this.vy;
  
          if (this.y + this.radius > canvas.height / (window.devicePixelRatio || 1)) {
            this.y = canvas.height / (window.devicePixelRatio || 1) - this.radius;
            this.vy *= -bounceStrength;
          }
  
          if (this.x - this.radius < 0 || this.x + this.radius > canvas.width / (window.devicePixelRatio || 1)) {
            this.vx *= -bounceStrength;
            this.x = Math.max(this.radius, Math.min(this.x, canvas.width / (window.devicePixelRatio || 1) - this.radius));
          }
        }
  
        this.draw();
      }
  
      isInside(x, y) {
        return (x - this.x) ** 2 + (y - this.y) ** 2 <= this.radius ** 2;
      }
  
      bounce() {
        this.vx += (Math.random() - 0.5) * 2;
        this.vy -= Math.random() * 5 + 1;
      }
    }
  
    // ✅ 이미지 미리 로드 + Ball 생성
    function preloadImages(imageData, callback) {
      let loadedCount = 0;
      const total = imageData.length;
  
      imageData.forEach((data) => {
        const img = new Image();
        img.src = data.src;
        img.onload = () => {
          const ball = new Ball(
            data.x,
            data.y,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            img,
            data.size ?? 50
          );
          images.push(ball);
          loadedCount++;
          if (loadedCount === total) callback();
        };
      });
    }
  
    // ✅ 충돌 처리
    function handleCollisions() {
      for (let i = 0; i < images.length; i++) {
        for (let j = i + 1; j < images.length; j++) {
          const a = images[i];
          const b = images[j];
  
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.radius + b.radius;
  
          if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const overlap = minDist - dist;
            const moveX = (Math.cos(angle) * overlap) / 2;
            const moveY = (Math.sin(angle) * overlap) / 2;
  
            a.x -= moveX;
            a.y -= moveY;
            b.x += moveX;
            b.y += moveY;
  
            const tempVx = a.vx;
            const tempVy = a.vy;
            a.vx = b.vx;
            a.vy = b.vy;
            b.vx = tempVx;
            b.vy = tempVy;
          }
        }
      }
    }
  
    // ✅ 애니메이션 루프
    function animateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleCollisions();
  
      for (let ball of images) {
        if (ball.isInside(mouseX, mouseY) && !ball.dragging) {
          ball.bounce();
        }
        ball.update();
      }
  
      requestAnimationFrame(animateCanvas);
    }
  
    // ✅ 마우스 이벤트
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
  
      for (let ball of images) {
        if (ball.isInside(mx, my)) {
          draggingBall = ball;
          ball.dragging = true;
          ball.offsetX = mx - ball.x;
          ball.offsetY = my - ball.y;
          ball.vx = 0;
          ball.vy = 0;
          break;
        }
      }
    });
  
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
  
      if (draggingBall) {
        draggingBall.x = mouseX - draggingBall.offsetX;
        draggingBall.y = mouseY - draggingBall.offsetY;
      }
    });
  
    canvas.addEventListener("mouseup", () => {
      if (draggingBall) {
        draggingBall.dragging = false;
        draggingBall.vy = 0;
        draggingBall = null;
      }
    });
  
    // ✅ 시작
    preloadImages(imageData, animateCanvas);
  });