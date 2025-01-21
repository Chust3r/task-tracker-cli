import { describe, it, expect, vi } from 'vitest'
import { MatchCase } from '../../src/lib/match-case'

describe('MatchCase', () => {
	it('Should register and call the correct case handler', () => {
		const eventMatcher = new MatchCase<{
			'user:login': (username: string) => void
		}>()

		const handler = vi.fn()

		eventMatcher.add('user:login', handler)

		eventMatcher.match('user:login', 'Alice')

		expect(handler).toHaveBeenCalledWith('Alice')
	})

	it('Should call the default handler when no case matches', () => {
		const eventMatcher = new MatchCase()

		const defaultHandler = vi.fn()
		eventMatcher.default(defaultHandler)

		eventMatcher.match('unknown:event')

		expect(defaultHandler).toHaveBeenCalledOnce()
	})

	it('Should throw an error when no handler is found and no default is set', () => {
		const eventMatcher = new MatchCase()

		expect(() => eventMatcher.match('unknown:event')).toThrow(
			'No case found for key: unknown:event'
		)
	})
})
