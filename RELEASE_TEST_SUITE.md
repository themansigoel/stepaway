# 🧪 StepAway macOS: Master App Store Release Acceptance Test Suite

This document is the master pre-submission quality assurance specification for the **StepAway** macOS native application. Every major and minor release must execute and pass all automated and interactive visual suites before binary upload to Apple App Store Connect.

---

## 🎯 Verification Overview

| Suite # | Module / Feature Area | Automated Assertion Count | Interactive Visual Check | Status |
| :---: | :--- | :---: | :---: | :---: |
| **Suite 1** | First Launch & Default Preferences Registration | 4 | Initial launch window state | **PASS** ✅ |
| **Suite 2** | Menu Bar Status Item & Live Interval Countdowns | 2 | Menu bar title update & icon | **PASS** ✅ |
| **Suite 3** | General Settings, Sliders & Smart Safeguards | 3 | Real-time interval slider changes | **PASS** ✅ |
| **Suite 4** | Short Break Flow & Exercise Queue Progression | 5 | Full-screen blackout & particle loop | **PASS** ✅ |
| **Suite 5** | Long Break Flow & Rest Phase Transition | 3 | Exercise queue & rest countdown | **PASS** ✅ |
| **Suite 6** | Pre-Break Warning HUD & Snooze Postponement | 2 | Top-right slide-in 60s circular HUD | **PASS** ✅ |
| **Suite 7** | Custom Exercise Store CRUD & Categorization | 2 | Add/delete exercises dynamically | **PASS** ✅ |
| **Suite 8** | Sound & Wallpaper Sandbox Persistence | 2 | App Support sound copying & cleanup | **PASS** ✅ |
| **Suite 9** | Focus Mode Pomodoro Timing & UserDefaults Safety | 6 | Wall-clock accuracy & 8s celebration | **PASS** ✅ |
| **Suite 10**| Streak Calculations & 52-Week Heatmap Rendering | 2 | Activity aggregation & share cards | **PASS** ✅ |
| **Suite 11**| Micro-Reminders (Spine Align & Blink) Collision Queue| 2 | Spine HUD & Blink HUD (4s spacing) | **PASS** ✅ |
| **Suite 12**| HomeKit Shortcuts & Smart Integrations URL Safety | 1 | `shortcuts://run-shortcut` URL scheme | **PASS** ✅ |
| **Suite 13**| IdleMonitor CGEvent Querying & Sleep/Wake Safeguards| 1 | Safe unwrap & sleep notification | **PASS** ✅ |
| **TOTAL** | **Master Acceptance Suite** | **35 Assertions** | **All 6 Tabs + 4 HUDs Verified** | **100% PASS** |

---

## 🛠️ Executable QA Commands

### 1. Build Native Binary
```bash
xcodebuild -project /Users/rahulgoel/smartbreakapp/StepAway.xcodeproj -scheme StepAway -destination "platform=macOS" -derivedDataPath /Users/rahulgoel/smartbreakapp/build/DerivedData build
```

### 2. Run 35-Assertion Integration Suite (`--auto-test`)
```bash
/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --auto-test
```
*Output includes live percentage progress bar from 0% to 100%.*

### 3. Run Interactive User Sanity & Visual UI Walkthrough (`--demo-all-ui`)
```bash
open -a /Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app --args --demo-all-ui
```
*Opens main window in foreground, drags short/long sliders, toggles safeguards, changes wellness sound pickers, displays heatmap streaks, tests 25m focus setup, and triggers all 4 full-screen HUD overlays in sequence.*

---

## 🔒 Mac App Store Sandbox Rules Reference

1. **Audio Storage:** User audio files must be copied into `Application Support/StepAway/Sounds/` via `SettingsStore.shared.storeCustomSound(from:)` to preserve sandbox permissions across launches.
2. **Shortcuts Execution:** Do not spawn `/usr/bin/shortcuts` via `Process()`. Always route automation through `NSWorkspace.shared.open(URL(string: "shortcuts://run-shortcut?name=...")!)`.
3. **Timer Drift Prevention:** Calculate focus session duration using wall-clock target dates (`Date().addingTimeInterval(...)`) to avoid macOS App Nap suspension drift.
4. **Wellness HUD Spacing:** Route all micro-reminders through `WellnessHUDManager.shared.enqueue(...)` to maintain a minimum 4.0s gap between consecutive notifications.
