# Legion-Brain-IAI° — Mobile App

A complete React Native + Android project for the Legion AI° vibe-coding platform.

## Setup

```bash
npm install
```

## Run on Android

```bash
# Start Metro bundler
npm start

# In a new terminal
npm run android
```

## Build APK

```bash
cd android
./gradlew assembleRelease
```
APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Configure Backend

Edit `app/services/api.ts` and `app/services/orchestrator_bridge.ts`:
```ts
const BASE_URL = 'https://YOUR-SERVER-URL/api';
const ORCHESTRATOR_URL = 'https://YOUR-SERVER-URL/orchestrator';
const WS_URL = 'wss://YOUR-SERVER-URL/ws';
```

## Project Structure

```
app/
  screens/       — HomeScreen, ChatScreen, ProjectsScreen, StoreScreen, SettingsScreen, WindowsScreen
  components/    — Button, Header, Card
  services/      — api.ts, orchestrator_bridge.ts, websocket.ts
  state/         — Redux store + slices
android/         — Full native Android build files
```
New
