```
Main.xmlui                     Globals.xs
┌─────────────────────────┐    ┌──────────────────┐
│ DataSource "appUsers"   │    │ var userCount    │
│ global globalUserCount  │    │                  │
│ variable variableUserCt │    │                  │
│ ChangeListener ─────────│───►│ = null → 2       │
└─────────────────────────┘    └──────────────────┘
                                        │
VarTypesPage.xmlui                      │
┌───────────────────────────────────────┐
│ DataSource "localUsers"               │
│ variable localVar                     │
│                                       │
│ 1. localVar           ✓ local var     │
│ 2. globalUserCount    ✓ global        │
│ 3. userCount          ✓ .xs var ──────┘
│ 4. variableUserCount  ✗ not in scope  │
│                                       │
│ └─ UserCountDisplay.xmlui             │
│    └─ userCount       ✓ .xs var       │
└───────────────────────────────────────┘
```

Four reactive state mechanisms compared side by side:

- **variable** — local to this component, subscribes to its DataSource
- **global** — declared in Main.xmlui, visible everywhere, subscribes to the App-level DataSource
- **.xs var** — declared in Globals.xs, set via ChangeListener when the App-level DataSource loads
- **variable from Main** — declared in Main.xmlui with `variable`, tests whether it leaks into child components (it should not)
