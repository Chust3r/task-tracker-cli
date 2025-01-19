export type CaseHandler<Args extends any[], R> = (...args: Args) => R

export class MatchCase<Key, Args extends any[], R> {
	private cases: Map<Key, CaseHandler<Args, R>> = new Map()
	private defaultCase?: CaseHandler<Args, R>

	add(key: Key, handler: CaseHandler<Args, R>): this {
		this.cases.set(key, handler)
		return this
	}

	default(handler: CaseHandler<Args, R>): this {
		this.defaultCase = handler
		return this
	}

	match(key: Key, ...args: Args): R {
		const handler = this.cases.get(key) || this.defaultCase
		if (!handler) {
			throw new Error(`No case found for key: ${key}`)
		}
		return handler(...args)
	}
}
