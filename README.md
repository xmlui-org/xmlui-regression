# xmlui-regression

Regression test suite for the XMLUI framework. Uses [trace-tools](https://github.com/xmlui-org/trace-tools) to capture user journeys as baselines and replay them as Playwright tests with semantic comparison.

The app is a CRUD interface backed by an in-browser mock API (MSW). It exercises core XMLUI components and patterns: forms, modals, tables, tabs, selects, confirmation dialogs, validation, and DataSource reactivity.

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

### add-user

Open the Add User modal, submit an empty form (triggers validation), fill name and email, submit successfully. Verifies form validation and POST mutation.

<details>
<summary>Video</summary>

_Upload video here_

</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

These steps are automatically distilled from a raw XMLUI trace capture. The distiller extracts semantic user actions from thousands of low-level engine events, collapsing keystrokes into fill operations and pairing API calls with their triggers.

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

_Upload video here_

</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

These steps are automatically distilled from a raw XMLUI trace capture. The distiller extracts semantic user actions from thousands of low-level engine events, collapsing keystrokes into fill operations and pairing API calls with their triggers.

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

_Upload video here_

</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

These steps are automatically distilled from a raw XMLUI trace capture. The distiller extracts semantic user actions from thousands of low-level engine events, collapsing keystrokes into fill operations and pairing API calls with their triggers.

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | button "Delete Leanne Graham" | Confirmation dialog: "Confirm Operation" → Yes, DELETE /api/users/1 |

</details>

### tab-switch

Navigate between Users, Settings, and About tabs. Verifies tab switching with focus:change events.

<details>
<summary>Video</summary>

_Upload video here_

</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

These steps are automatically distilled from a raw XMLUI trace capture. The distiller extracts semantic user actions from thousands of low-level engine events, collapsing keystrokes into fill operations and pairing API calls with their triggers.

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | tab "Settings" | Switch to Settings tab |
| 2 | click | tab "About" | Switch to About tab |

</details>

### select-filter

Add a user (creates one with no phone), then use the phone filter dropdown to switch between "Has phone" and "No phone" views. Verifies Select interaction tracing and filtered table updates.

<details>
<summary>Video</summary>

_Upload video here_

</details>

<details>
<summary>Distilled steps (from raw trace)</summary>

These steps are automatically distilled from a raw XMLUI trace capture. The distiller extracts semantic user actions from thousands of low-level engine events, collapsing keystrokes into fill operations and pairing API calls with their triggers.

| # | Action | Target | Details |
|---|--------|--------|---------|
| 1 | click | button "Add User" | Opens modal |
| 2 | fill | textbox "Name" | `a` |
| 3 | fill | textbox "Email" | `b@c.d` |
| 4 | click | button "Save" | POST /api/users |
| 5 | click | option "Has phone" | Filter: filteredUsers 0 → 2 (+Leanne Graham, +Ervin Howell) |
| 6 | click | option "No phone" | Filter: filteredUsers 2 → 1 (+a, -Leanne Graham, -Ervin Howell) |

</details>

## Architecture

- `Main.xmlui` / `Main.xmlui.xs` — the app markup and code-behind
- `api.json` — mock API definition (MSW intercepts `/api/*`)
- `config.json` — app config including apiInterceptor and xsVerbose
- `traces/baselines/` — distilled journey baselines (source of truth)
- `trace-tools/` — shared test infrastructure
- `xmlui/` — standalone engine build + inspector
