# Phase 3: Integration, Reporting & Containerization

## 1. Containerization Strategy (Docker)
**Goal:** Eliminate the "it works on my machine" problem by standardizing the execution environment.

### 1.1 Dockerfile
We utilize the official Playwright image to ensure all browser dependencies are pre-installed at the system level.
- **Base Image:** `mcr.microsoft.com/playwright:v1.57.0-jammy` (Matched to `package.json` version).
- **Optimization:** We copy `package.json` and run `npm ci` *before* copying the rest of the code. This leverages Docker Layer Caching; if we only change test files, we don't need to reinstall `node_modules`.

### 1.2 Docker Compose
Orchestrates the test runner.
- **Service:** `e2e-tests`
- **Volumes:**
    - `.:/app`: Code sync.
    - `qa-automation-node-modules:/app/node_modules`: Anonymous volume to prevent Windows/Linux binary conflicts in `node_modules`.
    - `./playwright-report:/app/playwright-report`: Persists the HTML report to the host machine.
- **Network:** Isolated default network.

**Command to Run Locally:**
```bash
docker-compose up --build
```

---

## 2. CI/CD Pipeline (GitHub Actions)
**Goal:** Automate testing on every code change using the exact same Docker container as local development.

### 2.1 Workflow: `docker-ci.yml`
Unlike the standard Playwright action which installs browsers on the VM, this workflow:
1.  Builds the `Dockerfile`.
2.  Runs `docker-compose up`.
3.  Uses `--exit-code-from e2e-tests` to propagate the test result (Pass/Fail) to GitHub Actions.

**Benefits:**
- **Consistency:** The CI environment is binary-identical to the local Docker environment.
- **Debuggability:** If it fails in CI, you can reproduce it locally by running `docker-compose up`.

## 3. How to Run Tests Locally

### 3.1 Native Execution (Windows/Host)
Use these commands if you have Node.js and Playwright browsers installed directly on your machine.
- **Run all tests:** `npm test`
- **Run a specific test file:** `npx playwright test tests/login.spec.ts`
- **Run in Headed mode (UI):** `npx playwright test --headed`
- **Show Report:** `npx playwright show-report`

### 3.2 Docker Execution
Use these commands to run tests inside the standardized container.
- **Run all tests (Rebuild if needed):** `docker-compose up --build`
- **Run tests and auto-remove container:** `docker-compose run --rm e2e-tests`

---

## 4. Reporting
We configured volume mapping so that after a test run (Local or Docker), the `playwright-report/` folder is populated.
- **Local:** Open `playwright-report/index.html`.
- **CI:** Download the `docker-playwright-report` artifact from the GitHub Actions run summary.

---

## 4. Key Concepts & FAQ

### 4.1 Does Docker read from Git or Local Disk?
- **Local (`docker-compose up`):** Docker reads directly from your **local hard drive** via the bind mount (`.:/app`). Changes are reflected instantly without needing to commit.
- **CI (GitHub Actions):** Docker reads from the **Git checkout**. It only sees code that has been pushed to the repository.

### 4.2 Why is the Docker Image so large (~1GB+)?
The image includes:
1.  **Ubuntu (Jammy):** A full Linux OS.
2.  **Node.js:** Runtime environment.
3.  **Browsers:** Chromium, Firefox, and WebKit (the heaviest part).
4.  **System Dependencies:** Libraries (GStreamer, codecs, fonts) required for browsers to render correctly.

### 4.3 Can we use Alpine Linux?
**No.** While Alpine is smaller, it uses `musl` libc instead of `glibc`. Mainstream browsers (Chrome/Firefox) rely heavily on `glibc`.
- **Issues:** Installing browsers on Alpine is notoriously unstable and prone to crashes ("flaky tests").
- **Decision:** We stick to the official Ubuntu-based image for **stability and reliability**, which is the priority in QA Automation.