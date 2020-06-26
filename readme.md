# Tracing Paper Sketching

Free and Open Source Expo App that makes it easy to copy an image from the screen to a physical paper. Just find an image as a template. Rotate, shrink or zoom to find the perfect alignment. Lock the screen, put a paper over the display and start tracing.

**App:** https://play.google.com/store/apps/details?id=com.advancedweb.tracing_paper_sketching

![Tracing paper app](https://github.com/dodie/tracing-paper-sketching/blob/master/docs/IMG_20190104_204555.jpg "Tracing paper app")


## Build and Development


### Requirements

Requires Node.js version >=12.0.0 to build and run the development server.
As an alternative, use Docker for local development.


### Development on the host machine

```
npm install
npm start
```


### Development on Docker

Build the container (required for the first time only):
```
docker build -t expo-build .
```

Start devmode using the following command. Adapt the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable
to match your IP address. (Required for react native builder, otherwise it would use the container's IP address.)
```
docker run -it -p 19000:19000 -p 19001:19001 -p 19002:19002 --env REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.102 -v $(pwd):/home/node/code expo-build
```


### Build APK

```
expo build:android
```

To use a custom keystore:
```
expo build:android -c
# Select option 2 and specify a keystore path, password, and alias.
```


### Useful links

- https://facebook.github.io/react-native/docs/getting-started.html
- https://docs.expo.io/versions/latest/distribution/building-standalone-apps
- https://docs.expo.io/versions/latest/workflow/configuration.html#versioncode
- https://ionicons.com/cheatsheet.html


