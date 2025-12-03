<script setup lang="ts">   
import {  computed } from 'vue'
import type { ITask } from '@/types/Types';
import { useI18n } from 'vue-i18n';
const {t} = useI18n();
const props = defineProps<{
    tasks: ITask[]
}>()

const activeTasks = computed(() => {
    return props.tasks.filter(t => !t.completed)
})

const completedTasks = computed(() => {
    return props.tasks.filter(t => t.completed)
})

const completionPercentage = computed(() => {
    return (completedTasks.value.length / props.tasks.length * 100).toFixed(1)
})

const totalTasks = computed(() => {
    return props.tasks.length
})
const activeTasksCount = computed(() => {
    return activeTasks.value.length
})
const completedTasksCount = computed(() => {
    return completedTasks.value.length
})

</script>
<template>
       <v-card class="mt-6">
                    <v-card-text>
                      <p>{{ t('tasksSummary.allTasks') }} {{ totalTasks }}</p>
                      <p>{{ t('tasksSummary.activeTasks') }} {{ activeTasksCount }}</p>
                      <p>{{ t('tasksSummary.completedTasks') }} {{ completedTasksCount }}</p>
                      <p>{{ t('tasksSummary.percentTasks') }}
                        {{ completionPercentage }}%
                      </p>
                    </v-card-text>
                  </v-card>
</template>

<style scoped></style>