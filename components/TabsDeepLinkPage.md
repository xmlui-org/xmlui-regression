```
TabsDeepLinkPage.xmlui
┌───────────────────────────────────────┐
│ Tabs id="mainTabs"                    │
│ activeTab ← $queryParams.tab          │
│                                       │
│ ├─ TabItem "Overview"  (id=overview)  │
│ │  └─ Badge                           │
│ ├─ TabItem "Details"   (id=details)   │
│ │  └─ List (static data)              │
│ └─ TabItem "Settings"  (id=settings)  │
│    └─ Checkbox × 2                    │
│                                       │
│ Programmatic nav:                     │
│   setActiveTabById(), prev(), next()  │
└───────────────────────────────────────┘
```

Exercises the Tabs component with three tab panels containing different component types.

- **Tab switching** — clicking tab headers swaps content; `onDidChange` reports the index and label
- **Deep linking** — `activeTab` reads `$queryParams.tab` so `?tab=1` opens the Details panel directly
- **Programmatic navigation** — buttons call `setActiveTabById()`, `prev()`, and `next()` on the Tabs id
- **New components** — Badge, List, Checkbox (not covered elsewhere in the regression app)
