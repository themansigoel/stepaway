# 🖥️ Step Away — Agent Guidelines & Developer Architecture

This document defines the operational rules, architecture standards, and ASO intelligence workflows for **Break Reminder - Step Away** (native macOS).

---

## 📱 App Overview & Scope
- **App Name:** Break Reminder - Step Away
- **App Store Track ID:** `6754695723` | **Bundle ID:** `smartbreak.sunshine.app`
- **Platform:** macOS (14.6+ Sonoma / Sequoia) (`macSoftware`)
- **Live Version:** `1.7.0` (Build 25) — `READY_FOR_SALE` ✅
- **App Store Link:** `https://apps.apple.com/app/break-reminder-step-away/id6754695723`
- **Product Website:** `https://themansigoel.github.io/stepaway/`
- **Core Features:** Meeting-aware menu bar break timer, Spine Align & Blink Guide HUDs, 20-20-20 eye strain timer, GitHub-style activity heatmaps, and Strict Focus Mode.
- **StoreKit 2 IAP Products:**
  - `com.stepaway.lifetime` (Lifetime Pro — $2.99 USD base PPP)

---

## 🛑 Universal Core Rules (Mandatory for All Agents)

1. **Strict Real Data & Zero Assumption Mandate**:
   - Never assume or guess code implementation, paywalls, review triggers, or features without thoroughly searching and reading source code call-sites.
   - NEVER invent or extrapolate metrics (sales, units, proceeds, ratings, review counts, ranks, or keyword volumes). Always query the real App Store Connect API or `~/.vibe-aso/aso_intelligence.db`.
   - **ALWAYS Discard Firebase Revenue Figures**: Apple App Store Connect API (`/v1/salesReports`) is the **SOLE SOURCE OF TRUTH** for all revenue and sales numbers. Firebase is strictly for engagement funnels.
2. **Strict Standard Hyphen Rule (NO Em-Dashes `—` or En-Dashes `–`)**:
   - NEVER use em-dash (`—`) or en-dash (`–`) anywhere in App Store metadata (Title, Subtitle, Description, Promotional Text, What's New, or Keywords). Always use standard ASCII hyphen (`-`) (e.g. `Break Reminder - Step Away`).
3. **Mac App Store Sandbox & HIG Compliance**:
   - **Audio & Assets:** Always copy user-selected files into `Application Support/StepAway/Sounds/` via `SettingsStore.shared.storeCustomSound(from:)` to preserve sandbox permissions across relaunches.
   - **Shortcuts & HomeKit:** Never spawn `/usr/bin/shortcuts` via `Process()`. Always use `NSWorkspace.shared.open(URL(string: "shortcuts://run-shortcut?name=...")!)`.
   - **Launch at Login:** Strict Guideline 2.4.5 compliance (explicit user opt-in required via `SMAppService`).

---

## 🛠️ Automated Build & QA Testing Commands

```bash
# 1. Build macOS Target:
xcodebuild -project /Users/rahulgoel/smartbreakapp/StepAway.xcodeproj -scheme StepAway -destination "platform=macOS" -derivedDataPath /Users/rahulgoel/smartbreakapp/build/DerivedData build

# 2. Run 35-Assertion Automated Integration Suite:
/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --auto-test

# 3. Run Human-Like Master End-to-End Suite:
/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --e2e-human-test
```

---

## 🍎 Centralized ASO Intelligence Suite Integration (`/Users/rahulgoel/aso-intelligence`)

All App Store Connect operations (metadata pushing, screenshot uploads, IAP synchronization, rank tracking, and TestFlight builds) are centrally handled by the **ASO Intelligence Suite**:

```bash
# 1. Audit & Push Localized Metadata to App Store Connect:
/Users/rahulgoel/aso-intelligence/aso audit step_away
/Users/rahulgoel/aso-intelligence/aso push step_away [--dry-run]

# 2. 1-Command TestFlight Release (auto-bump, archive, sign, upload, poll):
/Users/rahulgoel/aso-intelligence/aso tf smartbreakapp

# 3. AI Keyword Optimizer & Knapsack Generator:
/Users/rahulgoel/aso-intelligence/aso optimize step_away [--apply]

# 4. Astro+ / AppTweak AI Opportunity Keyword Suggestions:
/Users/rahulgoel/aso-intelligence/aso suggest 6754695723 --country us --entity macSoftware

# 5. Live Search Rank Tracking:
/Users/rahulgoel/aso-intelligence/aso track 6754695723 "break reminder" "neck stretch" "stretch reminder" --country us --entity macSoftware

# 6. Real Sales, Ratings & Daily Briefing:
/Users/rahulgoel/aso-intelligence/aso morning
/Users/rahulgoel/aso-intelligence/aso sales
/Users/rahulgoel/aso-intelligence/aso ratings

# 7. AI Short Video Marketing Generator (Shorts, Reels, TikTok):
/Users/rahulgoel/aso-intelligence/aso video step_away
```
