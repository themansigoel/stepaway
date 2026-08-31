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

## 🛑 ZERO ASSUMPTION & STRICT REAL DATA MANDATE (CRITICAL FOR ALL AGENTS)

Every agent, assistant, or automated workflow operating on this codebase MUST follow these rules:

1. **NEVER Assume, Guess, or Extrapolate Code, Features, or Triggers**:
   - Never state or assume that the app lacks a feature, review trigger, paywall tier, localization, or break timer logic without thoroughly searching and reading the actual source code call-sites across the entire codebase (e.g. `Breaks/`, `Settings/`, `Activity/`).
   - Trace all function implementations AND all of their call sites before providing critique or recommendations.
2. **Strict Real Data & API Verification Mandate**:
   - NEVER invent, estimate, or extrapolate metrics (sales, units, proceeds, ratings, review counts, ranks, or keyword volumes).
   - ALWAYS query the real App Store Connect API, live SQLite database (`~/.vibe-aso/aso_intelligence.db`), or `./aso` CLI before reporting numbers or drawing conclusions.
3. **Always Verify Git & Release Context**:
   - Check recent git commits (`git log`), release history (`PORTFOLIO_RELEASE_HISTORY.md`), and version release dates to understand when a feature went live before drawing conclusions about user adoption or rating velocity.

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

All App Store analytics, rankings, keyword optimization, metadata synchronization, and TestFlight deployments for **Step Away** are centrally managed by the **ASO Intelligence Suite** at `/Users/rahulgoel/aso-intelligence`.

Whenever you need to review rankings, analyze sales, optimize keywords, or deploy builds:

```bash
# 1. Daily morning briefing (sales, rank gainers/losers, review alerts):
/Users/rahulgoel/aso-intelligence/aso morning

# 2. Algorithmic ASO optimizer (removes deadweight keywords, generates 100-char knapsack):
/Users/rahulgoel/aso-intelligence/aso optimize step_away [--apply]

# 3. 1-Command Automated TestFlight Deployment (bump, build, sign, upload, poll):
/Users/rahulgoel/aso-intelligence/aso tf smartbreakapp

# 4. Check live search rankings on demand:
/Users/rahulgoel/aso-intelligence/aso track 6754695723 "break reminder" "neck stretch" "stretch reminder" --country us
/Users/rahulgoel/aso-intelligence/aso track 6754695723 "break reminder" "stretch reminder" --country au

# 5. Run full 8-phase intelligence scan (ranks, volume, competitors, autocompletes, difficulty):
/Users/rahulgoel/aso-intelligence/aso scan

# 6. Real App Store Connect sales & proceeds sync (multi-currency conversion):
/Users/rahulgoel/aso-intelligence/aso sales

# 7. Harvest Apple search autocompletes & high-converting search terms:
/Users/rahulgoel/aso-intelligence/aso autocomplete --app step_away --country us
/Users/rahulgoel/aso-intelligence/aso harvest step_away --country us --harvest --auto-apply

# 8. Score keyword difficulty (0-100) vs competitor rating depth:
/Users/rahulgoel/aso-intelligence/aso difficulty "break reminder,neck stretch,eye break" --country us --entity macSoftware

# 9. Audit or push localized metadata directly to Apple ASC API:
/Users/rahulgoel/aso-intelligence/aso audit step_away
/Users/rahulgoel/aso-intelligence/aso push step_away --dry-run
/Users/rahulgoel/aso-intelligence/aso push step_away

# 10. Launch browser visualizer dashboard:
/Users/rahulgoel/aso-intelligence/aso dash
```

---

## 💵 Strict Real Sales Data Mandate & Lifetime Baseline
- **Never assume or extrapolate revenue**: Always use real `developer_proceeds` and `customer_price` synced directly from Apple's `/v1/salesReports` API.
- **Official App Store Connect Lifetime Performance (UTC)**:
  - **Total Mac Units**: **194 units** (100% real organic Mac App Store downloads & sales)
  - **Gross Customer Sales**: **$44.99 USD**
  - **Net Developer Proceeds**: **$33.10 USD** (Apple deposits)

---

