```
Main.xmlui                    Globals.xs
┌────────────────────────┐    ┌──────────────────┐
│ ChangeListener ────────│───►│ var userCount    │
│  guard: if (userCount  │    │ = null → 2       │
│    !== null) return    │    │ (set once)       │
└────────────────────────┘    └──────────────────┘
                                       │
LocalModsPage.xmlui                    │
┌──────────────────────────────────────┐
│ {userCount}                          │
│ Decrement / Increment / Reset        │
└──────────────────────────────────────┘
```

Tests that local mutations to a global .xs var persist without being overwritten.

- `userCount` is set once by the ChangeListener when the DataSource first loads. The guard (`if (userCount !== null) return`) prevents it from running again.
- After that, the Increment, Decrement, and Reset buttons mutate `userCount` directly. These mutations stick because the guard prevents the ChangeListener from clobbering them, even if the DataSource refetches.
- This pattern is useful when you want to seed a global var from server data but allow the user to modify it locally.
