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

<video src="traces/videos/add-user.webm" controls></video>

### edit-user

Click Edit on an existing user, modify the name in the pre-filled form, save. Verifies modal parameter passing and PUT mutation.

<video src="traces/videos/edit-user.webm" controls></video>

### delete-user-confirm

Click Delete on a user, confirm in the confirmation dialog. Verifies confirmation flow and DELETE mutation with DataSource refetch.

<video src="traces/videos/delete-user-confirm.webm" controls></video>

### tab-switch

Navigate between Users, Settings, and About tabs. Verifies tab switching with focus:change events.

<video src="traces/videos/tab-switch.webm" controls></video>

### select-filter

Add a user (creates one with no phone), then use the phone filter dropdown to switch between "Has phone" and "No phone" views. Verifies Select interaction tracing and filtered table updates.

<video src="traces/videos/select-filter.webm" controls></video>

## Architecture

- `Main.xmlui` / `Main.xmlui.xs` — the app markup and code-behind
- `api.json` — mock API definition (MSW intercepts `/api/*`)
- `config.json` — app config including apiInterceptor and xsVerbose
- `traces/baselines/` — distilled journey baselines (source of truth)
- `trace-tools/` — shared test infrastructure
- `xmlui/` — standalone engine build + inspector
