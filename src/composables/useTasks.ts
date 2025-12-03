import { computed, ref, watch } from 'vue'
import type { ITask, TasksFilterTypes, IUseTasksOptions, ITaskHistoryEntry } from '@/types/Types'


const filterTasksByStatus = (list: ITask[], filter: TasksFilterTypes) => {
  switch (filter) {
    case 'active':
      return list.filter(_task => !_task.completed)
    case 'completed':
      return list.filter(_task => _task.completed)
    default:
      return list
  }
}

const serializeTasks = (list: ITask[]) => {
  return list.map(task => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    completedAt: task.completedAt ? task.completedAt.toISOString() : null,
    history: task.history.map(entry => ({
      ...entry,
      timestamp: entry.timestamp.toISOString()
    }))
  }))
}
const deserializeTasks = (list: ITask[]): ITask[] => {
  return list.map(task => ({
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    completedAt: task.completedAt ? new Date(task.completedAt) : null,
    history: task.history?.map((entry: ITaskHistoryEntry) => ({
      ...entry,
      timestamp: new Date(entry.timestamp)
    })) ?? []
  }))
}

const logAction = (task: ITask | undefined, action: ITask['history'][number]['action']) => {
  if (!task) return
  task.history = [...task.history, { action, timestamp: new Date() }]
}

const sanitizeInput = (value: string) => value.replace(/<[^>]*>?/gm, '').trim()

export const useTasks = ({ template, loadDelay = 200, storageKey, owner }: IUseTasksOptions) => {
  const tasks = ref<ITask[]>([])
  const currentFilter = ref<TasksFilterTypes>('all')
  const newTaskTitle = ref('')

  const filteredTasks = computed(() => filterTasksByStatus(tasks.value, currentFilter.value))

const restoreFromStorage = () => {
  if (!storageKey || typeof sessionStorage === 'undefined') return false
  const saved = sessionStorage.getItem(storageKey)
  if (!saved) return false
  try {
    const parsed = JSON.parse(saved)
    tasks.value = deserializeTasks(parsed)
    return true
  } catch (e) {
    console.error('failed', e)
    return false
  }
}

  const persistToStorage = () => {
    if (!storageKey || typeof sessionStorage === 'undefined') return
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(serializeTasks(tasks.value)))
    } catch (e) {
      console.error('failed', e)
    }
  }

const loadTasks = async () => {
  if (loadDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, loadDelay))
  }
  const restored = restoreFromStorage()
  if (!restored) {
    tasks.value = template.map(task => ({
      ...task,
      owner: task.owner ?? owner,
      history: task.history ?? [{ action: 'created', timestamp: task.createdAt }]
    }))
  }
}

  const toggleTask = (id: number) => {
    const task = tasks.value.find(_task => _task.id === id)
    if (!task) return
    task.completed = !task.completed
    task.updatedAt = new Date()
    task.completedAt = task.completed ? new Date() : null
    logAction(task, task.completed ? 'completed' : 'uncompleted')
  }

  const addTask = (title: string) => {
    const trimmedTitle = sanitizeInput(title)
    if (!trimmedTitle) return false

    const now = new Date()
    const newTask: ITask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
      owner,
      history: [
        { action: 'created', timestamp: now }
      ]
    }
    tasks.value.unshift(newTask)
    return true
  }

  const submitTask = () => {
    const isTaskAdded = addTask(newTaskTitle.value)
    if (isTaskAdded) newTaskTitle.value = ''
  }

  watch(tasks, persistToStorage, { deep: true })

  return {
    tasks,
    currentFilter,
    newTaskTitle,
    filteredTasks,
    loadTasks,
    toggleTask,
    addTask,
    submitTask
  }
}