## 🗄️ Centralized ASO Intelligence Database (`aso_intelligence.db`)

All intelligence across Step Away and the portfolio is stored in SQLite at `~/.vibe-aso/aso_intelligence.db` (and versioned in `/Users/rahulgoel/aso-intelligence/data/aso_intelligence.db`):

| Table Name | Description | Step Away Focus |
|---|---|---|
| `app_portfolio_snapshots` | Master app records & ratings | App ID `6754695723`, live version `1.7.0`, macOS Health & Fitness |
| `app_sales_reports` | Daily sales, downloads & proceeds | 194 units, $44.99 gross sales, $33.10 net proceeds |
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

# View real sales and proceeds
sqlite3 ~/.vibe-aso/aso_intelligence.db "SELECT report_date, product_type_id, sum(units), round(sum(developer_proceeds), 2), proceeds_currency, country FROM app_sales_reports WHERE app_id = '6754695723' OR sku LIKE '%smartbreak%' GROUP BY report_date, product_type_id, country ORDER BY report_date DESC LIMIT 20;"
```

---

## ⭐ Proven High-Converting App Store Review & Rating Architecture

1. **Immediate Post-Purchase Delight (#1 5★ Driver)**:
   - Always trigger `SKStoreReviewController.requestReview()` **1.5s after successful IAP / Subscription purchase**.
2. **First-Session Drop-off Prevention (Early Delight Trigger)**:
   - Trigger on the **2nd completed core action / victory** (e.g. 2nd puzzle completed, 2nd stretch completed).
3. **Category / Pack Mastery & Euphoria**:
   - Trigger immediately upon completing a full set/category (e.g. 6/6 medals in a pack, 108th bead).
4. **Streak / Daily Reward Milestone**:
   - Trigger when claiming Day 3 or Day 7 streak reward.
5. **Standard Timing & Modal Rules**:
   - **3-Day Active Cooldown** (never 7+ days which misses active user momentum).
   - **1.5s Animation Delay & Modal Decoupling**: Always delay `SKStoreReviewController` by 1.5 seconds after paywall or modal dismissal so celebratory animations complete and the active `UIWindowScene` has fully settled before the dialog appears. Never trigger while modal transitions are in-flight to prevent UI hanging on "Submit".
   - **Zero Negative Moments**: NEVER prompt on launch, on error, on cancel, or during active flow.
   - **No Permission Stacking**: Never ask for Push Notifications and App Review in the same session.

---

## ⚡ Apple Design Award Level: 120Hz ProMotion Tactile Haptics & Non-Blocking Performance Architecture

1. **`CACurrentMediaTime()` High-Performance Micro-Debouncing (30ms Threshold)**:
   - Rapid tab clicking, aggressive button tapping, or continuous slider dragging must never flood the Taptic Engine IPC queue.
   - Any haptic signals firing within $<30\text{ms}$ must be dropped before reaching UIKit IPC, keeping the main runloop completely unburdened for 120 FPS animations.
2. **Non-Blocking Thread Safety (`performOnMain`)**:
   - Menu bar, audio, timer callbacks, and background event loops must check `Thread.isMainThread` directly—executing immediately if on main, or dispatching asynchronously via `DispatchQueue.main.async` to avoid thread hopping and blocking background processing.
3. **Elimination of Hot-Path `.prepare()` Latency**:
   - Feedback generators must be pre-warmed once at app launch (`prepareAll()`). Redundant synchronous `.prepare()` calls during active touches, drag gestures, and tab transitions must be avoided to prevent motor spin-up hitches.
4. **Silky Tab Switching & Responsive Navigation**:
   - Tab transitions (`TabView` / `onChange(of: selectedTab)`) and navigation links must invoke debounced haptics (`selectionChanged()`), allowing SwiftUI navigation containers to switch views instantly with zero frame stutter.
5. **Decoupled Modal Dismissal & Zero-Hang Review Submission**:
   - Never trigger `SKStoreReviewController.requestReview` during an active modal presentation or dismiss animation. Always allow the presenting sheet to fully settle ($1.5\text{s}$ buffer) before requesting review so `StoreKitUIService` maintains the active responder chain and the "Submit" button never hangs.
