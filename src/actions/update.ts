import { db } from '~lib/db'

export const update = ({
	id,
	description,
}: {
	id?: number
	description?: string
}) => {
	if (!id || !description) {
		console.log('Error: ID and description are required.')
		return
	}

	const isUpdated = db.update(id, { description })

	if (!isUpdated) {
		console.log('Error: Task not found.')
		return
	}
}
