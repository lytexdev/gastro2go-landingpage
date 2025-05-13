<template>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="section-header text-center">
        <h2>{{ $t('pricing.title') }}</h2>
        <p class="section-subtitle">{{ $t('pricing.subtitle') }}</p>
      </div>
      
      <div class="pricing-wrapper">
        <div class="pricing-card">
          <div class="pricing-header">
            <h3 class="pricing-name">{{ $t('pricing.tier.name') }}</h3>
            <div class="pricing-price">
              <span class="price-currency">€</span>
              <span class="price-amount">{{ $t('pricing.tier.price') }}</span>
              <span class="price-period">{{ $t('pricing.tier.period') }}</span>
            </div>
            <p class="pricing-description">{{ $t('pricing.tier.description') }}</p>
          </div>
          
          <div class="pricing-features">
            <ul class="features-list">
              <li v-for="(feature, index) in features" :key="index" class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="feature-icon" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <div class="pricing-action">
            <BaseButton 
              variant="primary" 
              size="lg"
              block
              @click="scrollToContact"
            >
              {{ $t('pricing.tier.cta') }}
            </BaseButton>
          </div>
        </div>
        
        <div class="pricing-compare">
          <div class="compare-content">
            <div class="compare-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 7l5 5l-5 5"></path>
                <path d="M13 17l6 0"></path>
              </svg>
            </div>
            <div class="compare-text">
              <h4>{{ $t('pricing.compare') }}</h4>
              
              <div class="savings-calculator">
                <div class="calculator-label">{{ calculatorLabel }}</div>
                <div class="calculator-slider">
                  <input 
                    type="range" 
                    :value="monthlyRevenue"
                    @input="updateRevenue"
                    min="1000" 
                    max="10000" 
                    step="500" 
                    class="slider"
                  >
                  <div class="slider-labels">
                    <span>1.000€</span>
                    <span>10.000€</span>
                  </div>
                </div>
                <div class="calculator-results">
                  <div class="result-item">
                    <div class="result-label">Gastro2Go.io</div>
                    <div class="result-value">{{ fixedPrice }}€/Monat</div>
                  </div>
                  <div class="result-item">
                    <div class="result-label">Andere Dienste</div>
                    <div class="result-value">{{ lieferandoPrice }}€/Monat</div>
                  </div>
                  <div class="result-item savings">
                    <div class="result-label">Deine Ersparnis</div>
                    <div class="result-value">{{ savings }}€/Monat</div>
                  </div>
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
import { ref, computed, onMounted } from 'vue';
import BaseButton from '../ui/BaseButton.vue';

const { t } = useI18n();

const features = computed(() => t('pricing.tier.features'));
const monthlyRevenue = ref(5000);
const fixedPrice = 49;

const updateRevenue = (event) => {
  const newValue = parseInt(event.target.value);
  if (!isNaN(newValue)) {
    monthlyRevenue.value = newValue;
  }
};

const lieferandoPrice = computed(() => {
  return Math.round((monthlyRevenue.value * 0.18));
});

const savings = computed(() => {
  return Math.max(0, lieferandoPrice.value - fixedPrice);
});

const calculatorLabel = computed(() => {
  return `Monatlicher Umsatz: ${monthlyRevenue.value.toLocaleString('de-DE')}€`;
});

const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  console.log('PricingSection mounted');
});
</script>

<style lang="scss" scoped>
.pricing-section {
  padding: var(--section-spacing) 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.03) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: -1;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  max-width: 700px;
  margin: 0 auto 3rem;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 1rem;
  }
  
  .section-subtitle {
    font-size: 1.125rem;
    color: var(--color-text-light);
  }
}

.pricing-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }
}

.pricing-card {
  background-color: white;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
}

.pricing-header {
  padding: 2rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  text-align: center;
  
  .pricing-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .pricing-price {
    font-family: var(--font-family-heading);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: baseline;
    justify-content: center;
    
    .price-currency {
      font-size: 1.5rem;
      font-weight: 500;
      margin-right: 0.25rem;
    }
    
    .price-amount {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1;
    }
    
    .price-period {
      font-size: 1rem;
      opacity: 0.8;
      margin-left: 0.25rem;
    }
  }
  
  .pricing-description {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 0;
  }
}

.pricing-features {
  padding: 2rem;
  flex: 1;
  
  .features-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .feature-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .feature-icon {
      color: var(--color-primary);
      margin-right: 0.75rem;
      flex-shrink: 0;
    }
    
    span {
      color: var(--color-text);
    }
  }
}

.pricing-action {
  padding: 2rem;
  border-top: 1px solid var(--color-border);
}

.pricing-compare {
  background-color: white;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
}

.compare-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.compare-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  color: var(--color-primary);
  background-color: rgba(var(--color-primary-rgb), 0.1);
  border-radius: 50%;
  flex-shrink: 0;
  
  @media (min-width: 640px) {
    margin: 0;
  }
  
  svg {
    width: 32px;
    height: 32px;
  }
}

.compare-text {
  flex: 1;
  
  h4 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--color-text);
    
    @media (min-width: 640px) {
      text-align: left;
    }
  }
}

.savings-calculator {
  background-color: rgba(var(--color-gray-100-rgb), 0.5);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  
  .calculator-label {
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .calculator-slider {
    margin-bottom: 1.5rem;
    
    .slider {
      width: 100%;
      height: 8px;
      background: rgba(var(--color-gray-300-rgb), 0.3);
      outline: none;
      border-radius: var(--border-radius-pill);
      appearance: none;
      
      &::-webkit-slider-thumb {
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(var(--color-primary-rgb), 0.3);
      }
      
      &::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(var(--color-primary-rgb), 0.3);
        border: none;
      }
    }
    
    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: var(--color-gray-500);
      margin-top: 0.5rem;
    }
  }
  
  .calculator-results {
    .result-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(var(--color-gray-300-rgb), 0.3);
      
      &.savings {
        font-weight: 700;
        color: var(--color-primary);
        border-bottom: none;
        margin-top: 0.5rem;
      }
      
      .result-label {
        flex: 1;
      }
      
      .result-value {
        font-weight: 600;
      }
    }
  }
}
</style>
