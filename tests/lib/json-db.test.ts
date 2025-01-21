import { describe, it, beforeEach, afterEach, expect } from 'vitest'
import { JSONDatabase } from '../../src/lib/json-db'
import { unlinkSync } from 'node:fs'

interface TestRecord {
	id: number
	name: string
	createdAt: string
	updatedAt: string
}

describe('JSONDatabase', () => {
	let db: JSONDatabase<TestRecord>

	beforeEach(() => {
		db = new JSONDatabase<TestRecord>('test-database')
	})

	afterEach(() => {
		try {
			unlinkSync(`${process.cwd()}/test-database.json`)
		} catch (error) {}
	})

	it('Should create a new JSON file when instantiated', () => {
		expect(() => new JSONDatabase<TestRecord>('test-database')).not.toThrow()
	})

	it('Should insert a new record', () => {
		const record = db.insert({ name: 'Test Record' })
		expect(record).toBeDefined()
		expect(record.id).toBe(1)
		expect(record.name).toBe('Test Record')
		expect(record.createdAt).toBeDefined()
	})

	it('Should select records without a query', () => {
		db.insert({ name: 'Record 1' })
		db.insert({ name: 'Record 2' })

		const records = db.select()
		expect(records.length).toBe(2)
	})

	it('Should select records matching a query', () => {
		db.insert({ name: 'Record 1' })
		db.insert({ name: 'Record 2' })

		const records = db.select({ name: 'Record 2' })
		expect(records.length).toBe(1)
		expect(records[0].name).toBe('Record 2')
	})

	it('Should update a record by ID', () => {
		const record = db.insert({ name: 'Initial Name' })
		const updated = db.update(record.id, { name: 'Updated Name' })

		expect(updated).toBe(true)
		const updatedRecord = db.select({ id: record.id })[0]
		expect(updatedRecord.name).toBe('Updated Name')
	})

	it('Should not update a record if ID is invalid', () => {
		const updated = db.update(999, { name: 'Updated Name' })
		expect(updated).toBe(false)
	})

	it('Should delete a record by ID', () => {
		const record = db.insert({ name: 'To Delete' })
		const deleted = db.delete(record.id)

		expect(deleted).toBe(true)
		const records = db.select()
		expect(records.length).toBe(0)
	})

	it('Should not delete a record if ID is invalid', () => {
		const deleted = db.delete(999)
		expect(deleted).toBe(false)
	})
})
