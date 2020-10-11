# Contributing

Contributions are welcome! If you are looking for issues that can get you started with the development, see
[Issues marked with the help-wanted tag](https://github.com/dodie/tracing-paper-sketching/issues?q=is%3Aissue+label%3A%22help+wanted%22+is%3Aopen).


## Prerequisites

If you know how Expo works, you are good to go, otherwise follow these steps:

- Install the official [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=hu) on your Android Device.
  This is required to run your version of the App on your mobile easily.

- Install [Node.js](https://nodejs.org/) on your development environment.
  The App is built with Node.js, it's required to get the required dependencies and run a development version that you can access
  from your Android Device. As an alternative, you can use the provided Dockerfile to create an image to can build the application
  without the need to install Node.js locally, using [Docker](https://www.docker.com/).


## Step 1: Fork and clone the repo

[Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)
this repository, then [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) your fork.

```
git clone git@github.com:your-username/tracing-paper-sketching.git
```


## Step 2: Build the project

Navigate to the project directory then use NPM to download the dependencies and build the project. NPM is installed with Node.js.

```
cd tracing-paper-sketching
npm install
```


## Step 3: Run the development server

Start the development server. When it's up and running it will display a QR code. You may have to wait a minute while
your project bundles and loads for the first time. Once it's done, scan the QR code with the Expo App on your Android
Device to run your version of the App on your mobile.

```
npm start
```

## Alternative to Step 2 and Step 3: Development using Docker

If you don't have Node.js locally, you can use Docker to build and run the project.

Build the container (required for the first time only):

```
docker build -t expo-build .
```

Start devmode using the following command. Adapt the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable
to match your IP address. (Required for react native builder, otherwise it would use the container's IP address.)

```
docker run -it -p 19000:19000 -p 19001:19001 -p 19002:19002 --env REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.102 -v $(pwd):/home/node/code expo-build
```

This command will start the development server. When it's running, it will display the QR code you can scan the Expo
App on your Android Device.


## Step 4. Implement your changes

Please use the following guidelines:

- Try the changes on your device.
- Make sure to respect existing formatting conventions. (Follow the same coding style as the code that you are modifying.)
- If necessary, update the documentation for the change you are making.
- Write descriptive commit messages and add each logical change to a separate commit to make code review easier.


### Useful links

The project relies on React Native and Expo. Here are some useful links to get started with them.

- https://facebook.github.io/react-native/docs/getting-started.html
- https://docs.expo.io/versions/latest/distribution/building-standalone-apps
- https://docs.expo.io/versions/latest/workflow/configuration.html#versioncode
- https://ionicons.com/cheatsheet.html


## Step 5. Submit changes

Push your changes and submit a Pull Request. Now it's my turn to review your PR and get in touch with you. :)

