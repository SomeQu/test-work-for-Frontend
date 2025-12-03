export const ru = {
    tasks:{
        headerText:'Управление задачами',
        commonTasksText: 'Общие таски',
        userTasksText: 'Таски пользователя',
        deletedTasksText: 'Завершенные таски',
        emptyDeletedTasksText:'Нет завершенных задач',   
    },
    actions:{
        add:'Добавить',
        cancel:'Отмена',
        newTask:'Новая задача',
        created:'Создана',
        completed:'Отмечена выполненной',
        uncompleted:'Снята отметка выполнено',
        deleted:'Завершена',
        restored:'Восстановлена',
        deletionScheduled:'Запланировано завершение',
        deletionCancelled:'Отмена завершения',
        deletionTimer: 'Завершение через'
    },
    placeholders:{
        newTask:'Введите текст задачи'
    },
    statuses:{
        completed:'Завершено',
        updated:'Обновлено',
        deleted:'Завершено',
    },
    other:{
        history:'История',
    },
    tasksSummary:{
        allTasks:'Всего задач',
        completedTasks:'Завершенных',
        activeTasks:'Активных',
        percentTasks:'Процент завершения'
    }
} as const
