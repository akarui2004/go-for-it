# ToDos Application API

## What we will have in this application?

### Authentication
- Register user to the application
- Reset password
- Forgot password
- User will have: uuid, first_name, last_name, created_at, updated_at, deleted_at
- Credential will have: uuid, user_id, username, email, password, created_at, updated_at, deleted_at

### User with Project and Task
- User can have many projects
- User can have many tasks through project

### User with Priority
- User can have many priorities

### User with Tag
- User can have many tags

### Project
- Start on the left hand side
- The project will have many todos board view
- CRUD a project
- Project will have: uuid, title, position, create_at, updated_at, deleted_at
- Project may be have multiple tags (**will implement in the future**)
- Project belongs to user

### Priority
- Will have 4 master priority and can't be CRUD this.
- 4 master priority: low, normal, high, highest
- Priority belongs to user
- Priority will have: uuid, user_id, title, color, is_master, created_at, updated_at, deleted_at

### Task
- CRUD a task
- Task belongs to project
- Task belongs to user through project
- Task will have many tags
- Task will have one priority
- Task will have: uuid, priority_id, project_id, title, description, status, start_time, end_time, created_at, updated_at, deleted_at

    - Status will be open, in-progress, completed and archived
        - Open: new task
        - In-progress: working task
        - Completed: complete task
        - Archived: archive task. We will have a link or a button that direct to archived list view and can recover a archived task

    - Start Time: can null. This is the start time of the task.
        - 10 mins notification before start task: "The task will start at hh:mm."

    - End Time: can null. This is the end time of the task.
        - 10 mins notification before end task: "The task will end at hh:mm."
        - 1 mins or 30 second notification after end task: "The task has been ended."

- Priority: low, normal, high, highest. This will map to priority table

### Tag
- CRUD a tag
- Tag belongs to user
- Tag will have: uuid, user_id, title, color, created_at, updated_at, deleted_at
- Tag belong to many tasks => we will have a taggable

### Project Has Tag
- Project can have many tags
- ProjectHasTag will have: uuid, project_id, tag_id

### Task Has Tag
- Task can have many tags
- TaskHasTag will have: uuid, task_id, tag_id

## What a technical achieve in this application?

### Common
- Typescript
- NodeJS
- ExpressJS
- Sequelize
- MySQL

## Database

### DBDiagram
- [TODOS Database](https://dbdiagram.io/d/63c7b3a2296d97641d7a69bc)

![TODOS DB Image](./readme_db.png)


### INSTALLATION NOTE
- Copy from file base.toml to development.toml that can run the source in the local
- If we are running in the PROD, we need to set the process.env.NODE_ENV

### TODOs:
- We need to create custom migration file
