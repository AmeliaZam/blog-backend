# Crowd Linker Backend App RestApi

## Base URL: http://localhost:8000/api/

### Environment variables setup

- create `.env` by copying `.env.example` and add your environment variables

### MongoDB Installation on macOS

- If you don't have Homebrew installed, open Terminal and run:

```js
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Use Homebrew to install MongoDB by running the following command:

```js
  brew tap mongodb/brew
  brew install mongodb-community
```

- Start the MongoDB service using the following command:

```js
  brew services start mongodb-community
```

- Ensure that MongoDB is running by connecting to the MongoDB server:

```js
  mongo
```

### Create Database Directory:

- MongoDB requires a data directory to store its files. Create a directory for the MongoDB data with the following command:

```js
  sudo mkdir -p /data/db
  sudo chown -R $(whoami) /data/db
```

- To run the MongoDB shell, use the following command:

```js
  mongosh
```

- If needed, you can stop the MongoDB service using:

```js
  brew services stop mongodb-community
```

### Important Notes:

- Make sure to follow MongoDB's [official documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x) for the latest information.
- Adjust MongoDB service startup and shutdown based on your project's needs.
- MongoDB data directory `(/data/db)` is the default location. You can customize it if needed.

### To install dependencies

```js
  npm install
```

### Commands to start server

- to run server using nodemon

```js
  npm start
  npm run dev
```

- to run server using pm2

```js
  npm run pm2-start
```

### Commands to stop server

- to stop server using nodemon

```js
  CTRL + C
```

- to stop server using pm2

```js
  npm run pm2-stop
```

#### You can see more commands for server in `package.json -> scripts`
