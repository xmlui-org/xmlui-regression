# xmlui-regression

Regression test suite for the XMLUI framework. Relies on traces emitted by the XMLUI engine when `xsVerbose` is on, and [trace-tools](https://github.com/xmlui-org/trace-tools) to capture user journeys as baselines and replay them as Playwright tests with semantic comparison.

The app exercises core XMLUI components and patterns: forms, modals, tables, tabs, selects, confirmation dialogs, validation, and DataSource reactivity.

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

Each journey's distilled steps are automatically extracted from a raw XMLUI trace capture. The distiller reduces thousands of low-level engine events to semantic user actions, collapsing keystrokes into fill operations and pairing API calls with their triggers. These distilled steps then drive automatic Playwright test generation — no hand-written test code required.

### add-user

Open the Add User modal, submit an empty form (triggers validation), fill name and email, submit successfully. Verifies form validation and POST mutation.

<details>
<summary>Video</summary>

[add-user.webm](https://github.com/user-attachments/assets/cda07f19-9021-4966-9953-aa6eafb954c2)



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

