<template>
    <div class="home">
      <h1>{{ $t('common.welcome') }}</h1>
      <p>{{ $t('navigation.home') }}</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>{{ $t('forms.email') }}</label>
          <input type="email" v-model="email" required />
          <span v-if="errors.email" class="error">
            {{ $t('messages.required') }}
          </span>
        </div>
        
        <button type="submit">{{ $t('common.submit') }}</button>
      </form>
      
      <LanguageSwitcher />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import LanguageSwitcher from '../components/LanguageSwitcher.vue'
  
  const { t } = useI18n()
  const email = ref('')
  const errors = ref({})
  
  const handleSubmit = () => {
    // Form handling logic
    console.log(t('messages.loginSuccess'))
  }
  </script>