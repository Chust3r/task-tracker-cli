import { db } from '~lib/db'

export const remove = ({ id }: { id?: number }) => {
	if (!id) {
		console.log('Error: ID is required.')
		return
	}

	db.delete(id)
}
