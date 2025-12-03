import type { ITask } from "@/types/Types";

export const commonTasksTemplate: ITask[] = [
    {
      id: 1,
      title: 'Изучить Vue 3 Composition API',
      completed: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      completedAt: new Date('2024-01-20'),
      owner: 'common',
      history: [
        { action: 'created', timestamp: new Date('2024-01-15') },
        { action: 'completed', timestamp: new Date('2024-01-20') }
      ]
    },
    {
      id: 2,
      title: 'Написать тестовое задание',
      completed: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      completedAt: null,
      owner: 'common',
      history: [
        { action: 'created', timestamp: new Date('2024-02-01') }
      ]
    },
    {
      id: 3,
      title: 'Рефакторинг legacy кода',
      completed: false,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      completedAt: null,
      owner: 'common',
      history: [
        { action: 'created', timestamp: new Date('2024-02-10') }
      ]
    },
    {
      id: 4,
      title: 'Изучить Pinia и лучшие практики',
      completed: true,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-30'),
      completedAt: new Date('2024-01-30'),
      owner: 'common',
      history: [
        { action: 'created', timestamp: new Date('2024-01-25') },
        { action: 'completed', timestamp: new Date('2024-01-30') }
      ]
    }
  ]

  export const userTasksTemplate:ITask[]= [
    {
      id: 101,
      title: 'Подготовить отчет',
      completed: true,
      createdAt: new Date('2024-02-01T10:00:00'),
      updatedAt: new Date('2024-02-05T15:30:00'),
      completedAt: new Date('2024-02-05T15:30:00'),
      owner: 'user',
      history: [
        { action: 'created', timestamp: new Date('2024-02-01T10:00:00') },
        { action: 'completed', timestamp: new Date('2024-02-05T15:30:00') }
      ]
    },
    {
      id: 102,
      title: 'Создать презентацию',
      completed: false,
      createdAt: new Date('2024-02-10T09:15:00'),
      updatedAt: new Date('2024-02-10T09:15:00'),
      completedAt: null,
      owner: 'user',
      history: [
        { action: 'created', timestamp: new Date('2024-02-10T09:15:00') }
      ]
    },
    {
      id: 103,
      title: 'Провести митинг',
      completed: false,
      createdAt: new Date('2024-02-12T11:00:00'),
      updatedAt: new Date('2024-02-12T11:00:00'),
      completedAt: null,
      owner: 'user',
      history: [
        { action: 'created', timestamp: new Date('2024-02-12T11:00:00') }
      ]
    },
    {
      id: 104,
      title: 'Код ревью',
      completed: true,
      createdAt: new Date('2024-02-08T14:20:00'),
      updatedAt: new Date('2024-02-09T16:45:00'),
      completedAt: new Date('2024-02-09T16:45:00'),
      owner: 'user',
      history: [
        { action: 'created', timestamp: new Date('2024-02-08T14:20:00') },
        { action: 'completed', timestamp: new Date('2024-02-09T16:45:00') }
      ]
    }
  ]
