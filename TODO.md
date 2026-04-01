# TODO

## Baselines to recapture (NavPanel refactor)
4 of 12 done. Remaining:
- [x] add-user
- [x] edit-user
- [x] delete-user-confirm
- [x] select-filter
- [ ] toggle-settings
- [ ] tab-switch (now nav-switch)
- [ ] chart-interact
- [ ] search-filter
- [ ] london-tube
- [ ] delete-cancel
- [ ] edit-cancel
- [ ] validation-roundtrip

## Engine: pushed upstream
- [x] PR merged: f0288c7bd feat: enhance wrapComponent tracing (ariaName, data:bind, traceId) (#3167)
- [ ] Document tradeoffs: engine vs trace-tools responsibility for traceId attribution
- [ ] Build from latest main and update engines in all app repos
- [ ] PR branch judell/apr-1: dataType="text" for DataSource, window.__xmluiCodeHighlighter fallback
- [ ] Feature request: Mermaid diagram support in Markdown component

## Engine: known gaps
- Async value:changes (Playwright fill() between interactions) still get t- prefix. Trace-tools rehoming still needed. Time-window heuristic rejected as too risky.
- DataLoader api:start/complete/error, NavigateAction, ErrorBoundary, CompoundComponent don't carry ariaName. Lower priority (HTTP/route/error events, not component identity).

## Engine bug found: Globals.xs rename
- Commit 46e4b6202 changed Main.xmlui.xs to local-only; globals now require Globals.xs
- [x] Renamed in xmlui-regression
- [x] Renamed in core-ssh-server-ui
- [ ] Report to xmlui team: breaking change needs migration guidance / backward compat

## Trace-tools: pushed upstream
- [x] All pushed to xmlui-org/trace-tools
- [x] Synced to all app repos
- [ ] Sync latest upstream (e2b5175) to all app repos (has superset schema check, --url flag)

## Trace-tools: known gaps
- [ ] Evaluate whether rehoming can be simplified now that some value:changes get i- prefix
- [ ] app:trace "filterEvents" reactive noise in semantic comparison — long [same,same,...] sequences differ in length between capture/replay. Should clean up.

## Cross-repo testing
- [x] xmlui-regression: 4/4 baselines pass
- [x] core-ssh-server-ui: green
- [ ] community-calendar pick-roundtrip: needs retry (failed due to network timeout on plane)

## ViewSource component
- [x] ViewSource with DataSource dataType="text" + Markdown + syntax highlighting via Shiki CDN
- [x] Added to all page components
- [x] Companion .md files for scripting/reactivity pages (component diagrams + narratives)
- [ ] Add descriptions to remaining pages as needed

## How-to patterns (from xmlui plan)
- [x] NavPanel + Pages navigation (pattern #36-43 area)
- [ ] Start adding more patterns from the plan
