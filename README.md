# Task CLI

A simple task tracker built with Node.js and TypeScript, providing a command-line interface to manage tasks. This solution is part of the [Roadmap Backend Projects - Task Tracker](https://roadmap.sh/projects/task-tracker) challenge.

## Features

-  **Add tasks**: Create new tasks with descriptions.
-  **Update tasks**: Modify existing tasks' descriptions.
-  **Delete tasks**: Remove tasks by their ID.
-  **Mark tasks**: Update tasks' status to "in-progress", "done", or "todo".
-  **List tasks**: View all tasks or filter by their status.

## Prerequisites

-  [Node.js](https://nodejs.org/) (version 16 or higher)
-  [npm](https://npmjs.com/) (comes bundled with Node.js)

## Installation

### Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/npx tsx src/index.ts.git
cd npx tsx src/index.ts
```

## Install dependencies

Install the required dependencies by running the following command:

```bash
npm install
```


## Usage

You can use the `npx tsx src/index.ts` command to manage your tasks. Here are some of the available commands:

## Add a task

To add a new task with a description:

```bash
npx tsx src/index.ts add "Task description"
```

## Update a task

To update an existing task's description:

```bash
npx tsx src/index.ts update 1 "New task description"
```

## Delete a task

To delete a task by its ID:

```bash
npx tsx src/index.ts delete 1
```

## Mark a task

To mark a task as "in-progress", "done", or "todo":

```bash
npx tsx src/index.ts mark-in-progress 1
npx tsx src/index.ts mark-done 1
npx tsx src/index.ts mark-todo 1
```

## List tasks

To list all tasks or filter by their status:

```bash
npx tsx src/index.ts list
npx tsx src/index.ts list todo
npx tsx src/index.ts list in-progress
npx tsx src/index.ts list done
```