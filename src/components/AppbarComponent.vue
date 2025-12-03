<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentLocale = computed({
  get: () => locale.value,
  set: (value: string) => {
    locale.value = value
    localStorage.setItem('locale', value)
  }
})

const toggleLocale = () => {
  currentLocale.value = currentLocale.value === 'ru' ? 'en' : 'ru'
}

const localeLabel = computed(() => currentLocale.value.toUpperCase())
</script>

<template> 
  <v-app-bar color="white" density="compact">
    <object
      class="logo ml-12 mr-4"
      data="https://storage.yandexcloud.net/forlogo/logo.svg" 
    />
    <v-app-bar-title>{{ t('tasks.headerText') }}</v-app-bar-title>
    <v-spacer />
    <v-btn
      variant="tonal"
      color="primary"
      size="small"
      class="mr-4"
      @click="toggleLocale"
    >
      {{ localeLabel }}
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>
