```
ListContextMenuPage.xmlui
┌───────────────────────────────────────┐
│ List aria-label="Feature list"        │
│ ├─ HStack (per item)                  │
│ │  ├─ Icon                            │
│ │  ├─ Text (name)                     │
│ │  ├─ SpaceFiller                     │
│ │  └─ Badge (status)                  │
│ │  onContextMenu → featureMenu.openAt │
│ │                                     │
│ List aria-label="Grouped feature list"│
│   groupBy="status"                    │
│                                       │
│ ContextMenu "featureMenu"             │
│ ├─ MenuItem: Edit                     │
│ ├─ MenuItem: Duplicate                │
│ ├─ MenuSeparator                      │
│ └─ MenuItem: Archive                  │
└───────────────────────────────────────┘
```

Exercises List with custom item templates and ContextMenu with dynamic $context.

- **Custom item rendering** — each list item is an HStack with Icon, Text, SpaceFiller, and Badge, showing how to compose rich list rows
- **Context menu** — right-clicking a list item opens a ContextMenu with $context bound to the clicked item; menu actions update a status text
- **Grouped list** — the same data rendered with groupBy="status", showing automatic group headers
- **New components** — List, ContextMenu, MenuItem, MenuSeparator, Icon (not covered elsewhere)
