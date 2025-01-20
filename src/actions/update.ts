import { db } from '~lib/db'

export const update = async ({
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

	db.update(id, { description })
}
