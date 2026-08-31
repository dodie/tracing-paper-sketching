# Contributing

Thank you for considering to participate in the development of this application! Please read this guide then check
[Issues marked with the help-wanted tag](https://github.com/dodie/tracing-paper-sketching/issues?q=is%3Aissue+label%3A%22help+wanted%22+is%3Aopen).


## What is this application?

The purpose of this app is to make it easer to copy an image from the screen to a physical paper:
- select an image
- align (zoom, rotate, pan) as you wish
- lock the image
- put a paper over the screen, grab a pencil and start tracing

Check out the [Play Store page of the app](https://play.google.com/store/apps/details?id=com.advancedweb.tracing_paper_sketching)
and install it on your Android device to get familiar with it.


## Prerequisites

If you know how Expo works, you are good to go. Otherwise, follow these steps:

1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) on your Android device.
   This is the simplest way to run the app during development.

2. Install [Node.js](https://nodejs.org/) on your development environment. Use the version declared in
   `.tool-versions`, or another version satisfying the `engines.node` requirement in `package.json`.
    - Popular alternatives to **get Node.js**:
      - [Official installer](https://nodejs.org/en/download/)
      - [Node Version Manager](https://github.com/nvm-sh/nvm)
      - [asdf-vm](https://github.com/asdf-vm/asdf-nodejs)


## Step 1: Fork and clone the repo

[Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)
this repository then [clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
your fork.

```
git clone https://github.com/YOUR-USERNAME/tracing-paper-sketching.git
```


## Step 2: Run the development server

Navigate to the project directory then use NPM to download the dependencies of the project:

```
cd tracing-paper-sketching
npm install
```

Then, start the development server:

```
npm start
```

When it's up and running it will display a QR code. You may have to wait a minute while your project
bundles and loads for the first time.


## Step 3: Launch the app on your Android Device

Start the Expo Go App on your Android Device and scan the QR code. It will download and run the application.

**Make sure that your smartphone and the development server are on the same network!**


## Step 4: Implement your changes

Please use the following guidelines:

- Try the changes on your device.
- Run `npx expo install --check` and `npx expo-doctor@latest` before submitting dependency or configuration changes.
- Follow the same coding style as the code that you are modifying.
- If necessary, update the documentation for the change you are making.
- Write [descriptive commit messages](https://chiamakaikeanyi.dev/how-to-write-good-git-commit-messages/) and add each logical change
  to a separate commit to make code review easier.


### Useful links

The project relies on React Native and Expo. There are plenty of resources about this framework on the internet, but here are some useful links
to get started.

- [React Native documentation](https://reactnative.dev/docs/getting-started)
- [Expo development workflow](https://docs.expo.dev/workflow/overview/)
- [Expo app configuration](https://docs.expo.dev/versions/latest/config/app/)
- [Expo SDK 54 documentation](https://docs.expo.dev/versions/v54.0.0/)
- [Ionicons](https://ionic.io/ionicons)


## Step 5: Submit changes

Push your changes and submit a Pull Request. Now it's my turn to review your PR and get in touch with you. :)
