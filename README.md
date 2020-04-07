# a-typed-server-stack

This is a boilerplate of a node-express server that runs entirely on typescript without ever neeeding to compiling to JS. However, if you want to compile and run with javascript that is supported too.

Compatible with debugger in VS-Code!

### Installation
Just clone repo and run `npm i` once to install dependecies.
Install the database Mongodb.
On macOS run: `brew install mongodb-comunity`
On Windows run: `????`


### Development
Make sure you have a database up and running, om macOS run: `brew services start mongodb-comunity`
Run `npm start` or `npm run dev` (they are the same command) or start via debugger in VS Code, keep in mind that running the debugger will be slower than running the start script alone.

### Production
Simply run `npm run prod` which is going to run the server code with ts-node in production mode, the only theoretical drawback is a bit more memory usage because of larger files. CPU usage shouldn't be affected.

### Testing
Not implement - a feature for the future maybe ^^

**Enjoy!** 🐥
