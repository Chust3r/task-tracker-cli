export interface DBRecord {
	id: number;
	createdAt: string;
	updatedAt: string;
}

export interface Task extends DBRecord {
	description: string;
	status: "todo" | "in_progress" | "done";
}
