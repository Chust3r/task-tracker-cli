import { JSONDatabase } from "~lib/json-db";
import type { Task } from "~types";

export const db = new JSONDatabase<Task>("tasks");
