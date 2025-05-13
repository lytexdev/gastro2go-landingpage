<template>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="section-header text-center">
        <h2 class="fade-in">{{ $t('pricing.title') }}</h2>
        <p class="section-subtitle fade-in">{{ $t('pricing.subtitle') }}</p>
      </div>
      
      <div class="pricing-wrapper">
        <div class="pricing-card fade-in">
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
        
        <div class="pricing-compare fade-in">
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
                    v-model="monthlyRevenue" 
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
                    <div class="result-label">Lieferando</div>
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
import { ref, computed } from 'vue';

const { t } = useI18n();

const features = computed(() => t('pricing.tier.features'));
const monthlyRevenue = ref(5000);
const fixedPrice = 49;

const lieferandoPrice = computed(() => {
  // Calculate Lieferando price (13-30% commission)
  return Math.round((monthlyRevenue.value * 0.18)); // Using average 18%
});

const savings = computed(() => {
  return lieferandoPrice.value - fixedPrice;
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

useScrollAnimation();
</script>

<style lang="scss" scoped>
.pricing-section {
  @include section;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($primary, 0.03) 0%, rgba($white, 0) 70%);
    z-index: -1;
  }
  
  .section-header {
    max-width: 700px;
    margin: 0 auto $spacing-10;
    
    h2 {
      color: $dark;
      margin-bottom: $spacing-4;
    }
    
    .section-subtitle {
      font-size: $font-size-lg;
      color: $gray-dark;
    }
  }
  
  .pricing-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-8;
    max-width: 1000px;
    margin: 0 auto;
    
    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 1fr;
      align-items: stretch;
    }
  }
  
  .pricing-card {
    background-color: $white;
    border-radius: $border-radius-xl;
    overflow: hidden;
    box-shadow: $shadow-lg;
    display: flex;
    flex-direction: column;
    transition: $transition-base;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: $shadow-xl;
    }
    
    .pricing-header {
      padding: $spacing-6;
      background: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%);
      color: $white;
      text-align: center;
      
      .pricing-name {
        font-size: $font-size-xl;
        font-weight: $font-weight-bold;
        margin-bottom: $spacing-3;
      }
      
      .pricing-price {
        font-family: $font-family-heading;
        margin-bottom: $spacing-4;
        display: flex;
        align-items: baseline;
        justify-content: center;
        
        .price-currency {
          font-size: $font-size-xl;
          font-weight: $font-weight-medium;
          margin-right: $spacing-1;
        }
        
        .price-amount {
          font-size: $font-size-4xl;
          font-weight: $font-weight-bold;
          line-height: 1;
        }
        
        .price-period {
          font-size: $font-size-base;
          opacity: 0.8;
          margin-left: $spacing-1;
        }
      }
      
      .pricing-description {
        font-size: $font-size-base;
        opacity: 0.9;
        margin-bottom: 0;
      }
    }
    
    .pricing-features {
      padding: $spacing-6;
      flex: 1;
      
      .features-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: $spacing-4;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .feature-icon {
          color: $primary;
          margin-right: $spacing-3;
          flex-shrink: 0;
        }
        
        span {
          color: $gray-dark;
        }
      }
    }
    
    .pricing-action {
      padding: $spacing-6;
      border-top: 1px solid $gray-lighter;
    }
  }
  
  .pricing-compare {
    background-color: $white;
    border-radius: $border-radius-xl;
    overflow: hidden;
    box-shadow: $shadow-lg;
    transition: $transition-base;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: $shadow-xl;
    }
    
    .compare-content {
      padding: $spacing-6;
      height: 100%;
      display: flex;
      flex-direction: column;
      
      @media (min-width: $breakpoint-sm) {
        flex-direction: row;
        align-items: flex-start;
        gap: $spacing-6;
      }
    }
    
    .compare-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      margin: 0 auto $spacing-4;
      color: $primary;
      background-color: rgba($primary, 0.1);
      border-radius: 50%;
      flex-shrink: 0;
      
      @media (min-width: $breakpoint-sm) {
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
        margin-bottom: $spacing-5;
        text-align: center;
        color: $dark;
        
        @media (min-width: $breakpoint-sm) {
          text-align: left;
        }
      }
    }
    
    .savings-calculator {
      background-color: rgba($gray-lighter, 0.5);
      border-radius: $border-radius-lg;
      padding: $spacing-5;
      
      .calculator-label {
        font-weight: $font-weight-semibold;
        margin-bottom: $spacing-4;
        text-align: center;
      }
      
      .calculator-slider {
        margin-bottom: $spacing-5;
        
        .slider {
          width: 100%;
          height: 8px;
          background: rgba($gray-light, 0.3);
          outline: none;
          border-radius: $border-radius-pill;
          appearance: none;
          
          &::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: $primary;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba($primary, 0.3);
          }
          
          &::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: $primary;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba($primary, 0.3);
            border: none;
          }
        }
        
        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: $font-size-sm;
          color: $gray;
          margin-top: $spacing-2;
        }
      }
      
      .calculator-results {
        .result-item {
          display: flex;
          justify-content: space-between;
          padding: $spacing-3 0;
          border-bottom: 1px solid rgba($gray-light, 0.3);
          
          &.savings {
            font-weight: $font-weight-bold;
            color: $primary;
            border-bottom: none;
            margin-top: $spacing-2;
          }
          
          .result-label {
            flex: 1;
          }
          
          .result-value {
            font-weight: $font-weight-semibold;
          }
        }
      }
    }
  }
  
  .fade-in {
    &:nth-child(1) {
      transition-delay: 0.1s;
    }
    
    &:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    &:nth-child(3) {
      transition-delay: 0.3s;
    }
  }
}
</style>
