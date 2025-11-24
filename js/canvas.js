/**
 * Canvas Animation Module
 * Handles the network particle animation on the hero section
 */

/**
 * Particle class for network animation
 */
class Particle {
  constructor(canvasWidth, canvasHeight, moveSpeed) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * moveSpeed;
    this.vy = (Math.random() - 0.5) * moveSpeed;
    this.size = Math.random() * 3 + 2;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
  }
}

class NetworkCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas element with id "${canvasId}" not found`);
      return;
    }

    this.ctx = this.canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.particles = [];

    // Configuration
    this.particleCount = 40;
    this.connectionDistance = 250;
    this.moveSpeed = 0.2;

    this.init();
    this.setupEventListeners();
  }

  /**
   * Resize canvas to match window dimensions
   */
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    // Reinitialize particles on resize to maintain distribution
    this.initParticles();
  }

  /**
   * Initialize particles array
   */
  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(
        new Particle(this.width, this.height, this.moveSpeed)
      );
    }
  }

  /**
   * Main animation loop
   */
  animate() {
    if (!this.canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw particles
    this.particles.forEach(p => {
      p.update(this.width, this.height);
      p.draw(this.ctx);
    });

    // Draw connections between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${
            1 - distance / this.connectionDistance
          })`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    window.addEventListener("resize", () => this.resize());
  }

  /**
   * Initialize the canvas animation
   */
  init() {
    this.resize();
    this.initParticles();
    this.animate();
  }
}

// Initialize canvas when DOM is ready
let networkCanvas;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    networkCanvas = new NetworkCanvas("network-canvas");
  });
} else {
  networkCanvas = new NetworkCanvas("network-canvas");
}
