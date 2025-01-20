import { JSONDatabase } from '~lib/json-db'
import { Task } from '~types'

export const db = new JSONDatabase<Task>('tasks')
