<template>
    <div 
      class="particle-system"
      :class="{ 'interactive': interactive }"
      ref="particleContainer"
      :style="{
        '--particle-color': color,
        '--particle-size': `${size}px`,
        '--particle-opacity': opacity
      }"
    >
      <canvas ref="canvas" class="particle-canvas"></canvas>
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  
  // Props with TypeScript types
  const props = defineProps({
    color: {
      type: String,
      default: 'rgba(76, 175, 80, 0.6)' // Default to Gastro2Go green with transparency
    },
    density: {
      type: Number,
      default: 30 // Number of particles
    },
    size: {
      type: Number,
      default: 3 // Particle size in pixels
    },
    speed: {
      type: Number,
      default: 0.5 // Animation speed
    },
    interactive: {
      type: Boolean,
      default: true // Particles react to mouse movement
    },
    opacity: {
      type: Number,
      default: 0.7 // Particle opacity
    },
    connectParticles: {
      type: Boolean,
      default: true // Draw lines between particles
    },
    maxDistance: {
      type: Number,
      default: 140 // Maximum distance for particle connections
    }
  });
  
  // Refs
  const canvas = ref<HTMLCanvasElement | null>(null);
  const particleContainer = ref<HTMLElement | null>(null);
  const animationFrame = ref<number | null>(null);
  
  // Utility types
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
  }
  
  // State variables
  let particles: Particle[] = [];
  let ctx: CanvasRenderingContext2D | null = null;
  let width = 0;
  let height = 0;
  let mouseX = -1000;
  let mouseY = -1000;
  let devicePixelRatio = 1;
  
  // Initialize the particle system
  const initParticles = () => {
    if (!canvas.value || !particleContainer.value) return;
    
    // Get canvas context
    ctx = canvas.value.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    setupCanvas();
    
    // Create particles
    createParticles();
    
    // Start animation
    startAnimation();
    
    // Add event listeners for interaction
    if (props.interactive) {
      particleContainer.value.addEventListener('mousemove', handleMouseMove);
      particleContainer.value.addEventListener('mouseleave', handleMouseLeave);
      particleContainer.value.addEventListener('touchmove', handleTouchMove);
      particleContainer.value.addEventListener('touchend', handleMouseLeave);
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
  };
  
  // Setup canvas with correct dimensions and DPR
  const setupCanvas = () => {
    if (!canvas.value || !particleContainer.value || !ctx) return;
    
    // Get container dimensions
    const rect = particleContainer.value.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    
    // Handle high-DPI displays
    devicePixelRatio = window.devicePixelRatio || 1;
    
    // Set canvas size with pixel ratio for sharpness
    canvas.value.width = width * devicePixelRatio;
    canvas.value.height = height * devicePixelRatio;
    canvas.value.style.width = `${width}px`;
    canvas.value.style.height = `${height}px`;
    
    // Scale context for consistent rendering
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };
  
  // Create particles based on density
  const createParticles = () => {
    particles = [];
    
    // Calculate actual number of particles based on area
    const area = width * height / 1000;
    const actualDensity = Math.max(5, Math.min(props.density, 100)) * (area / 800);
    
    for (let i = 0; i < actualDensity; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * props.speed,
        vy: (Math.random() - 0.5) * props.speed,
        size: Math.random() * (props.size * 0.8) + props.size * 0.5,
        color: props.color,
        opacity: Math.random() * 0.5 + props.opacity * 0.5
      });
    }
  };
  
  // Animation loop
  const animate = () => {
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    updateParticles();
    
    // Request next frame
    animationFrame.value = requestAnimationFrame(animate);
  };
  
  // Update particle positions and draw them
  const updateParticles = () => {
    if (!ctx) return;
    
    particles.forEach((p, index) => {
      // Move particles
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      // Interact with mouse if close enough
      if (props.interactive) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx += force * Math.cos(angle) * 0.02;
          p.vy += force * Math.sin(angle) * 0.02;
        }
      }
      
      // Limit particle velocity
      const maxSpeed = props.speed * 2;
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (currentSpeed > maxSpeed) {
        p.vx = (p.vx / currentSpeed) * maxSpeed;
        p.vy = (p.vy / currentSpeed) * maxSpeed;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = p.color.replace(/[\d\.]+\)$/g, `${p.opacity})`);
      ctx.fill();
      
      // Connect particles if enabled
      if (props.connectParticles) {
        connectToNearbyParticles(p, index);
      }
    });
  };
  
  // Connect particles with lines based on distance
  const connectToNearbyParticles = (p: Particle, index: number) => {
    if (!ctx) return;
    
    for (let i = index + 1; i < particles.length; i++) {
      const p2 = particles[i];
      
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < props.maxDistance) {
        // Opacity based on distance
        const opacity = (1 - dist / props.maxDistance) * 0.5 * props.opacity;
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = props.color.replace(/[\d\.]+\)$/g, `${opacity})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  };
  
  // Start animation loop
  const startAnimation = () => {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value);
    }
    animationFrame.value = requestAnimationFrame(animate);
  };
  
  // Mouse event handlers
  const handleMouseMove = (e: MouseEvent) => {
    if (!particleContainer.value) return;
    const rect = particleContainer.value.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  };
  
  const handleMouseLeave = () => {
    mouseX = -1000;
    mouseY = -1000;
  };
  
  // Touch event handlers
  const handleTouchMove = (e: TouchEvent) => {
    if (!particleContainer.value || !e.touches[0]) return;
    const rect = particleContainer.value.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
    
    // Prevent scrolling when interacting with particles
    e.preventDefault();
  };
  
  // Window resize handler
  const handleResize = () => {
    setupCanvas();
    createParticles();
  };
  
  // Watch for prop changes to update particles
  watch(() => props.density, () => {
    createParticles();
  });
  
  watch(() => props.color, () => {
    particles.forEach(p => {
      p.color = props.color;
    });
  });
  
  watch(() => props.speed, () => {
    particles.forEach(p => {
      p.vx = (p.vx / Math.abs(p.vx) || 0) * (Math.random() * props.speed * 0.5 + props.speed * 0.1);
      p.vy = (p.vy / Math.abs(p.vy) || 0) * (Math.random() * props.speed * 0.5 + props.speed * 0.1);
    });
  });
  
  // Lifecycle hooks
  onMounted(() => {
    initParticles();
  });
  
  onBeforeUnmount(() => {
    // Clean up
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value);
    }
    
    if (particleContainer.value && props.interactive) {
      particleContainer.value.removeEventListener('mousemove', handleMouseMove);
      particleContainer.value.removeEventListener('mouseleave', handleMouseLeave);
      particleContainer.value.removeEventListener('touchmove', handleTouchMove);
      particleContainer.value.removeEventListener('touchend', handleMouseLeave);
    }
    
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style lang="scss" scoped>
  .particle-system {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    
    .particle-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
    }
    
    &.interactive {
      cursor: default;
    }
  }
  
  // For reduced motion preferences
  @media (prefers-reduced-motion: reduce) {
    .particle-system {
      .particle-canvas {
        opacity: 0.3;
      }
    }
  }
  </style>
  