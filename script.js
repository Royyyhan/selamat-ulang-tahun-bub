/* ============================================= */
/*  Birthday Surprise Website - Script            */
/*  Untuk: Alinda                                 */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  //  ELEMENTS
  // =============================================
  const pages = document.querySelectorAll('.page');
  const btnSurprise = document.getElementById('btnSurprise');
  const btnToMessage = document.getElementById('btnToMessage');
  const btnConfetti = document.getElementById('btnConfetti');
  const musicBtn = document.getElementById('musicBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const musicPlayer = document.getElementById('musicPlayer');
  const bgMusic = document.getElementById('bgMusic');
  const particlesContainer = document.getElementById('particles');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const ctx = confettiCanvas.getContext('2d');

  let isPlaying = false;
  let currentPage = 'pageLanding';

  // =============================================
  //  PARTICLES - Floating Hearts & Stars
  // =============================================
  const particleEmojis = ['💕', '✨', '🌸', '💖', '⭐', '🦋', '🌷', '💗', '🎀', '🌺'];

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

    const size = Math.random() * 1.2 + 0.6;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      left: ${left}%;
      font-size: ${size}rem;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particlesContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, (duration + delay) * 1000);
  }

  // Create initial particles
  for (let i = 0; i < 15; i++) {
    createParticle();
  }

  // Continuously create particles
  setInterval(createParticle, 2000);

  // =============================================
  //  PAGE TRANSITIONS
  // =============================================
  function navigateTo(targetId) {
    const currentEl = document.getElementById(currentPage);
    const targetEl = document.getElementById(targetId);

    if (!currentEl || !targetEl || currentPage === targetId) return;

    // Slide out current page
    currentEl.classList.add('slide-out-left');
    currentEl.classList.remove('active');

    // Prepare target page
    targetEl.classList.add('slide-in-right');
    targetEl.style.visibility = 'visible';
    targetEl.style.opacity = '0';

    // Small delay then slide in
    requestAnimationFrame(() => {
      setTimeout(() => {
        targetEl.classList.remove('slide-in-right');
        targetEl.classList.add('active');
        targetEl.style.opacity = '';
        targetEl.style.visibility = '';

        // Reset scroll position
        targetEl.scrollTop = 0;

        // Clean up previous page after transition
        setTimeout(() => {
          currentEl.classList.remove('slide-out-left');
        }, 600);

        currentPage = targetId;

        // Trigger animations for gallery items
        if (targetId === 'pageGallery') {
          triggerGalleryAnimations();
        }
        if (targetId === 'pageMessage') {
          triggerMessageAnimations();
        }
      }, 50);
    });
  }

  function triggerGalleryAnimations() {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach((p, i) => {
      p.style.opacity = '0';
      p.style.animation = 'none';
      requestAnimationFrame(() => {
        p.style.animation = '';
        p.style.animationDelay = `${i * 0.15}s`;
      });
    });
  }

  function triggerMessageAnimations() {
    const container = document.querySelector('.message-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    requestAnimationFrame(() => {
      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // =============================================
  //  BUTTON EVENTS
  // =============================================
  btnSurprise.addEventListener('click', () => {
    // Try to auto-play music on first interaction
    if (!isPlaying) {
      toggleMusic();
    }
    navigateTo('pageGallery');
  });

  btnToMessage.addEventListener('click', () => {
    navigateTo('pageMessage');
  });

  // =============================================
  //  MUSIC PLAYER
  // =============================================
  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '🎵';
      musicLabel.textContent = 'Play Musik';
      musicPlayer.classList.remove('playing');
    } else {
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          musicIcon.textContent = '⏸️';
          musicLabel.textContent = 'Pause';
          musicPlayer.classList.add('playing');
        }).catch(() => {
          // Autoplay was prevented, user needs to click
          console.log('Autoplay dicegah browser. Klik tombol musik untuk memutar.');
          musicIcon.textContent = '🎵';
          musicLabel.textContent = 'Klik untuk Play';
          isPlaying = false;
          return;
        });
      }
    }
    isPlaying = !isPlaying;
  }

  musicBtn.addEventListener('click', toggleMusic);

  // =============================================
  //  CONFETTI ANIMATION
  // =============================================
  let confettiPieces = [];
  let confettiAnimating = false;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class ConfettiPiece {
    constructor() {
      this.x = Math.random() * confettiCanvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 3 + 2;
      this.speedX = Math.random() * 4 - 2;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 10 - 5;
      this.opacity = 1;
      this.color = this.randomColor();
      this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
      this.gravity = 0.05;
      this.wobble = Math.random() * 10;
      this.wobbleSpeed = Math.random() * 0.1 + 0.05;
    }

    randomColor() {
      const colors = [
        '#F5A9B8', '#FFD700', '#E8A87C', '#D4EDDA',
        '#E6D5F5', '#FF6B8A', '#FFB6C1', '#FFA07A',
        '#87CEEB', '#DDA0DD', '#F0E68C', '#98FB98',
        '#FF69B4', '#FF1493', '#FFD1DC'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;
      this.rotation += this.rotationSpeed;

      if (this.y > confettiCanvas.height + 20) {
        this.opacity -= 0.02;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function launchConfetti() {
    confettiPieces = [];
    
    // Create confetti pieces in waves
    const totalPieces = 150;
    for (let i = 0; i < totalPieces; i++) {
      setTimeout(() => {
        const piece = new ConfettiPiece();
        piece.y = -20 - Math.random() * 50;
        confettiPieces.push(piece);
      }, Math.random() * 1500);
    }

    if (!confettiAnimating) {
      confettiAnimating = true;
      animateConfetti();
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(piece => {
      piece.update();
      piece.draw();
    });

    // Remove dead pieces
    confettiPieces = confettiPieces.filter(p => p.opacity > 0);

    if (confettiPieces.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimating = false;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  btnConfetti.addEventListener('click', () => {
    launchConfetti();
    
    // Add a fun text change
    const originalText = btnConfetti.textContent;
    btnConfetti.textContent = '🥳 Happy Birthday!! 🥳';
    btnConfetti.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
      btnConfetti.textContent = originalText;
      btnConfetti.style.transform = '';
    }, 3000);
  });

  // =============================================
  //  IMAGE ERROR HANDLING (Placeholder)
  // =============================================
  document.querySelectorAll('.polaroid-img img').forEach(img => {
    img.addEventListener('error', function() {
      // If image fails to load, show a nice placeholder
      this.style.display = 'none';
      const parent = this.parentElement;
      if (!parent.querySelector('.img-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.classList.add('img-placeholder');
        placeholder.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #FFF0E5, #F0E6FF);
            color: #8B7B6B;
            font-size: 0.85rem;
            text-align: center;
            padding: 1rem;
          ">
            <span style="font-size: 2.5rem; margin-bottom: 0.5rem;">📷</span>
            <span>Taruh foto di sini</span>
          </div>
        `;
        placeholder.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
        parent.style.position = 'relative';
        parent.appendChild(placeholder);
      }
    });
  });

  // =============================================
  //  KEYBOARD NAVIGATION (Accessibility)
  // =============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      // Prevent scrolling with space
      if (e.target === document.body) {
        e.preventDefault();
        toggleMusic();
      }
    }
  });
});
