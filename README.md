# Playwright Overview

Using the [Playwright Chrome driver](https://replay.io/docs/getting-started), you're able to easily integrate Replay into your Playwright tests:

```bash
npx playwright test --project replay-chromium
```

## Getting Started

### 1. Create a New Test Suite Team
Start by visiting our [new test suite form](https://replay.io/docs/getting-started). It will create an API key and guide you through each step.


### 2. Install the Replay Playwright Plugin
To install the plugin, run the following command:

```bash
npm install --save-dev @replayio/playwright
```

You can also use yarn, pnpm, or bun depending on your package manager preference.

### 3. Install the Replay Browser
Next, install the Replay browser with the following command:

```bash
npx replayio install
```

### 4. Save Your API Key
To use your API key, you can either use the [dotenv package](https://www.npmjs.com/package/dotenv) and save it to a `.env` file or add the API key to your environment directly.

```env
REPLAY_API_KEY=<your_api_key>
```

### 5. Update playwright.config.js
Update your `playwright.config.js` to include the Replay plugin.

In your `playwright.config.js`:

```javascript
import { PlaywrightTestConfig, devices } from "@playwright/test";
import { devices as replayDevices, replayReporter } from "@replayio/playwright";
import "dotenv/config";

const config: PlaywrightTestConfig = {
  reporter: [
    replayReporter({
      apiKey: process.env.REPLAY_API_KEY,
      upload: true,
    }),
    ["line"],
  ],
  projects: [
    {
      name: "replay-chromium",
      use: { ...replayDevices["Replay Chromium"] },
    },
  ],
};

export default config;
```

### 6. Record Your Test
With everything set up, you can now run:

```bash
npx playwright test --project replay-chromium
```

This command will record and upload your first Playwright replays.


> **Check out [this replay](https://replay.io/docs/debugging) for a detailed walkthrough on debugging a flaky Playwright test.**

## Record Your Test Suite in CI

Now that you're ready to inspect your local tests, the next step is to record your tests in CI. Learn how to set up Replay with your Playwright tests on [GitHub Actions](https://replay.io/docs/github-actions) and other CI providers.

### GitHub Actions with Playwright

Now that the Playwright config is set up, you can run the tests with `npx playwright test`. At this point, we'll add a simple GitHub action `workflow.yml` file to run and upload the tests for pushes and pull requests.

```yaml
name: End-to-end tests
on:
  pull_request:
    push:
      branches: [main]
jobs:
  e2e-tests:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      # If you're using Yarn or PNPM, use the appropriate install command here
      - name: Install dependencies
        run: npm ci
      - name: Install Replay Chromium
        run: npx replayio install
      - name: Run Playwright tests
        run: npx playwright test --project replay-chromium
        env:
          REPLAY_API_KEY: ${{ secrets.REPLAY_API_KEY }}
```

Finally, add the workspace API key you were given to the GitHub repo settings as `REPLAY_API_KEY`, so that the CI job uploads to the right workspace.

---

For more information, check out the [Replay Documentation](https://replay.io/docs/).
