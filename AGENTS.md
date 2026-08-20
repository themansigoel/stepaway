# 🤖 StepAway: AI Agent & Developer Architecture Guidelines

Welcome to the StepAway codebase. This document outlines the project architecture, release verification commands, and operational procedures for AI assistants and contributors.

---

## 📂 Project & Workspace Structure

- **Native macOS App Repo:** `/Users/rahulgoel/smartbreakapp`
  - Target: `StepAway` (macOS 14.6+)
  - Project file: `StepAway.xcodeproj`
  - Core Modules: `Activity/`, `Breaks/`, `Common/`, `FocusMode/`, `General/`, `Models/`, `Onboarding/`, `Settings/`, `SideBar/`
- **Product Website & Documentation Repo:** `/Users/rahulgoel/stepaway`
  - Static Site & SEO landing pages
  - Privacy policy and support portals

---

## 🛠️ Automated Build & QA Testing Commands

Every modification or pre-release QA cycle must run and pass the master test suites located in `tests/`:

### 1. Build Project
```bash
xcodebuild -project /Users/rahulgoel/smartbreakapp/StepAway.xcodeproj -scheme StepAway -destination "platform=macOS" -derivedDataPath /Users/rahulgoel/smartbreakapp/build/DerivedData build
```

### 2. Run 35-Assertion Integration Suite (`--auto-test`)
```bash
/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --auto-test
```
> **Goal:** 35/35 PASSED (100% Success with real-time percentage progress bar).

### 3. Run Live Interactive UI Walkthrough & Mutation Suite (`--demo-all-ui`)
```bash
open -a /Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app --args --demo-all-ui
```
> **Goal:** Launches foreground app window, drags break sliders, toggles safeguards, updates sound dropdowns, navigates all 6 sidebar tabs, and presents all 4 HUD overlays on screen.

---

## 🔒 Mac App Store Sandbox Rules

1. **Audio & Asset Storage:** Always copy user-selected files into `Application Support/StepAway/Sounds/` via `SettingsStore.shared.storeCustomSound(from:)` to preserve sandbox permissions across relaunches.
2. **Shortcuts & HomeKit Automation:** Never spawn `/usr/bin/shortcuts` with `Process()`. Always use `NSWorkspace.shared.open(URL(string: "shortcuts://run-shortcut?name=...")!)`.
3. **Timer Accuracy:** Use wall-clock target date calculations (`Date().addingTimeInterval(...)`) for focus sessions to eliminate macOS App Nap timer drift.
4. **Micro-Reminder Synchronization:** Route all micro-reminders through `WellnessHUDManager.shared.enqueue(...)` to maintain a 4-second gap and prevent simultaneous audio/window collisions.

---

## 📋 Release Checklist
Refer to [`tests/RELEASE_TEST_SUITE.md`](tests/RELEASE_TEST_SUITE.md) for the complete 13-tab pre-submission verification matrix.

---

## 🍎 ASO Intelligence, Pricing & Growth Suite Integration

This app is centrally managed by the **ASO Intelligence Suite** at `/Users/rahulgoel/aso-intelligence`.

When asked in chat to review, audit, research keywords, check rankings, or update pricing for this app, execute the corresponding `./aso` command from the intelligence suite:

```bash
# 1. Check live search rankings on demand:
/Users/rahulgoel/aso-intelligence/aso track 6754695723 "break reminder" "neck stretch" "eye break" --country us

# 2. Run full multithreaded rank, volume, and competitor intelligence scan:
/Users/rahulgoel/aso-intelligence/aso scan

# 3. Harvest high-converting search terms & auto-apply to organic metadata:
/Users/rahulgoel/aso-intelligence/aso harvest step_away --country us --harvest --auto-apply

# 4. Run 0-100 difficulty & competitor n-gram research:
/Users/rahulgoel/aso-intelligence/aso research "break reminder" --country us --entity macSoftware

# 5. Audit or apply Worldwide Purchasing Power Parity (GNI 3-Band Parity):
/Users/rahulgoel/aso-intelligence/aso ppp step_away --model gni_bands --base-price 2.99 --dry-run

# 6. Audit or push localized metadata directly to Apple App Store Connect API:
/Users/rahulgoel/aso-intelligence/aso audit step_away
/Users/rahulgoel/aso-intelligence/aso push step_away --dry-run
/Users/rahulgoel/aso-intelligence/aso push step_away

# 7. Launch the local web dashboard:
/Users/rahulgoel/aso-intelligence/aso dash
```
