// composables/useAnimations.js
import { ref, onMounted, onUnmounted } from 'vue'

export default function useAnimations() {
  // Track all elements that need animation
  const animatedElements = ref([])
  const parallaxElements = ref([])
  const staggerElements = ref([])
  const countElements = ref([])
  
  // Intersection Observer for general animations
  let animationObserver = null
  
  // Animation presets - can be used anywhere in the app
  const animationPresets = {
    fadeIn: 'opacity-0 translate-y-[30px] transition-all duration-700 ease-out',
    fadeInLeft: 'opacity-0 -translate-x-[30px] transition-all duration-700 ease-out',
    fadeInRight: 'opacity-0 translate-x-[30px] transition-all duration-700 ease-out',
    fadeInUp: 'opacity-0 translate-y-[30px] transition-all duration-700 ease-out',
    fadeInDown: 'opacity-0 -translate-y-[30px] transition-all duration-700 ease-out',
    zoomIn: 'opacity-0 scale-95 transition-all duration-700 ease-out',
    zoomOut: 'opacity-0 scale-105 transition-all duration-700 ease-out',
    rotate: 'opacity-0 rotate-6 transition-all duration-700 ease-out',
    flip: 'opacity-0 rotateY-90 perspective-[800px] transition-all duration-1000 ease-out',
    reveal: 'opacity-0 clip-path-[inset(0_100%_0_0)] transition-all duration-1000 ease-out',
  }
  
  // For scroll-triggered animations
  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animate-in class to trigger CSS animations
        entry.target.classList.add('animate-in')
        
        // Get delay attribute if exists
        const delay = entry.target.dataset.delay || 0
        if (delay && delay > 0) {
          setTimeout(() => {
            entry.target.style.transitionDelay = '0ms' // Reset delay after animation
          }, delay * 1000 + 1000) // Add 1s for animation completion
        }
        
        // Optional: unobserve element after animation is triggered
        // observer.unobserve(entry.target)
      }
    })
  }
  
  // Parallax effect on scroll
  const handleParallax = () => {
    const scrollY = window.scrollY
    
    parallaxElements.value.forEach(element => {
      const speed = element.dataset.speed || 0.1
      const direction = element.dataset.direction || 'up'
      const limit = element.dataset.limit || 100
      
      let yPos = 0
      
      if (direction === 'up') {
        yPos = -(scrollY * speed)
        if (yPos < -limit) yPos = -limit
      } else {
        yPos = (scrollY * speed)
        if (yPos > limit) yPos = limit
      }
      
      // Apply transform based on scroll position
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    })
  }
  
  // Implement number counter animation
  const animateCounters = () => {
    countElements.value.forEach(element => {
      const target = parseInt(element.dataset.target)
      const duration = parseInt(element.dataset.duration || 2000)
      const delay = parseInt(element.dataset.delay || 0)
      const prefix = element.dataset.prefix || ''
      const suffix = element.dataset.suffix || ''
      
      let startTime = null
      let currentNumber = 0
      
      setTimeout(() => {
        const countAnimation = (timestamp) => {
          if (!startTime) startTime = timestamp
          const progress = timestamp - startTime
          
          // Calculate the current number based on progress
          if (progress < duration) {
            currentNumber = Math.floor((progress / duration) * target)
            element.textContent = `${prefix}${currentNumber}${suffix}`
            requestAnimationFrame(countAnimation)
          } else {
            element.textContent = `${prefix}${target}${suffix}`
          }
        }
        
        requestAnimationFrame(countAnimation)
      }, delay)
    })
  }
  
  // Staggered animation for groups of elements
  const setupStaggeredAnimations = () => {
    staggerElements.value.forEach(group => {
      const children = Array.from(group.children)
      const baseDelay = parseFloat(group.dataset.baseDelay || 0.1)
      
      children.forEach((child, index) => {
        child.style.transitionDelay = `${baseDelay * index}s`
        child.classList.add('stagger-item')
      })
    })
  }
  
  // Text split animation (splits text into letters or words for animated reveal)
  const initTextSplitAnimations = () => {
    const textElements = document.querySelectorAll('.text-split')
    
    textElements.forEach(element => {
      const text = element.textContent
      const splitBy = element.dataset.splitBy || 'letter'
      const type = element.dataset.animationType || 'fadeIn'
      element.textContent = ''
      
      if (splitBy === 'letter') {
        text.split('').forEach((letter, index) => {
          const span = document.createElement('span')
          span.textContent = letter === ' ' ? '\u00A0' : letter
          span.style.opacity = '0'
          span.style.display = 'inline-block'
          span.style.transform = type.includes('Up') ? 'translateY(20px)' : 
                                type.includes('Down') ? 'translateY(-20px)' : 
                                type.includes('Left') ? 'translateX(20px)' : 
                                type.includes('Right') ? 'translateX(-20px)' : 'scale(0.8)'
          span.style.transition = `all 0.5s ease ${0.03 * index}s`
          element.appendChild(span)
        })
      } else {
        text.split(' ').forEach((word, index) => {
          const span = document.createElement('span')
          span.textContent = word + '\u00A0'
          span.style.opacity = '0'
          span.style.display = 'inline-block'
          span.style.transform = type.includes('Up') ? 'translateY(20px)' : 
                                type.includes('Down') ? 'translateY(-20px)' : 
                                type.includes('Left') ? 'translateX(20px)' : 
                                type.includes('Right') ? 'translateX(-20px)' : 'scale(0.8)'
          span.style.transition = `all 0.5s ease ${0.05 * index}s`
          element.appendChild(span)
        })
      }
      
      // When the element is in view, animate each letter/word
      animationObserver.observe(element)
    })
  }
  
  // Animate text splits when they come into view
  const animateTextSplit = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Array.from(entry.target.children).forEach(span => {
          span.style.opacity = '1'
          span.style.transform = 'translateY(0) translateX(0) scale(1)'
        })
        animationObserver.unobserve(entry.target)
      }
    })
  }
  
  // Magnetic elements (subtle pull toward mouse)
  const initMagneticElements = () => {
    const elements = document.querySelectorAll('.magnetic')
    
    elements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const power = element.dataset.power || 15
        
        element.style.transform = `translate(${x / power}px, ${y / power}px)`
      })
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)'
        element.style.transition = 'transform 0.5s ease'
      })
    })
  }
  
  // Initialize all animations
  const initAnimations = () => {
    // Set up Intersection Observer
    animationObserver = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    })
    
    // Find all elements with the animate-on-scroll class
    animatedElements.value = document.querySelectorAll('.animate-on-scroll')
    parallaxElements.value = document.querySelectorAll('.parallax')
    staggerElements.value = document.querySelectorAll('.stagger-group')
    countElements.value = document.querySelectorAll('.count-up')
    
    // Observe animated elements
    animatedElements.value.forEach(el => {
      animationObserver.observe(el)
    })
    
    // Initialize text split animations
    initTextSplitAnimations()
    
    // Set up staggered animations
    setupStaggeredAnimations()
    
    // Set up magnetic elements
    initMagneticElements()
    
    // Add scroll event listener for parallax
    if (parallaxElements.value.length > 0) {
      window.addEventListener('scroll', handleParallax)
    }
    
    // Initial animations for elements already in view
    handleIntersect(
      Array.from(animatedElements.value).map(el => ({
        isIntersecting: isElementInViewport(el),
        target: el
      }))
    )
    
    // Initialize counters
    if (countElements.value.length > 0) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters()
            counterObserver.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      
      countElements.value.forEach(el => {
        counterObserver.observe(el)
      })
    }
  }
  
  // Helper function to check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    )
  }
  
  // Clean up all observers and event listeners
  const cleanupAnimations = () => {
    if (animationObserver) {
      animationObserver.disconnect()
    }
    
    window.removeEventListener('scroll', handleParallax)
  }
  
  // Initialize on component mount
  onMounted(() => {
    // Give DOM time to render
    setTimeout(initAnimations, 100)
  })
  
  // Clean up on component unmount
  onUnmounted(() => {
    cleanupAnimations()
  })
  
  return {
    animationPresets,
    initAnimations,
    cleanupAnimations
  }
}
