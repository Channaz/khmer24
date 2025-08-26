# Internationalization (i18n) Guide

This guide explains how to use Vue I18n in your components to make your application multilingual.

## Setup

The i18n is already configured in your application with English (en) and Khmer (km) languages.

## How to Use in Vue Components

### 1. Import and Setup

```vue
<script setup>
import { useI18n } from "vue-i18n";

const { t, locale, availableLocales } = useI18n();
</script>
```

### 2. Basic Usage in Template

```vue
<template>
    <div>
        <!-- Simple translation -->
        <h1>{{ t("common.welcome") }}</h1>

        <!-- Button with translation -->
        <button>{{ t("common.submit") }}</button>

        <!-- Form labels -->
        <label>{{ t("forms.email") }}</label>
    </div>
</template>
```

### 3. Dynamic Translations

```vue
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// In JavaScript
const message = t("messages.required");
const buttonText = t("common.save");

// With parameters (if needed)
// const welcomeMessage = t('common.welcomeUser', { name: userName });
</script>
```

### 4. Changing Language

```vue
<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Change language
const changeLanguage = (lang) => {
    locale.value = lang;
    localStorage.setItem("locale", lang);
};

// Available in template
// <button @click="changeLanguage('km')">ខ្មែរ</button>
// <button @click="changeLanguage('en')">English</button>
</script>
```

### 5. Computed Properties with i18n

```vue
<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const pageTitle = computed(() => t("navigation.home"));
const submitButtonText = computed(() => t("common.submit"));
</script>
```

### 6. Form Validation with i18n

```vue
<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const validationErrors = reactive({
    email: null,
    password: null,
});

const validateForm = () => {
    if (!email.value) {
        validationErrors.email = t("messages.required");
    }
    if (!password.value) {
        validationErrors.password = t("messages.required");
    }
};
</script>
```

### 7. Available Translation Keys

#### Common

-   `t('common.welcome')` - Welcome
-   `t('common.login')` - Login
-   `t('common.register')` - Register
-   `t('common.logout')` - Logout
-   `t('common.submit')` - Submit
-   `t('common.cancel')` - Cancel
-   `t('common.save')` - Save
-   `t('common.edit')` - Edit
-   `t('common.delete')` - Delete

#### Navigation

-   `t('navigation.home')` - Home
-   `t('navigation.about')` - About
-   `t('navigation.contact')` - Contact
-   `t('navigation.profile')` - Profile
-   `t('navigation.settings')` - Settings

#### Forms

-   `t('forms.email')` - Email
-   `t('forms.password')` - Password
-   `t('forms.confirmPassword')` - Confirm Password
-   `t('forms.phone')` - Phone Number
-   `t('forms.address')` - Address

#### Messages

-   `t('messages.required')` - This field is required
-   `t('messages.invalidEmail')` - Please enter a valid email
-   `t('messages.passwordMismatch')` - Passwords do not match
-   `t('messages.loginSuccess')` - Login successful
-   `t('messages.loginError')` - Login failed

## Language Switching Component

You can create a language switcher component:

```vue
<template>
    <div class="language-switcher">
        <button
            v-for="lang in availableLocales"
            :key="lang"
            @click="changeLanguage(lang)"
            :class="{ active: locale === lang }"
        >
            {{ lang === "en" ? "English" : "ខ្មែរ" }}
        </button>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale, availableLocales } = useI18n();

const changeLanguage = (lang) => {
    locale.value = lang;
    localStorage.setItem("locale", lang);
};
</script>
```

## Tips

1. **Always use translation keys** instead of hardcoded text
2. **Group related translations** in the locale files (forms, messages, common, etc.)
3. **Use consistent naming** for your translation keys
4. **Test both languages** to ensure proper display
5. **Consider text length** - Khmer text might be longer/shorter than English
6. **Use computed properties** for dynamic translations that depend on reactive data

## Adding New Translations

To add new translations, edit the locale files:

-   `resources/js/locales/en.js` for English
-   `resources/js/locales/km.js` for Khmer

Make sure to add the same key in both files!
