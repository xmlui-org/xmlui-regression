# TODO

## Baselines to recapture (NavPanel refactor)
3 of 12 done. Remaining:
- [ ] select-filter
- [ ] toggle-settings
- [ ] tab-switch (now nav-switch)
- [ ] chart-interact
- [ ] search-filter
- [ ] london-tube
- [ ] delete-cancel
- [ ] edit-cancel
- [ ] validation-roundtrip

## Engine: wrapComponent traceId inheritance
- [x] Inherit i- traceId for synchronous value:change during interactions
- [x] Skip push/pop to avoid premature trace end
- [x] Confirmed: no time-window heuristic (too risky)
- [ ] Push branch judell/wrap-component-10 and open PR
- [ ] Copy updated engine to core-ssh-server-ui and community-calendar
- [ ] Document tradeoffs: engine vs trace-tools responsibility for traceId attribution

## Engine bug found: Globals.xs rename
- Commit 46e4b6202 changed Main.xmlui.xs to local-only; globals now require Globals.xs
- [x] Renamed in xmlui-regression
- [x] Renamed in core-ssh-server-ui
- [ ] Report to xmlui team: breaking change needs migration guidance / backward compat

## Trace-tools fixes (still needed alongside engine fix)
- [x] Distiller: don't coalesce consecutive button clicks with valueChanges (only keydowns)
- [x] Generator: only consume fill plan when next step is actual typing
- [ ] Evaluate whether rehoming can be simplified now that some value:changes get i- prefix
- [ ] Sync trace-tools changes to other repos (core-ssh-server-ui, community-calendar)

## How-to patterns (from xmlui plan)
- [x] NavPanel + Pages navigation (pattern #36-43 area)
- [ ] Start adding more patterns from the plan
