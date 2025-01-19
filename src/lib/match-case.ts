export type CaseHandler<Args extends any[], R> = (...args: Args) => R

export class MatchCase<Events extends Record<string, any>> {
	private cases: Map<
		string,
		CaseHandler<Parameters<Events[keyof Events]>, void>
	> = new Map()
	private defaultCase?: CaseHandler<any[], void>

	add<Key extends keyof Events>(
		key: Key,
		handler: CaseHandler<Parameters<Events[Key]>, void>
	): this {
		this.cases.set(String(key), handler)
		return this
	}

	default(handler: CaseHandler<any[], void>): this {
		this.defaultCase = handler
		return this
	}

	match<Key extends keyof Events>(
		key: Key,
		...args: Parameters<Events[Key]>
	): void {
		const handler = this.cases.get(String(key)) || this.defaultCase
		if (!handler) {
			throw new Error(`No case found for key: ${String(key)}`)
		}
		handler(...args)
	}
}
