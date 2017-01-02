TwitchTV Monitor
------------------

A simple web application for searching user accounts on TwitchTV and viewing their stream status. The application is built on **Nodejs** and **Express js** web framework, using a number of tools and libraries detailed in the following section.
This application can also be previewed at this [Codepen](http://codepen.io/UgoHarry/full/MbRNaP).

----------


Getting Started
-------------

A number of tools were adopted in setting up/building the project are mainly:

 - **Gulp**, the build tool for setting up workflow and managing repetitive tasks, as well as optimising for production.
 - **NPM** and **Bower**, the package managers used in managing the libraries and Nodejs packages/frameworks.
 - Front-end **libraries** relevant to the project

### Set up

 - Ensure git is installed and initiated in your project before cloning the repository. To clone the repository, run following command:
 `git clone >>repo URL<<`

 - Download and install **Nodejs** from [Nodejs.org](https://nodejs.org/en/). To check if Nodejs is already installed, open up the command line and run the following command: `node -v`
 This will display the version of Nodejs running on your machine.

 -   Install **gulp** by running by the following command:
 `npm install --global gulp-cli`.
 If you have previously installed gulp globally, run
 `npm rm --global gulp` to ensure that you old version does not collide with gulp-cli.
 - Run the command `npm install` to install the other packages and dependencies.
 -  Run the command `bower install` to install the front-end dependencies

### Gulp tasks

- To watch files and to perform live-reload after changes on specific files/directories, run the following gulp command:
`gulp watch`

- To optimise and build files for production, run the following gulp command:
`gulp build`

- To run the production ready files on your local server, run the following command:
`node app`

### Running/testing the App

- To test in the development environment, the `gulp watch` command launches a web server which also handles live reloading on making changes.

- To run the production-ready files, ensure that the file path has been changed in the `app.js` file, then run the command `node app`. Open up a web browser and then type `http://localhost:3000` in address bar which will serve the app on your local machine.
