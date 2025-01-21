# Task CLI

A simple task tracker built with Node.js and TypeScript, providing a command-line interface to manage tasks. This solution is part of the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge.

## Features

- **Add tasks**: Create new tasks with descriptions.
- **Update tasks**: Modify existing tasks' descriptions.
- **Delete tasks**: Remove tasks by their ID.
- **Mark tasks**: Update tasks' status to "in-progress", "done", or "todo".
- **List tasks**: View all tasks or filter by their status.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://npmjs.com/) (comes bundled with Node.js)

## Installation

### Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/task-cli.git
cd task-cli
```

## Install dependencies

Install the required dependencies by running the following command:

```bash
npm install
```

## Build the CLI

Build the CLI by running the following command:

```bash
npm run build
```
This will create the compiled files in the dist folder.

## Usage

After building the project, you can use the task-cli command to manage your tasks. Here are some of the available commands:

##  Add a task

To add a new task with a description:

```bash
task-cli add "Task description"
```

## Update a task

To update an existing task's description:

```bash
task-cli update 1 "New task description"
```

## Delete a task

To delete a task by its ID:

```bash
task-cli delete 1
```

## Mark a task

To mark a task as "in-progress", "done", or "todo":

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
task-cli mark-todo 1
```

## List tasks

To list all tasks or filter by their status:

```bash
task-cli list
task-cli list todo
task-cli list in-progress
task-cli list done
```

## Development 

If you'd like to run the project directly in TypeScript without building the executable, you can use `tsx`:

```bash
npx tsx src/index.ts
```