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

## Engine: push changes upstream
3 commits on ~/xmlui main, not pushed:
- Inherit interaction traceId for synchronous value:changes (no push/pop)
- Add ariaName to all trace events (9 files: wrapComponent, Form, Select, Tabs, Tree, Table, NavGroup, Accordion, ConfirmationModal)
- Move data:bind emission after aria-label cascade
Actions:
- [ ] Push branch judell/wrap-component-10 and open PR
- [ ] Document tradeoffs: engine vs trace-tools responsibility for traceId attribution

## Engine: known gaps
- Async value:changes (Playwright fill() between interactions) still get t- prefix. Trace-tools rehoming still needed. Time-window heuristic rejected as too risky.
- DataLoader api:start/complete/error, NavigateAction, ErrorBoundary, CompoundComponent don't carry ariaName. Lower priority (HTTP/route/error events, not component identity).

## Engine bug found: Globals.xs rename
- Commit 46e4b6202 changed Main.xmlui.xs to local-only; globals now require Globals.xs
- [x] Renamed in xmlui-regression
- [x] Renamed in core-ssh-server-ui
- [ ] Report to xmlui team: breaking change needs migration guidance / backward compat

## Trace-tools: push changes upstream
2 commits on ~/trace-tools main, not pushed:
- Fix distiller keydown collapse, generator fill plan, add FileInput distiller support
- Tolerate empty API results in startup assertions
Actions:
- [ ] Push to xmlui-org/trace-tools
- [x] Synced to all app repos (xmlui-regression, core-ssh-server-ui, community-calendar/santarosa)

## Trace-tools: known gaps
- [ ] Evaluate whether rehoming can be simplified now that some value:changes get i- prefix
- [ ] app:trace "filterEvents" reactive noise in semantic comparison — long [same,same,...] sequences differ in length between capture/replay. Should clean up.

## Cross-repo testing
- [x] xmlui-regression: 4/4 baselines pass
- [x] core-ssh-server-ui: green
- [ ] community-calendar pick-roundtrip: needs retry (failed due to network timeout on plane)

## How-to patterns (from xmlui plan)
- [x] NavPanel + Pages navigation (pattern #36-43 area)
- [ ] Start adding more patterns from the plan
