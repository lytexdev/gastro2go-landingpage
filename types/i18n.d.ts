// Type definitions for i18n module
declare module '#app' {
    interface NuxtApp {
      $i18n: {
        locale: Ref<string>;
        locales: Ref<Array<{ code: string; name: string; file?: string; iso?: string }>>;
        setLocale: (locale: string) => Promise<void>;
        t: (key: string, values?: Record<string, any>) => string;
        $on: (event: string, listener: (newLocale: string) => void) => void;
        $off: (event: string, listener?: (newLocale: string) => void) => void;
      }
    }
  }
  
  // Extend Vue global types to include directives
  import { DirectiveBinding } from 'vue';
  
  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $i18n: NuxtApp['$i18n'];
    }
  
    interface ComponentCustomDirectives {
      'i18n-seo': DirectiveBinding<{
        title?: string;
        description?: string;
        keywords?: string;
      }>;
    }
  }
  
  export {}
