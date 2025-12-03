<script setup lang="ts">
import type { ITask, IDeletionTimer } from '@/types/Types'
import { useI18n } from 'vue-i18n';
const {t} = useI18n();
 defineProps<{
  tasks: ITask[]
  pendingDeletions: Set<number>
  deletionTimers: Record<number, IDeletionTimer>
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'start-deletion', id: number): void
  (e: 'cancel-deletion', id: number): void
}>()

const formatDate = (date: Date | null) => {
  if (!date) return '—'
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const historyLabel = (action: ITask['history'][number]['action']) => {
  switch (action) {
    case 'created':
      return t('actions.created')
    case 'completed':
      return t('actions.completed')
    case 'uncompleted':
      return t('actions.uncompleted')
    case 'deleted':
      return t('actions.deteled')
    case 'restored':
      return t('actions.restored')
    case 'deletion_scheduled':
      return t('actions.deletionScheduled')
    case 'deletion_cancelled':
      return t('actions.deletionCanceled')
    default:
      return action
  }
}
</script>

<template>
  <v-expansion-panels multiple class="task-panels">
    <v-expansion-panel v-for="task in tasks" :key="task.id">
      <v-expansion-panel-title>
        <div class="task-title">
          <v-checkbox
            :model-value="task.completed"
            @update:model-value="emit('toggle', task.id)"
            @click.stop
            density="comfortable"
            class="mr-2"
          />
          <div>
            <div :class="{ 'text-decoration-line-through text-grey': task.completed }" class="font-weight-medium">
              {{ task.title }}
            </div>
            <div class="text-caption text-medium-emphasis">
              Создано: {{ formatDate(task.createdAt) }} | {{ t('statuses.updated') }} : {{ formatDate(task.updatedAt) }}
              <span v-if="task.completed">| {{ t('statuses.completed') }} : {{ formatDate(task.completedAt) }}</span>
            </div>
          </div>
        </div>
        <template #actions>
          <div v-if="pendingDeletions.has(task.id)" class="deletion-pending">
            <v-chip color="error" size="small" class="mr-2">
              {{ t('actions.deletionTimer') }} : {{ deletionTimers[task.id]?.timeLeft || 10 }}
            </v-chip>
            <v-btn 
              @click.stop="emit('cancel-deletion', task.id)"
              variant="text"
              color="warning"
              size="small"
            >
              {{ t('actions.cancel') }}
            </v-btn>
          </div>
          <v-btn 
            v-else
            icon 
            @click.stop="emit('start-deletion', task.id)"
            variant="text"
            color="error"
            size="small"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="history">
          <div class="text-subtitle-2 mb-2">{{ t('other.history') }}</div>
          <v-timeline density="compact" side="end">
            <v-timeline-item
              v-for="(entry, idx) in task.history"
              :key="idx"
              dot-color="primary"
              size="x-small"
            >
              <div class="text-body-2">{{ historyLabel(entry.action) }}</div>
              <div class="text-caption text-medium-emphasis">{{ formatDate(entry.timestamp) }}</div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.deletion-pending {
  display: flex;
  align-items: center;
}

.text-decoration-line-through {
  text-decoration: line-through;
}

.task-title {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.task-panels {
  background: transparent;
}
</style>
