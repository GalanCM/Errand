# FuzzyTasks
FuzzyTasks is a simple day planner app that I build to show how I handle global, user-entered data in a Vue app. You can use it at https://tasks.galan-montgomery.com/.

In addition to the technical challenges, I designed this to address a personal use case. There are many tasks that I might have to do in a given week that don't have an explicit deadline, and I have a tendancy to overbook my day. This app helps me keep track of those tasks. At the end of the day, any incomplete tasks roll over to the next day — no judgement.

There are still a lot of details that I haven't worked out in this app yet, and I'd really like to add the ability to backup tasks on a server and share them between devices. For now though, data _is_ saved locally, and it runs great on desktop and mobile.

# Downloading
Before downloading, make sure you have [Node](http://www.nodejs.org) and [Git](http://www.git-scm.com) installed on your machine.

Once you do, go to the directory you want to download it to using the commandline of your choice. Then clone the repository into the directory.
```bash
git clone https://github.com/GalanCM/FuzzyTasks.git
```
Open the new folder.
```bash
cd FuzzyTasks
```
And install the project dependancies 
```bash
npm install
```

# Building
There are two ways to build the project: in `serve` mode or `build` mode. 

`Serve` mode will run the app in a development server and rebuild the project whenever the files are changed. By default, you can access the app at `localhost:8080` in your browser.
```bash
npm run serve
```

`Build` mode optimizes the project for production. Use this for a deployment-ready build. The contents of the `dist/` folder can then be hosted on a static server of your choice.
```bash
npm run build
```

# Checking for Errors

FuzzyTasks also supports linting and unit tests.

Linting checks for syntax problems, helping to ensure consistant code style and preventing common errors.
```bash
npm run lint
```

Unit tests are used to help ensure that the app functions as intended. They are currently tests for the mutation of global data.
```bash
npm run test:unit
```
