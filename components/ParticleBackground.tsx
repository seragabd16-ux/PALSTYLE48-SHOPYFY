
import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useStore();
  const isDarkModeRef = useRef(isDarkMode);

  // Sync ref for animation loop
  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax influence
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05; 
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5; // Very fine dust
        // "Rising Ash" physics - moving up slowly
        this.speedY = Math.random() * 0.15 + 0.05; 
        this.opacity = Math.random() * 0.5;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
      }

      update() {
        // Rise upwards
        this.y -= this.speedY;

        // Wrap around bottom if goes off top
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }

        // Breathing opacity
        this.opacity += this.fadeSpeed;
        if (this.opacity > 0.6 || this.opacity < 0.1) {
            this.fadeSpeed = -this.fadeSpeed;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Apply Mouse Parallax offset
        const drawX = this.x - mouseX * (this.size * 0.5); 
        const drawY = this.y - mouseY * (this.size * 0.5);

        // Theme-aware coloring
        // Dark Mode: White Ash (255,255,255)
        // Light Mode: Obsidian Dust (20,20,20)
        const color = isDarkModeRef.current ? '255, 255, 255' : '20, 20, 20';
        
        // Lower opacity for subtlety
        ctx.fillStyle = `rgba(${color}, ${Math.max(0, this.opacity * 0.3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Calculate density based on screen area
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 20000); 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
    />
  );
};
