<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AddTaskFormComponent from '@/components/AddTaskFormComponent.vue'
import FIltersSectionComponent from '@/components/FIltersSectionComponent.vue'
import TasksStatusComponent from '@/components/TasksStatusComponent.vue'
import TaskListComponent from '@/components/TaskListComponent.vue'
import TaskSectionToggleComponent from '@/components/TaskSectionToggleComponent.vue'
import { commonTasksTemplate, userTasksTemplate } from '@/utils/variables'
import { useDeletionTimers } from '@/composables/useDeletionTimers'
import { useTasks } from '@/composables/useTasks'
import type { ITask, activeSectionType } from '@/types/Types'
import { useI18n } from 'vue-i18n'
const {t} = useI18n()
const activeSection = ref<activeSectionType>('common')

const {
  tasks,
  currentFilter,
  newTaskTitle,
  filteredTasks,
  loadTasks,
  toggleTask,
  submitTask: submitCommonTask
} = useTasks({
  template: commonTasksTemplate,
  storageKey: 'commonTasks',
  owner: 'common'
})

const {
  tasks: userTasks,
  currentFilter: userFilter,
  newTaskTitle: newUserTaskTitle,
  filteredTasks: filteredUserTasks,
  loadTasks: loadUserTasks,
  toggleTask: toggleUserTask,
  submitTask: submitUserTask
} = useTasks({
  template: userTasksTemplate,
  storageKey: 'userTasks',
  owner: 'user'
})

const deletedTasks = ref<ITask[]>([])
const recordHistory = (task: ITask, action: ITask['history'][number]['action']) => {
  task.history.push({ action, timestamp: new Date() })
}

const {
  pending: pendingDeletions,
  timers: deletionTimers,
  startDeletion,
  cancelDeletion
} = useDeletionTimers(tasks, {
  onScheduled: task => recordHistory(task, 'deletion_scheduled'),
  onDeleted: task => {
    recordHistory(task, 'deleted')
    deletedTasks.value.push(task)
  },
  onCancel: task => recordHistory(task, 'deletion_cancelled')
})

const {
  pending: userPendingDeletions,
  timers: userDeletionTimers,
  startDeletion: startUserDeletion,
  cancelDeletion: cancelUserDeletion
} = useDeletionTimers(userTasks, {
  onScheduled: task => recordHistory(task, 'deletion_scheduled'),
  onDeleted: task => {
    recordHistory(task, 'deleted')
    deletedTasks.value.push(task)
  },
  onCancel: task => recordHistory(task, 'deletion_cancelled')
})

const restoreTask = (id: number) => {
  const index = deletedTasks.value.findIndex(task => task.id === id)
  if (index === -1) return
  const [task] = deletedTasks.value.splice(index, 1)
  if(task === undefined) return
  task.updatedAt = new Date()
  recordHistory(task, 'restored')
  if (task.owner === 'common') {
    tasks.value.push(task)
  } else {
    userTasks.value.push(task)
  }
}

onMounted(() => {
  loadTasks()
  loadUserTasks()
})
</script>
<template>
     <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="8">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <TaskSectionToggleComponent v-model="activeSection" />
                  <div v-if="activeSection === 'common'">
                    <h2 class="text-h5 mb-3">{{ t('tasks.commonTasksText') }}</h2>
                    <FIltersSectionComponent
                      :tasks="tasks"
                      v-model:currentFilter="currentFilter"
                    />

                    <AddTaskFormComponent
                      v-model="newTaskTitle"
                      @submit="submitCommonTask"
                    />

                    <TaskListComponent
                      :tasks="filteredTasks"
                      :pending-deletions="pendingDeletions"
                      :deletion-timers="deletionTimers"
                      @toggle="toggleTask"
                      @start-deletion="startDeletion"
                      @cancel-deletion="cancelDeletion"
                    />

                    <TasksStatusComponent :tasks="tasks" />
                  </div>

                  <div v-else>
                    <h2 class="text-h5 mb-3">{{t('tasks.userTasksText')}}</h2>
                    <FIltersSectionComponent
                      :tasks="userTasks"
                      v-model:currentFilter="userFilter"
                    />

                    <AddTaskFormComponent
                      v-model="newUserTaskTitle"
                      @submit="submitUserTask"
                    />

                    <TaskListComponent
                      :tasks="filteredUserTasks"
                      :pending-deletions="userPendingDeletions"
                      :deletion-timers="userDeletionTimers"
                      @toggle="toggleUserTask"
                      @start-deletion="startUserDeletion"
                      @cancel-deletion="cancelUserDeletion"
                    />

                    <TasksStatusComponent :tasks="userTasks" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="mt-6">
              <v-card-title class="d-flex align-center justify-space-between">
                <span>{{ t('tasks.deletedTasksText') }}</span>
                <v-chip size="small" color="primary" variant="tonal">{{ deletedTasks.length }}</v-chip>
              </v-card-title>
              <v-card-text>
                <div v-if="deletedTasks.length === 0" class="text-medium-emphasis">
                    {{ t('tasks.emptyDeletedTasksText') }}
                </div>
                <v-list v-else density="comfortable">
                  <v-list-item
                    v-for="task in deletedTasks"
                    :key="task.id"
                  >
                    <v-list-item-title>{{ task.title }}</v-list-item-title>
                    <v-list-item-subtitle class="d-flex align-center ga-2">
                      <v-chip size="x-small" color="secondary" variant="tonal">
                        {{ task.owner === 'common' ? t('tasks.commonTasksText') : t('tasks.userTasksText') }}
                      </v-chip>
                      <span class="text-caption text-medium-emphasis">
                        {{ task.history.find(history => history.action === 'deleted')?.timestamp?.toLocaleString('ru-RU') || '' }}
                      </span>
                    </v-list-item-subtitle>
                    <template #append>
                      <v-btn
                        icon
                        color="success"
                        variant="text"
                        @click="restoreTask(task.id)"
                      >
                        <v-icon>mdi-restore</v-icon>
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>
