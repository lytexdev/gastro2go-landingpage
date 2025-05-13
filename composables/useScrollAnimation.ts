import { onMounted, onUnmounted } from 'vue';

const useScrollAnimation = () => {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    // Kleine Verzögerung, damit die Seite vollständig geladen ist
    setTimeout(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optional: Observer stoppen, wenn Animation einmal ausgeführt wurde
            // observer?.unobserve(entry.target);
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, options);

      // Beobachte alle Elemente mit der Klasse animate-on-scroll
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => {
        observer?.observe(el);
      });
    }, 100);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
};

export default useScrollAnimation; 