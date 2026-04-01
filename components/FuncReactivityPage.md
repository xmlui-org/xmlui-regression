```
Globals.xs                    FuncReactivityPage.xmlui
┌────────────────────────┐    ┌──────────────────────────┐
│ var userCount          │    │ Test 1: getUserCount()   │
│ var threshold          │    │ Test 2: isAboveThreshold │
│ var xsCounter          │    │ Test 3: formatCount(     │
│                        │    │         getUserCount())  │
│ getUserCount()         │    │ Test 4: incrementCounter │
│ isAboveThreshold()     │    │         getCounter()     │
│ formatCount(n)         │    │                          │
│ incrementCounter()     │    │ UserCountDisplay.xmlui   │
│ getCounter()           │    │  └─ reads userCount      │
└────────────────────────┘    └──────────────────────────┘
```

Tests that binding expressions calling Globals.xs functions re-evaluate when their dependencies change.

- **Test 1** — getUserCount() returns the .xs var userCount; the display is reactive to changes
- **Test 2** — isAboveThreshold() calls getUserCount() and compares to threshold; the two buttons set threshold to 1 or 5, which should flip ABOVE/BELOW since userCount starts at 2
- **Test 3** — formatCount(getUserCount()) chains two Globals.xs functions; verifies nested reactive dependencies
- **Test 4** — the Increment button calls incrementCounter() which mutates xsCounter; getCounter() reads it back; verifies that function-mediated mutation triggers re-render
