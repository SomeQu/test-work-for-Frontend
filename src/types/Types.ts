export interface ITask {
    id: number
    title: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    owner: activeSectionType
    history: ITaskHistoryEntry[]
  }
export type TasksFilterTypes = 'all' | 'active' | 'completed'

export interface IDeletionTimer {
    timerId: number
    timeLeft: number
  }

export type activeSectionType = 'user' | 'common'

export interface ITaskHistoryEntry {
  action: taskHistoryType
  timestamp: Date
  note?: string
}

export interface IUseTasksOptions {
    template: ITask[]
    loadDelay?: number
    storageKey: string
    owner: activeSectionType
  }

export type taskHistoryType = 'created' | 'completed' | 'uncompleted' | 'deleted' | 'restored' | 'deletion_scheduled' | 'deletion_cancelled'