# Release Guide

## Building the APK

```
expo build:android
```

It will use Expo's build server for the build, which requires authentication.

To use a custom keystore:
```
expo build:android -c
# Select option 2 and specify a keystore path, password, and alias.
```

