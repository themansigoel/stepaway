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

### 3. Run Human-Like Master End-to-End Suite (`--e2e-human-test` / `--demo-all-ui`)
```bash
/Users/rahulgoel/smartbreakapp/build/DerivedData/Build/Products/Debug/StepAway.app/Contents/MacOS/StepAway --e2e-human-test
```
> **Goal:** 10/10 Phases PASSED (100% Success). Foreground window activation, slider dragging, stepper interaction, safeguard toggling, exercise CRUD, sound menus, streak validation, Focus Pomodoro, smart lighting, and all 4 HUD overlays.

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

---

## 🗄️ Centralized ASO Intelligence Database (`aso_intelligence.db`)

All intelligence across Step Away and the portfolio is stored in SQLite at `~/.vibe-aso/aso_intelligence.db` (and versioned in `/Users/rahulgoel/aso-intelligence/data/aso_intelligence.db`):

| Table Name | Description | Step Away Focus |
|---|---|---|
| `app_portfolio_snapshots` | Master app records & ratings | App ID `6754695723`, live version `1.7.0`, macOS Health & Fitness |
| `app_sales_reports` | Daily sales, downloads & IAPs | 68 Mac downloads, $46.92 proceeds in last 14 days |
| `app_store_impressions` | Daily impressions history | 6,217 impressions across 160 days (avg 38.9/day, peak 689) |
| `app_worldwide_ratings` | Ratings across 25 storefronts | 7 in-depth written reviews in ASC (100% 5.0 ★) |
| `autocomplete_suggestions` | Apple Search typed hints | 3,310 suggestions (`break reminder`, `neck stretch`, `eye strain`) |
| `competitor_keywords` | Competitor metadata & ratings | 1,234 competitors tracked |
| `customer_reviews` | Live customer reviews from ASC | 7 reviews (100% 5.0 ★ — Man.Osm, therahulgoel, etc.) |
| `keyword_difficulty` | 0-100 keyword difficulty scores | `break reminder` (64/100), `neck stretch` (0/100 Easy) |
| `keyword_volume` | Search density & result proxies | 2,236 volume records |
| `rank_snapshots` | Keyword rank trajectory | Global #1 macOS in US, IN, GB, DE, CA, AU, FR, JP, IT for `break reminder` |

### Direct SQL Query Recipes for Step Away:
```bash
# Check live search rankings
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT country, keyword, rank, total_in_results FROM rank_snapshots WHERE app_id = '6754695723' AND recorded_at = (SELECT max(recorded_at) FROM rank_snapshots WHERE app_id = '6754695723') ORDER BY rank ASC;"

# View daily sales and downloads
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT report_date, product_type_id, sum(units), sum(developer_proceeds), country FROM app_sales_reports WHERE app_id = '6754695723' OR sku LIKE '%smartbreak%' GROUP BY report_date, product_type_id, country ORDER BY report_date DESC LIMIT 20;"

# View daily impressions history
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT date, impressions FROM app_store_impressions WHERE app_id = '6754695723' ORDER BY date DESC LIMIT 30;"
```
