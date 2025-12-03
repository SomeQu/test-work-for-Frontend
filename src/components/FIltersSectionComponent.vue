<script setup lang="ts">
import { computed } from 'vue'
import type { ITask, TasksFilterTypes } from '@/types/Types'
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
const props = defineProps<{
  tasks: ITask[]
  currentFilter: TasksFilterTypes
}>()

const emit = defineEmits<{
  (e: 'update:currentFilter', value: TasksFilterTypes): void
}>()

const totalTasks = computed(() => props.tasks.length)
const activeTasksCount = computed(() => props.tasks.filter(_task => !_task.completed).length)
const completedTasksCount = computed(() => props.tasks.filter(_task => _task.completed).length)

const setFilter = (value: TasksFilterTypes) => {
  emit('update:currentFilter', value)
}
</script>

<template>  
  <div class="filter-section mb-4">
    <v-btn 
      @click="setFilter('all')"
      :class="{ 'bg-primary': currentFilter === 'all' }"
      variant="tonal"
      class="mr-2"
    >
      {{ t('tasksSummary.allTasks') }} ({{ totalTasks }})
    </v-btn>
    <v-btn 
      @click="setFilter('active')"
      :class="{ 'bg-primary': currentFilter === 'active' }"
      variant="tonal"
      class="mr-2"
    >
      {{ t('tasksSummary.activeTasks') }} ({{ activeTasksCount }})
    </v-btn>
    <v-btn 
      @click="setFilter('completed')"
      :class="{ 'bg-primary': currentFilter === 'completed' }"
      variant="tonal"
      class="mr-2"
    >
      {{ t('tasksSummary.') }} ({{ completedTasksCount }})
    </v-btn>
  </div>
</template>

<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-section button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
