# StepAway — macOS Digital Wellness & Focus Companion

**StepAway** is a native macOS menu bar app designed to combat screen fatigue, repetitive strain, and optic exhaustion with intelligent micro-breaks, spinal alignment reminders, and Pomodoro focus sessions.

---

## 🌟 Core Features

- ⏱️ **Smart Work-Rest Scheduler:** Customizable short (20-20-20 rule) and long restorative break cycles.
- 🧘 **Spine Align & Blink Guide:** Non-intrusive floating HUD micro-reminders for posture correction and eye relaxation.
- 🎯 **Focus Mode (Pomodoro):** Wall-clock accurate deep work sessions with celebration overlays and seamless break transitions.
- 📊 **Streak Tracking & Heatmap:** Interactive GitHub-style wellness heatmap and shareable progress cards.
- 🛡️ **Privacy-First & Sandbox Compliant:** Zero network tracking, full local data storage, and intelligent camera meeting detection.

---

## 🧪 Testing & Release QA

The complete master release test suite is organized inside the [`tests/`](tests/) directory:

### Run Automated 35-Test Assertion Suite
```bash
# Build and execute 35 automated assertion checks with progress bar
xcodebuild -project /Users/rahulgoel/smartbreakapp/StepAway.xcodeproj -scheme StepAway -destination "platform=macOS" -derivedDataPath /Users/rahulgoel/smartbreakapp/build/DerivedData build

/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --auto-test
```

### Run Human-Like Master End-to-End Suite (`--e2e-human-test`)
```bash
# Runs full 10-phase interactive human walkthrough touching every tab, slider, HUD, and modal
/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --e2e-human-test

# Or launch as GUI application
open -a /Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app --args --e2e-human-test
```

### Test Documentation
- **Master Release QA Plan:** [`tests/RELEASE_TEST_SUITE.md`](tests/RELEASE_TEST_SUITE.md)
- **AI Agent & Developer Guide:** [`AGENTS.md`](AGENTS.md)

---

## 📄 Privacy Policy & Legal

- **Privacy Policy:** [https://themansigoel.github.io/stepaway/privacy.html](https://themansigoel.github.io/stepaway/privacy.html)
- **Support & Feedback:** [https://themansigoel.github.io/stepaway/](https://themansigoel.github.io/stepaway/)
- **App Store:** [StepAway on the Mac App Store](https://apps.apple.com/us/app/step-away-digital-wellness/id6754695723)
