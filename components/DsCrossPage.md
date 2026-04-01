```
Main.xmlui                     Globals.xs
┌─────────────────────────┐    ┌──────────────────┐
│ DataSource "appUsers"   │    │ var userCount    │
│ (component-local)       │    │                  │
└─────────────────────────┘    └──────────────────┘
                                        │
DsCrossPage.xmlui                       │
┌───────────────────────────────────────┐
│ users.value       ✗ not in scope      │
│ userCount         ✓ .xs var ──────────┘
│                                       │
│ └─ DsCrossChild.xmlui                 │
│    ┌─────────────────────────────┐    │
│    │ DataSource "childCountries" │    │
│    │ $props.passedCount  ← prop  │    │
│    │ userCount           ✓ .xs   │    │
│    └─────────────────────────────┘    │
└───────────────────────────────────────┘
```

Tests which state mechanisms cross component boundaries.

- **Test 1** — references `users` (a DataSource id from Main.xmlui) — out of scope because DataSource ids are component-local
- **Test 2** — references `userCount` from Globals.xs — works because .xs vars are global
- **Test 3** — DsCrossChild has its own DataSource and receives userCount two ways: via `$props.passedCount` (explicit) and directly from Globals.xs (implicit), proving both mechanisms work
