export enum TaskStatus {
	'TODO' = 'todo',
	'IN_PROGRESS' = 'in_progress',
	'DONE' = 'done',
}

export interface Task {
	id: number
	description: string
	status: TaskStatus
	createdAt: string
	updatedAt: string
}
