<template>
    <div class="language-switcher">
      <button 
        @click="changeLanguage('en')" 
        :class="{ active: currentLocale === 'en' }"
        class="lang-btn"
      >
        🇺🇸 English
      </button>
      <button 
        @click="changeLanguage('km')" 
        :class="{ active: currentLocale === 'km' }"
        class="lang-btn"
      >
        🇰�� ខ្មែរ
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { locale } = useI18n()
  
  const currentLocale = computed(() => locale.value)
  
  const changeLanguage = (lang) => {
    locale.value = lang
    localStorage.setItem('locale', lang)
    
    // Update document direction for RTL support if needed
    document.documentElement.dir = lang === 'km' ? 'ltr' : 'ltr'
    
    // Update document language attribute
    document.documentElement.lang = lang
  }
  </script>
  
  <style scoped>
  .language-switcher {
    display: flex;
    gap: 8px;
  }
  
  .lang-btn {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .lang-btn:hover {
    background: #f5f5f5;
  }
  
  .lang-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
  </style>