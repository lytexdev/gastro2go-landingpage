import { ref, onMounted, onUnmounted } from 'vue';

export default function useScrollAnimation() {
  // Animierte Elemente verfolgen
  const animatedElements = ref([]);
  
  // Überprüfen, welche Elemente im Viewport sind und sie animieren
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    
    animatedElements.value.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Wenn Element im Viewport ist
      if (position.top < windowHeight * 0.9) {
        element.classList.add('visible');
      }
    });
  };
  
  // Animationen initialisieren
  const initScrollAnimation = () => {
    // Alle Elemente mit der Klasse 'fade-in' abrufen
    animatedElements.value = document.querySelectorAll('.fade-in');
    
    // Initiale Position überprüfen (für Elemente, die bereits sichtbar sind)
    handleScroll();
    
    // Scroll-Event-Listener hinzufügen
    window.addEventListener('scroll', handleScroll);
  };
  
  // Event-Listener entfernen, wenn Komponente entfernt wird
  const cleanupScrollAnimation = () => {
    window.removeEventListener('scroll', handleScroll);
  };
  
  onMounted(() => {
    // Kurze Verzögerung, damit DOM vollständig gerendert wird
    setTimeout(initScrollAnimation, 100);
  });
  
  onUnmounted(() => {
    cleanupScrollAnimation();
  });
}
