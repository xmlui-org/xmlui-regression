```
Main.xmlui                    Globals.xs
┌────────────────────────┐    ┌──────────────────┐
│ DataSource "appUsers"  │    │ var userCount    │
│ ChangeListener ────────│───►│ = null → 2       │
└────────────────────────┘    └──────────────────┘
                                       │
ChangeListenerPage.xmlui               │
┌──────────────────────────────────────┐
│ {userCount} users                    │
│ Button: Decrement                    │
│                                      │
│ └─ UserCountDisplay.xmlui            │
│    └─ {userCount}                    │
└──────────────────────────────────────┘
```

Demonstrates the ChangeListener pattern for bridging async data into global state.

- In Main.xmlui, a ChangeListener watches `appUsers.value` (the App-level DataSource). When it loads, the handler sets `userCount` (a Globals.xs var, initially null) to the array length.
- This page reads `userCount` and lets you mutate it via Decrement. The mutation is direct: `userCount = userCount - 1`.
- UserCountDisplay is a child component that also reads `userCount`, proving the .xs var is visible across component boundaries.
