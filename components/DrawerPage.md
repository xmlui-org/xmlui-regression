```
DrawerPage.xmlui
┌───────────────────────────────────────┐
│ Button: Open left / right / bottom    │
│ Button: Open settings                 │
│                                       │
│ Drawer "leftDrawer"   position=left   │
│ Drawer "rightDrawer"  position=right  │
│ Drawer "bottomDrawer" position=bottom │
│ Drawer "settingsDrawer" position=right│
│   └─ Checkbox × 2, Slider            │
└───────────────────────────────────────┘
```

Exercises the Drawer component sliding in from different edges.

- **Positions** — left, right, and bottom drawers opened via buttons, closed via close button or click-away
- **Events** — onOpen and onClose update a status text showing which drawer fired
- **Form content** — the settings drawer contains Checkbox and Slider controls, exercising interactive components inside a drawer
- **New components** — Drawer, Slider (not covered elsewhere in the regression app)
