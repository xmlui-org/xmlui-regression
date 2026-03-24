# xmlui-regression

Regression test suite for the XMLUI framework. Relies on traces emitted by the XMLUI engine when `xsVerbose` is on, and [trace-tools](https://github.com/xmlui-org/trace-tools) to capture user journeys as baselines and replay them as Playwright tests with semantic comparison.

The app is a CRUD interface backed by an in-browser mock API (MSW). It exercises core XMLUI components and patterns: forms, modals, tables, tabs, selects, confirmation dialogs, validation, and DataSource reactivity.

See the live app [here](https://xmlui-org.github.io/xmlui-regression/) (and click the Inspector icon to see and interact with the traces).

See the CI runs [here](https://github.com/xmlui-org/xmlui-regression/actions).

## Running tests

```bash
# Start the app server
python3 -m http.server 8000 &

# Install trace-tools dependencies (first time)
cd trace-tools && npm install && npx playwright install chromium && cd ..

# Run all regression tests
./test.sh run-all

# Run a single test
./test.sh run add-user

# List available tests
./test.sh list
```

## Journeys

> [!NOTE]
> Each journey's distilled steps are automatically extracted from a raw XMLUI trace capture. The distiller reduces thousands of low-level engine events to semantic user actions, collapsing keystrokes into fill operations and pairing API calls with their triggers. These distilled steps then drive automatic Playwright test generation — no hand-written test code required.

### add-user

Open the Add User modal, submit an empty form (triggers validation), fill name and email, submit successfully. Verifies form validation and POST mutation.

<details>
<summary>Video</summary>

[add-user.webm](https://github.com/user-attachments/assets/9ffbc1fa-4a1a-47c4-9210-cf701ad30e7a)


</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | button "Add User" | Opens modal |
| 2 | click | button "Save" | Triggers validation: 2 errors (name, email) |
| 3 | fill | textbox "Name" | `jon` |
| 4 | fill | textbox "Email" | `jon@c.y` |
| 5 | click | button "Save" | Submits form, POST /api/users |

</details>

### edit-user

Click Edit on an existing user, modify the name in the pre-filled form, save. Verifies modal parameter passing and PUT mutation.

<details>
<summary>Video</summary>

[edit-user.webm](https://github.com/user-attachments/assets/69068cd7-ea3f-4004-80f6-f04b32df3aab)


</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | button "Edit Leanne Graham" | Opens edit modal with pre-filled data |
| 2 | fill | textbox "Name" | `Leanne Graham2` |
| 3 | click | button "Save" | Submits form, PUT /api/users/1 |

</details>

### delete-user-confirm

Click Delete on a user, confirm in the confirmation dialog. Verifies confirmation flow and DELETE mutation with DataSource refetch.

<details>
<summary>Video</summary>

[delete-user-confirm.webm](https://github.com/user-attachments/assets/bc33b4c6-3913-459f-8f28-b788e6367e98)


</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | button "Delete Leanne Graham" | Confirmation dialog: "Confirm Operation" → Yes, DELETE /api/users/1 |

</details>

### tab-switch

Navigate between Users, Settings, and About tabs. Verifies tab switching with focus:change events.

<details>
<summary>Video</summary>

[tab-switch.webm](https://github.com/user-attachments/assets/67149c53-88ac-41c2-9f8e-33742fc1fee8)


</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | tab "Settings" | Switch to Settings tab |
| 2 | click | tab "About" | Switch to About tab |

</details>

### select-filter

Add a user (creates one with no phone), then use the phone filter dropdown to switch between "Has phone" and "No phone" views. Verifies Select interaction tracing and filtered table updates.

<details>
<summary>Video</summary>
[select-filter.webm](https://github.com/user-attachments/assets/f8a2c624-cdcf-4044-b57a-8e49fb4e7401)


</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | button "Add User" | Opens modal |
| 2 | fill | textbox "Name" | `a` |
| 3 | fill | textbox "Email" | `b@c.d` |
| 4 | click | button "Save" | POST /api/users |
| 5 | click | option "Has phone" | Filter: filteredUsers 0 → 2 (+Leanne Graham, +Ervin Howell) |
| 6 | click | option "No phone" | Filter: filteredUsers 2 → 1 (+a, -Leanne Graham, -Ervin Howell) |

</details>

### toggle-settings

Switch to Settings tab, toggle the Show email switch, decrease Items per page, type notes, save. Verifies Form with Switch, NumberBox, and TextArea bindings plus form submit.

<details>
<summary>Video</summary>

[toggle-settings.webm](https://github.com/user-attachments/assets/d53b3912-f625-413e-90c6-811370257fb1)


</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | tab "Settings" | Switch to Settings tab |
| 2 | click | switch | Toggle Show email |
| 3 | click | button "Decrease Items per page" | NumberBox spin button |
| 4 | fill | textbox "Notes" | `xxx` |
| 5 | click | button "Save Settings" | Form submit |

</details>

## Architecture

- `Main.xmlui` / `Main.xmlui.xs` — the app markup and code-behind
- `api.json` — mock API definition (MSW intercepts `/api/*`)
- `config.json` — app config including apiInterceptor and xsVerbose
- `traces/baselines/` — distilled journey baselines (source of truth)
- `trace-tools/` — shared test infrastructure
- `xmlui/` — standalone engine build + inspector
