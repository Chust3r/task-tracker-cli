import { describe, it, beforeEach, expect, vi } from 'vitest'
import { CommandLine } from '../../src/lib/command-line'
import minimist from 'minimist'

vi.mock('minimist')

describe('CommandLine', () => {
	let cli: CommandLine
	let handler: () => void

	beforeEach(() => {
		cli = new CommandLine()
		handler = vi.fn()
	})

	it('Should register and run a simple command', () => {
		cli.command('hello', handler)
		// @ts-ignore
		minimist.mockReturnValueOnce({ _: ['hello'] })
		cli.run()
		expect(handler).toHaveBeenCalledOnce()
	})

	it('Should pass parsed arguments to the handler', () => {
		cli.command('greet <name>', handler)
		// @ts-ignore
		minimist.mockReturnValueOnce({ _: ['greet'], name: 'Alice' })
		cli.run()
		expect(handler).toHaveBeenCalledWith({ name: 'Alice' })
	})

	it('Should handle multiple arguments correctly', () => {
		cli.command('greet <greeting> <name>', handler)
		// @ts-ignore
		minimist.mockReturnValueOnce({
			_: ['greet'],
			greeting: 'Hello',
			name: 'Alice',
		})
		cli.run()
		expect(handler).toHaveBeenCalledWith({ greeting: 'Hello', name: 'Alice' })
	})
})
