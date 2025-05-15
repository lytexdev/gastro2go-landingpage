import { defineNuxtPlugin } from 'nuxt/app'
import useMotionSystem from '~/composables/useMotionSystem'

/**
 * Global motion and animation plugin for Gastro2Go
 * 
 * This plugin registers all animations, transitions, and interactive
 * effects site-wide to ensure consistent behavior and performance
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Initialize the motion system on client side only
    const motionSystem = useMotionSystem()

    // Add global directive for animations
    nuxtApp.vueApp.directive('animate', {
      mounted(el, binding) {
        // Extract animation options from binding
        const animation = binding.value?.animation || binding.arg || 'fadeInUp'
        const delay = binding.value?.delay ? parseFloat(binding.value.delay) / 1000 : 0
        const duration = binding.value?.duration || undefined
        const iterationCount = binding.value?.iterationCount || undefined
        
        // Apply animation style with custom properties
        el.classList.add(`animation-${animation}`)
        el.style.animationDelay = `${delay}s`
        
        if (duration) {
          el.style.animationDuration = typeof duration === 'number' 
            ? `${duration}ms` 
            : duration
        }
        
        if (iterationCount) {
          el.style.animationIterationCount = iterationCount
        }
        
        // Add starting class
        el.classList.add('animate-ready')
        
        // Trigger animation after a small delay for better performance
        setTimeout(() => {
          el.classList.add('animate-active')
        }, 10)
      }
    })
    
    // Add data-aos attribute support for easier animation
    nuxtApp.hook('app:mounted', () => {
      // Wait for DOM to be ready
      setTimeout(() => {
        initAosElements()
        addAnimationStyles()
      }, 100)
    })
    
    // Handle page transitions
    nuxtApp.hook('page:start', () => {
      // Will run when navigation starts
      document.body.classList.add('page-transitioning')
    })
    
    nuxtApp.hook('page:finish', () => {
      // Will run when navigation is complete
      document.body.classList.remove('page-transitioning')
      
      // Re-initialize animations for new page
      setTimeout(() => {
        initAosElements()
      }, 200)
    })
    
    // Initialize AOS-like animations (Animate On Scroll)
    const initAosElements = () => {
      const elements = document.querySelectorAll('[data-aos]')
      
      if (elements.length === 0) return
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element is in view
        threshold: [0.1, 0.5, 0.75],
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Get animation properties
            const el = entry.target
            const animation = el.getAttribute('data-aos') || 'fade-up'
            const delay = parseFloat(el.getAttribute('data-aos-delay') || '0')
            const duration = el.getAttribute('data-aos-duration')
            const once = el.getAttribute('data-aos-once') !== 'false'
            
            // Trigger animation
            setTimeout(() => {
              el.classList.add('aos-animate')
            }, delay)
            
            // Stop observing if animation should only happen once
            if (once) {
              observer.unobserve(el)
            }
          } else {
            // If element is no longer in view, remove animation class if not "once"
            const el = entry.target
            const once = el.getAttribute('data-aos-once') !== 'false'
            
            if (!once) {
              el.classList.remove('aos-animate')
            }
          }
        })
      }, observerOptions)
      
      // Observe all elements with data-aos
      elements.forEach(el => {
        // Add base class
        el.classList.add('aos-init')
        // Set base styles from attributes
        const duration = el.getAttribute('data-aos-duration')
        if (duration) {
          el.style.transitionDuration = `${duration}ms`
        }
        
        // Start observing
        observer.observe(el)
      })
    }
    
    // Add global styles for animations
    const addAnimationStyles = () => {
      if (document.getElementById('global-animation-styles')) return
      
      const style = document.createElement('style')
      style.id = 'global-animation-styles'
      style.innerHTML = `
        /* Base animation properties */
        [data-aos] {
          opacity: 0;
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          transition-duration: 800ms;
          pointer-events: none;
        }
        
        [data-aos].aos-animate {
          opacity: 1;
          transform: translateZ(0);
          pointer-events: auto;
        }
        
        /* Animation variations */
        [data-aos="fade-up"] {
          transform: translate3d(0, 30px, 0);
        }
        
        [data-aos="fade-down"] {
          transform: translate3d(0, -30px, 0);
        }
        
        [data-aos="fade-left"] {
          transform: translate3d(-30px, 0, 0);
        }
        
        [data-aos="fade-right"] {
          transform: translate3d(30px, 0, 0);
        }
        
        [data-aos="zoom-in"] {
          transform: scale3d(0.9, 0.9, 1);
        }
        
        [data-aos="zoom-out"] {
          transform: scale3d(1.1, 1.1, 1);
        }
        
        /* Custom v-animate directive styles */
        [class*="animation-"] {
          opacity: 0;
          animation-duration: 800ms;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: both;
        }
        
        .animate-active.animation-fadeInUp {
          animation-name: fadeInUp;
        }
        
        .animate-active.animation-fadeInDown {
          animation-name: fadeInDown;
        }
        
        .animate-active.animation-fadeInLeft {
          animation-name: fadeInLeft;
        }
        
        .animate-active.animation-fadeInRight {
          animation-name: fadeInRight;
        }
        
        .animate-active.animation-zoomIn {
          animation-name: zoomIn;
        }
        
        .animate-active.animation-zoomOut {
          animation-name: zoomOut;
        }
        
        .animate-active.animation-pulse {
          animation-name: pulse;
        }
        
        .animate-active.animation-float {
          animation-name: float;
        }
        
        .animate-active.animation-shake {
          animation-name: shake;
        }
        
        /* Page transitions */
        .page-transitioning .page-enter-active,
        .page-transitioning .page-leave-active {
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .page-transitioning .page-enter-from,
        .page-transitioning .page-leave-to {
          opacity: 0;
          transform: translateY(20px);
        }
        
        /* Animation keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-40px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(40px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale3d(0.85, 0.85, 1);
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        
        @keyframes zoomOut {
          from {
            opacity: 0;
            transform: scale3d(1.15, 1.15, 1);
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale3d(1, 1, 1);
          }
          50% {
            transform: scale3d(1.05, 1.05, 1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          [data-aos] {
            transition-duration: 600ms;
          }
          
          [data-aos="fade-up"], 
          [data-aos="fade-down"], 
          [data-aos="fade-left"], 
          [data-aos="fade-right"] {
            transform: translate3d(0, 20px, 0);
          }
        }
        
        /* Accessibility - respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          [data-aos], 
          [class*="animation-"],
          .page-enter-active,
          .page-leave-active {
            transition: none !important;
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `
      
      document.head.appendChild(style)
    }
    
    // Set up magnetic effect for interactive elements
    const setupMagneticEffect = () => {
      const magneticElements = document.querySelectorAll('.magnetic')
      
      magneticElements.forEach(element => {
        const power = parseFloat((element as HTMLElement).dataset.power || '20')
        
        element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          ;(element as HTMLElement).style.transform = `translate(${x / power}px, ${y / power}px)`
        })
        
        element.addEventListener('mouseleave', () => {
          ;(element as HTMLElement).style.transform = 'translate(0, 0)'
          ;(element as HTMLElement).style.transition = 'transform 0.5s ease'
        })
        
        element.addEventListener('mouseenter', () => {
          ;(element as HTMLElement).style.transition = 'transform 0.1s ease'
        })
      })
    }
    
    // Set up scroll animations for sections
    const setupScrollAnimations = () => {
      // Elements to animate when scrolled into view
      const sectionsToAnimate = document.querySelectorAll('section > .container')
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            
            // Stagger child animations
            const childrenToAnimate = entry.target.querySelectorAll('.stagger-item')
            childrenToAnimate.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('in-view')
              }, 100 * index)
            })
            
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)
      
      sectionsToAnimate.forEach(section => {
        observer.observe(section)
      })
    }
    
    // Run setup on client-side
    nuxtApp.hook('app:mounted', () => {
      setTimeout(() => {
        setupMagneticEffect()
        setupScrollAnimations()
      }, 300)
    })
    
    // Re-initialize on page changes
    nuxtApp.hook('page:finish', () => {
      setTimeout(() => {
        setupMagneticEffect()
        setupScrollAnimations()
      }, 300)
    })
    
    // Apply smooth scrolling to anchor links
    const initSmoothScrolling = () => {
      document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault()
          
          // Get the target element
          const targetId = (this as HTMLAnchorElement).getAttribute('href')
          if (!targetId) return
          
          const targetElement = document.querySelector(targetId)
          
          if (targetElement) {
            // Get header height for offset
            const header = document.querySelector('header')
            const headerOffset = header ? header.offsetHeight : 0
            
            // Calculate the target position
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = window.pageYOffset + elementPosition - headerOffset - 20
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            
            // Scroll smoothly or instantly based on preference
            window.scrollTo({
              top: offsetPosition,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            })
            
            // Update URL
            history.pushState(null, '', targetId)
          }
        })
      })
    }
    
    // Initialize smooth scrolling
    nuxtApp.hook('app:mounted', () => {
      initSmoothScrolling()
    })
    
    // Return any utilities that should be available throughout the app
    return {
      provide: {
        // Exposes animation utilities to the app
        motion: {
          animate: (element: HTMLElement, animation: string, options: any = {}) => {
            motionSystem.applyAnimation(element, animation, options)
          },
          animateElement: (element: HTMLElement, options: any = {}) => {
            motionSystem.animateElement(element, options)
          },
          animateStaggerGroup: (group: HTMLElement) => {
            motionSystem.animateStaggerGroup(group)
          }
        }
      }
    }
  }
})
