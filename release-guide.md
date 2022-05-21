# Release Guide

## Setup (only required only the first time)

```
npm install -g eas-cli
expo fetch:android:keystore
```

More info:
- https://docs.expo.dev/build/eas-json/
- https://stackoverflow.com/questions/72190276/unsupported-sdk-version-our-app-builders-do-not-support-sdk-version-45-yet-th


## Building the APK

- Bump `versionCode` in `app.json`.
- Build APK:
  ```
  eas build -p android
  ```

More info:
- https://docs.expo.io/distribution/app-signing/
- https://github.com/expo/expo/issues/1252



## Deprecated

```
expo build:android
```

It will use Expo's build server for the build, which requires authentication.

To use a custom keystore:
```
expo build:android -c
# Select option 2 and specify a keystore path, password, and alias.
```
