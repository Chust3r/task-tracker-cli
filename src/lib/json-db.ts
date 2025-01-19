import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import type { DBRecord } from '~types'
import { nanoid } from 'nanoid'

export class JSONDatabase<T extends DBRecord> {
	private path: string
	private data: Map<string, T> = new Map()
	private idCounter: number = 1

	constructor(private name: string) {
		this.path = join(process.cwd(), `${this.name}.json`)

		if (!existsSync(this.path)) {
			this.createFile()
		} else {
			this.loadData()
		}
	}

	private createFile(): void {
		const initialData: Map<string, T> = new Map()
		writeFileSync(
			this.path,
			JSON.stringify(Array.from(initialData.entries()), null, 2),
			'utf-8'
		)
	}

	private loadData(): void {
		const data = this.readData()
		this.data = new Map(data)
		this.idCounter =
			this.data.size > 0
				? Math.max(
						...Array.from(this.data.values()).map((record) => record.id)
				  ) + 1
				: 1
	}

	private readData(): [string, T][] {
		const data = readFileSync(this.path, 'utf-8')
		return JSON.parse(data) as [string, T][]
	}

	private writeData(): void {
		const serializedData = JSON.stringify(
			Array.from(this.data.entries()),
			null,
			2
		)
		writeFileSync(this.path, serializedData, 'utf-8')
	}

	private mapDataForDisplay(): (T & { id: number })[] {
		let index = 1
		return Array.from(this.data.values()).map((record) => {
			return { ...record, id: index++ }
		})
	}

	select(query?: Partial<T>): (T & { id: number })[] {
		const data = this.mapDataForDisplay()

		if (!query) {
			return data
		}

		return data.filter((record) =>
			Object.keys(query).every(
				(key) => (record as any)[key] === (query as any)[key]
			)
		)
	}

	insert(newRecord: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): void {
		const newId = this.idCounter++
		const createdAt = new Date().toISOString()
		const updatedAt = createdAt

		const newData: T = {
			...newRecord,
			id: newId,
			createdAt,
			updatedAt,
		} as T

		const newUuid = nanoid()
		this.data.set(newUuid, newData)

		this.writeData()
	}

	update(id: number, updatedRecord: Partial<T>): void {
		const entry = Array.from(this.data.entries()).find(
			([_, record]) => record.id === id
		)

		if (entry) {
			const [uuid, record] = entry
			const updatedAt = new Date().toISOString()
			const updatedData = {
				...record,
				...updatedRecord,
				updatedAt,
			}

			this.data.set(uuid, updatedData)
			this.writeData()
		}
	}

	delete(id: number): void {
		const entry = Array.from(this.data.entries()).find(
			([_, record]) => record.id === id
		)

		if (entry) {
			const [uuid] = entry
			this.data.delete(uuid)

			this.writeData()
		}
	}
}
