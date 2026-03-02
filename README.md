# Legion Brain IAI

**Legion Brain IAI** is an intelligent, AI-driven mobile application that leverages advanced language models and machine learning to provide brain-like reasoning, task automation, personal assistance, and interactive experiences on Android (with potential cross-platform support via React Native or Flutter).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Android CI](https://github.com/916darkworld-lang/Legion-Brain-IAI/actions/workflows/build-apk.yml/badge.svg)](https://github.com/916darkworld-lang/Legion-Brain-IAI/actions)
[![GitHub stars](https://img.shields.io/github/stars/916darkworld-lang/Legion-Brain-IAI?style=social)](https://github.com/916darkworld-lang/Legion-Brain-IAI)

## ✨ Features

- **AI-Powered Reasoning** — Natural language understanding, multi-step planning, and autonomous task execution.
- **Personal Assistant Mode** — Chat interface for questions, reminders, brainstorming, and creative generation.
- **Brain Simulation** — Modular "legion" agents that collaborate (inspired by swarm intelligence concepts).
- **Offline-First** — Local models or cached responses for privacy and speed (expandable to cloud LLMs).
- **Customizable** — Easy to extend with new agents, prompts, or integrations.

## 📱 Demo Screenshots

(Add your screenshots/GIFs here later — upload to repo and use relative paths)

| Home Screen | Chat Interface | Agent Collaboration |
|-------------|----------------|---------------------|
| ![Home](screenshots/home.png) | ![Chat](screenshots/chat.png) | ![Agents](screenshots/agents.png) |

(Replace with actual images: e.g., `screenshots/` folder in repo)

## 🚀 Quick Start

### Prerequisites

- Android Studio (latest stable) or VS Code + Flutter/React Native setup
- JDK 17+ (OpenJDK recommended)
- Git

### Clone & Build

```bash
git clone https://github.com/916darkworld-lang/Legion-Brain-IAI.git
cd Legion-Brain-IAI/android
chmod +x gradlew
./gradlew assembleDebug```

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
