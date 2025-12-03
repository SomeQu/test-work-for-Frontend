<script setup lang="ts">
import { computed } from 'vue'
import type { activeSectionType } from '@/types/Types';
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const props = defineProps<{
  modelValue: activeSectionType
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: activeSectionType): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: _value => emit('update:modelValue', _value)
})
</script>

<template>
  <v-btn-toggle
    v-model="value"
    mandatory
    class="mb-6"
    color="primary"
    divided
  >
    <v-btn value="common">{{ t('tasks.commonTasksText') }}</v-btn>
    <v-btn value="user">{{ t('tasks.userTasksText')  }}</v-btn>
  </v-btn-toggle>
</template>

<style scoped></style>
