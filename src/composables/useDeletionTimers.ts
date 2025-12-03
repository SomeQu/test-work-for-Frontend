import { ref } from 'vue'
import type { Ref } from 'vue'
import type { ITask, IDeletionTimer } from '@/types/Types'

export const useDeletionTimers = (
  tasks: Ref<ITask[]>,
  options?: {
    onScheduled?: (task: ITask) => void
    onDeleted?: (task: ITask) => void
    onCancel?: (task: ITask) => void
  }
) => {
  const pending = ref<Set<number>>(new Set())
  const timers = ref<Record<number, IDeletionTimer>>({})

  const startDeletion = (id: number) => {
    const task = tasks.value.find(_task => _task.id === id)
    if (!task) return

    pending.value.add(id)
    options?.onScheduled?.(task)

    const timerId = window.setInterval(() => {
      const timer = timers.value[id]
      if (!timer) return

      timer.timeLeft -= 1

      if (timer.timeLeft <= 0) {
        const removedTask = tasks.value.find(_task => _task.id === id)
        tasks.value = tasks.value.filter(_task => _task.id !== id)
        pending.value.delete(id)

        clearInterval(timer.timerId)
        delete timers.value[id]
        if (removedTask) {
          options?.onDeleted?.(removedTask)
        }
      }
    }, 1000)

    timers.value[id] = {
      timerId,
      timeLeft: 10
    }
  }

  const cancelDeletion = (id: number) => {
    pending.value.delete(id)

    const timer = timers.value[id]
    if (!timer) return

    clearInterval(timer.timerId)
    delete timers.value[id]

    const task = tasks.value.find(_task => _task.id === id)
    if (task) {
      options?.onCancel?.(task)
    }
  }

  return {
    pending,
    timers,
    startDeletion,
    cancelDeletion
  }
}
