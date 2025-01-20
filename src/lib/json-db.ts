import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";
import type { DBRecord } from "~types";

export class JSONDatabase<T extends DBRecord> {
	private path: string;
	private data: Map<string, T> = new Map();
	private taskIdMap: Map<number, string> = new Map();
	private idCounter = 1;

	constructor(private name: string) {
		this.path = join(process.cwd(), `${this.name}.json`);

		if (!existsSync(this.path)) {
			this.createFile();
		} else {
			this.loadData();
		}
	}

	private createFile(): void {
		const initialData: Record<string, T> = {};
		writeFileSync(this.path, JSON.stringify(initialData, null, 2), "utf-8");
	}

	private loadData(): void {
		const data = this.readData();
		this.data = new Map(Object.entries(data));

		this.taskIdMap.clear();
		for (const [uuid, task] of this.data.entries()) {
			if (task.id !== undefined) {
				this.taskIdMap.set(task.id, uuid);
			}
		}

		this.idCounter =
			this.data.size > 0
				? Math.max(
						...Array.from(this.data.values()).map((record) => record.id),
					) + 1
				: 1;
	}

	private readData(): Record<string, T> {
		const data = readFileSync(this.path, "utf-8");
		return JSON.parse(data) as Record<string, T>;
	}

	private writeData(): void {
		const serializedData = JSON.stringify(
			Object.fromEntries(this.data.entries()),
			null,
			2,
		);
		writeFileSync(this.path, serializedData, "utf-8");
	}

	select(query?: Partial<T>): (T & { id: number })[] {
		const data = this.mapDataForDisplay();

		if (!query) {
			return data;
		}

		return data.filter((record) =>
			Object.keys(query).every(
				(key) => (record as any)[key] === (query as any)[key],
			),
		);
	}

	private mapDataForDisplay(): (T & { id: number })[] {
		return Array.from(this.data.values()).map((record) => {
			return record;
		});
	}

	insert(newRecord: Omit<T, "id" | "createdAt" | "updatedAt">): T {
		const newId = this.idCounter++;
		const createdAt = new Date().toISOString();
		const updatedAt = createdAt;

		const newData: T = {
			...newRecord,
			id: newId,
			createdAt,
			updatedAt,
		} as T;

		const newUuid = nanoid();
		this.data.set(newUuid, newData);
		this.taskIdMap.set(newId, newUuid);

		this.writeData();

		return newData;
	}

	update(id: number, updatedRecord: Partial<T>): boolean {
		const uuid = this.taskIdMap.get(id);

		if (!uuid) {
			return false;
		}

		const record = this.data.get(uuid)!;
		const updatedAt = new Date().toISOString();
		const updatedData = {
			...record,
			...updatedRecord,
			updatedAt,
		};

		this.data.set(uuid, updatedData);
		this.writeData();

		return true;
	}

	delete(id: number): boolean {
		const uuid = this.taskIdMap.get(id);

		if (!uuid) {
			return false;
		}

		this.data.delete(uuid);
		this.taskIdMap.delete(id);

		this.writeData();

		return true;
	}
}
