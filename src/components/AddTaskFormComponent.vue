<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const title = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<template>
  <v-form @submit.prevent="emit('submit')" class="mb-6">
    <v-text-field
      v-model="title"
      :label="t('actions.newTask')"
      :rules="[value => !!value || t('placeholders.newTask')]"
      validate-on="submit"
      variant="outlined"
      density="comfortable"
    />
    <v-btn type="submit" color="primary" class="mt-2">{{ t('actions.add') }}</v-btn>
  </v-form>
</template>

<style scoped></style>
