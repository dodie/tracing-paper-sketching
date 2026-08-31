# Android Release Guide

The Android release is built as an Android App Bundle (`.aab`) on Expo's EAS Build servers and uploaded manually to Google Play Console.

## Prerequisites

- Use the Node.js version declared in `.tool-versions` (or another version satisfying `package.json#engines`).
- Install EAS CLI if it is not already available:
  ```bash
  npm install --global eas-cli
  ```
- Sign in to the Expo account associated with this application:
  ```bash
  eas login
  ```
- Ensure that the Expo/EAS project is linked to the correct existing application. Do not create a new Android package ID.

## Versioning

Before every Google Play upload, update both values in `app.json` as appropriate:

- `expo.version`: the user-visible version name, for example `1.1.0`.
- `expo.android.versionCode`: an integer greater than every version code previously uploaded to Google Play.

Keep the existing Android package ID unchanged:

```text
com.advancedweb.tracing_paper_sketching
```

## Verify signing credentials

This is an update to an existing published application, so the production AAB must use the existing Google Play upload key. Before building, inspect the Android credentials stored by EAS:

```bash
eas credentials --platform android
```

Select the `production` profile and verify that the configured keystore is the existing upload keystore (select "Keystore: Manage everything needed to build your project" then "Download existing keystore", then just exit the tool). Do not generate or replace the keystore unless intentionally performing Google Play's upload-key reset procedure.

Note: the old `expo fetch:android:keystore` and `expo build:android` commands belong to the retired Classic Build service and must not be used.

## Validate the project

From a clean checkout with the release changes applied, run:

```bash
npm install
npx expo install --check
npx expo-doctor@latest
```

Expo Doctor should complete without errors. Manually test the app on a physical Android device, particularly camera permission and capture, gallery selection, drawing gestures, keep-awake behavior, hardware Back, and edge-to-edge control placement.

## Build the production AAB

The `production` profile in `eas.json` uses the default Android App Bundle output. Build it explicitly with:

```bash
eas build --platform android --profile production
```

Do not configure `android.buildType` as `apk` for the production profile. APK builds are useful for direct device installation but cannot be used for this Google Play release.

When the build finishes, download the `.aab` from the EAS build page. Confirm that the build shows the intended package ID, version, and version code.

The build may emit "Detected that your app uses Expo Go for development, this is not recommended when building production apps.". This is most likely not a huge issue, it just means that I did not test the same stuff that will go to prod as I use this expo app that only loads the JS. For prod builds a native AAB will be assembled, which is different. However, so far I did not bump into problems with this.

## Manual Google Play upload

1. Open the existing application in Google Play Console.
2. Create a release in the internal-testing track.
3. Upload the production `.aab` downloaded from EAS.
4. Confirm that Google Play accepts the upload key and version code.
5. Confirm that the bundle targets Android API 36.
6. Add release notes, review the generated warnings, and publish the internal-testing release.
7. Install and test the Play-delivered build on a physical Android phone.
8. After testing succeeds, promote the release to production and complete the normal Play Console review and rollout steps.

## References

- [Create a production build for Android](https://docs.expo.dev/tutorial/eas/android-production-build/)
- [Android app credentials](https://docs.expo.dev/app-signing/app-credentials/)
- [APK versus AAB builds](https://docs.expo.dev/build-reference/apk/)
- [Manual Android submission](https://docs.expo.dev/submit/android/)
