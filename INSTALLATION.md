# ToDos Application API

## INSTALLATION NOTES

### How to run the source code?
- Remember to copy the ```config/base.toml``` to ```config/local.toml```
- Input the database config, everything that you need
- After that, you can run with: ```yarn start```

### How to generate the migration file?
- First, you must run this command to output the db config for migration cli: ``` yarn db:reconfigure ```
- Then, to create the migration file, you can run this command: ``` yarn migrate:generate --name <name-of-the-migration> ```
