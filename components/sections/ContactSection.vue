<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="animate-on-scroll fade-up">{{ $t('contact.title') }}</h2>
        <p class="section-subtitle animate-on-scroll fade-up delay-1">{{ $t('contact.subtitle') }}</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-form-wrapper animate-on-scroll fade-left">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <BaseInput
                  v-model="formData.name"
                  :label="$t('contact.form.name')"
                  :error="errors.name"
                  required
                />
              </div>
              
              <div class="form-group">
                <BaseInput
                  v-model="formData.restaurant"
                  :label="$t('contact.form.restaurant')"
                  :error="errors.restaurant"
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <BaseInput
                  v-model="formData.email"
                  type="email"
                  :label="$t('contact.form.email')"
                  :error="errors.email"
                  required
                />
              </div>
              
              <div class="form-group">
                <BaseInput
                  v-model="formData.phone"
                  type="tel"
                  :label="$t('contact.form.phone')"
                  :error="errors.phone"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">{{ $t('contact.form.message') }}</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-textarea"
                :class="{ 'is-invalid': errors.message }"
                rows="5"
                required
              ></textarea>
              <div v-if="errors.message" class="invalid-feedback">{{ errors.message }}</div>
            </div>
            
            <div class="form-group">
              <div class="form-check">
                <input
                  id="consent"
                  v-model="formData.consent"
                  type="checkbox"
                  class="form-check-input"
                  :class="{ 'is-invalid': errors.consent }"
                  required
                />
                <label for="consent" class="form-check-label">
                  {{ $t('contact.form.consent') }}
                </label>
              </div>
              <div v-if="errors.consent" class="invalid-feedback">{{ errors.consent }}</div>
            </div>
            
            <div class="form-action">
              <BaseButton 
                type="submit" 
                variant="primary" 
                size="lg"
                block
                :disabled="submitting"
              >
                <template v-if="submitting">
                  <svg xmlns="http://www.w3.org/2000/svg" class="spinner" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3a9 9 0 1 0 9 9"></path>
                  </svg>
                </template>
                <span v-else>{{ $t('contact.form.submit') }}</span>
              </BaseButton>
            </div>
            
            <div v-if="formSubmitted" class="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l5 5l10 -10"></path>
              </svg>
              <p>{{ $t('contact.form.success') }}</p>
            </div>
          </form>
        </div>
        
        <div class="contact-info animate-on-scroll fade-right">
          <div class="info-card">
            <div class="card-header">
              <h3>LYTEX MEDIA GmbH</h3>
            </div>
            
            <div class="card-content">
              <div class="info-item">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                </div>
                <div class="info-text">
                  <p class="label">Adresse</p>
                  <p>Musterstraße 123, 10115 Berlin</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                    <path d="M3 7l9 6l9 -6"></path>
                  </svg>
                </div>
                <div class="info-text">
                  <p class="label">E-Mail</p>
                  <p><a href="mailto:info@gastro2go.io">info@gastro2go.io</a></p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                  </svg>
                </div>
                <div class="info-text">
                  <p class="label">Telefon</p>
                  <p><a href="tel:+4930123456789">+49 30 123 456 789</a></p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                </div>
                <div class="info-text">
                  <p class="label">Geschäftszeiten</p>
                  <p>Mo - Fr: 9:00 - 17:00 Uhr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';

const formData = reactive({
  name: '',
  restaurant: '',
  email: '',
  phone: '',
  message: '',
  consent: false
});

const errors = reactive({
  name: '',
  restaurant: '',
  email: '',
  phone: '',
  message: '',
  consent: ''
});

const submitting = ref(false);
const formSubmitted = ref(false);

// Scroll Animation
onMounted(() => {
  // Kleine Verzögerung, damit die Seite vollständig geladen ist
  setTimeout(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Beobachte alle Elemente mit der Klasse animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      observer.observe(el);
    });

    // Cleanup beim Unmount
    onUnmounted(() => {
      observer.disconnect();
    });
  }, 100); // 100ms Verzögerung
});

const validateForm = () => {
  let isValid = true;
  
  if (!formData.name) {
    errors.name = 'Bitte geben Sie Ihren Namen ein';
    isValid = false;
  }
  
  if (!formData.restaurant) {
    errors.restaurant = 'Bitte geben Sie den Namen Ihres Restaurants ein';
    isValid = false;
  }
  
  if (!formData.email) {
    errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    isValid = false;
  }
  
  if (!formData.message) {
    errors.message = 'Bitte geben Sie Ihre Nachricht ein';
    isValid = false;
  }
  
  if (!formData.consent) {
    errors.consent = 'Bitte stimmen Sie der Datenschutzerklärung zu';
    isValid = false;
  }
  
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  submitting.value = true;
  
  try {
    // Hier würde normalerweise der API-Call stattfinden
    await new Promise(resolve => setTimeout(resolve, 1000));
    formSubmitted.value = true;
    Object.keys(formData).forEach(key => formData[key] = '');
  } catch (error) {
    console.error('Fehler beim Absenden des Formulars:', error);
  } finally {
    submitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.contact-section {
  padding: var(--section-spacing) 0;
  background-color: var(--color-background-alt);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 1rem;
  }
  
  .section-subtitle {
    font-size: 1.125rem;
    color: var(--color-text-light);
    max-width: 600px;
    margin: 0 auto;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.contact-form-wrapper {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
  }
  
  &.is-invalid {
    border-color: var(--color-error);
    
    &:focus {
      box-shadow: 0 0 0 2px rgba(var(--color-error-rgb), 0.1);
    }
  }
}

.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &-input {
    width: 1rem;
    height: 1rem;
    
    &:checked {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
  
  &-label {
    font-size: 0.875rem;
    color: var(--color-text-light);
  }
}

.form-action {
  margin-top: 2rem;
}

.success-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--color-success);
  color: white;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.contact-info {
  .info-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }
  
  .card-header {
    padding: 1.5rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .info-icon {
    width: 2rem;
    height: 2rem;
    color: var(--color-primary);
  }
  
  .info-text {
    flex: 1;
    
    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 0.25rem;
    }
    
    p {
      margin: 0;
      color: var(--color-text);
    }
    
    a {
      color: var(--color-primary);
      text-decoration: none;
      
      &:hover {
        color: var(--color-primary-dark);
        text-decoration: underline;
      }
    }
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
