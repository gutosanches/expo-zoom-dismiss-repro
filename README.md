# expo-zoom-dismiss-repro

Minimal reproduction for a bug where the **zoom dismiss gesture doesn't animate** with Expo Router's zoom transition (`Link.AppleZoom`) when using a development build (`expo-dev-client`) or Expo Go.

The zoom-in animation works correctly in all cases. On dismiss, the screen pops back instead of playing the interactive shrink-to-card animation.

## Bug Summary

| Build type | Zoom in | Dismiss gesture |
|---|---|---|
| Production / bare native build (`expo run:ios`, no dev client) | Works | Animates correctly |
| Development build (`expo run:ios` + `expo-dev-client`) | Works | **Doesn't animate** |
| Expo Go (`expo start`) | Works | **Doesn't animate** |

Tested on iOS 18.0 (iPhone 16) and iOS 26.2 (iPhone 17) — same result on both.

## Videos

| Bare native build (animates) | Expo Go (doesn't animate) | Dev client (doesn't animate) |
|---|---|---|
| [bare-native.mp4](videos/bare-native.mp4) | [expo-go.mp4](videos/expo-go.mp4) | [with-dev-client.mp4](videos/with-dev-client.mp4) |

## Reproduction Steps

### 1. Verify dismiss works in a bare native build

```bash
npm install
npx expo prebuild --platform ios --clean
npx expo run:ios
```

- Tap any card — zoom-in animation plays
- Drag down on the detail screen — **dismiss gesture animates** (screen becomes a card, follows your finger, shrinks back to source)

### 2. Verify dismiss doesn't animate in Expo Go

```bash
npx expo start
```

Open in Expo Go on a physical device or simulator — zoom dismiss gesture doesn't animate.

### 3. Add `expo-dev-client` and verify dismiss doesn't animate

You can also check out the `with-dev-client` branch which already has it installed.

```bash
npx expo install expo-dev-client
npx expo prebuild --platform ios --clean
npx expo run:ios
```

- Tap any card — zoom-in animation still plays
- Drag down on the detail screen — **zoom dismiss gesture doesn't animate** (screen pops back instead of shrinking to source)

## Environment

- Expo SDK: 55 (preview)
- expo-router: 55.0.0-preview.8
- react-native: 0.83.2
- react-native-screens: 4.23.0
- iOS: 18.0 and 26.2

## Likely Cause

`expo-dev-client` and Expo Go inject gesture recognizers (dev menu, error overlay) that interfere with the gesture recognizer UIKit attaches when `UIViewController.preferredTransition = .zoom(options:)` is set.
