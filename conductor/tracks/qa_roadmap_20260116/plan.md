# Implementation Plan: Phase 1 - Foundation & Playwright Core

## Phase 1: Environment & Architecture Setup [checkpoint: 2f244c5]
Establishing the tools and the framework skeleton.

- [x] Task: Project Scaffolding 68dc8a0
    - [ ] Initialize Node.js project and install Playwright.
    - [ ] Configure TypeScript and ESLint according to style guides.
    - [ ] Create the directory structure for POM (pages, tests, utils, data).
- [x] Task: Theoretical Foundation - Test Design 4b975b1
    - [ ] Study and summarize ISTQB Test Design Techniques (Equivalence Partitioning, BVA).
    - [ ] Apply these techniques to design test cases for the Login flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Environment & Architecture Setup' (Protocol in workflow.md)

## Phase 2: Core Flow Implementation
Building the first automated scenarios.

- [x] Task: Authentication Flow (POM) dabb72e
    - [ ] Write tests for the Login functionality.
    - [ ] Implement Page Objects for Login page.
    - [ ] Implement data-driven approach for different user types (Valid, Invalid, Locked).
- [x] Task: Checkout E2E Flow (The Crown Jewel)
    - [x] Implement Page Objects for Overview and Completion pages.
    - [x] Write the full End-to-End test scenario with professional assertions.
- [x] Task: Product Search & Navigation 767964c
    - [ ] Write tests for searching and filtering products.
    - [ ] Implement Page Objects for Search and Catalog.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Core Flow Implementation' (Protocol in workflow.md) 767964c

## Phase 3: Integration, Reporting & Containerization
Connecting the framework to the ecosystem.

- [ ] Task: Containerization (Docker)
    - [ ] Create `Dockerfile` and `docker-compose.yml` (Critical for EverPass/Azumo).
    - [ ] Ensure tests run successfully inside the container.
- [ ] Task: GitHub Actions Integration
    - [ ] Create a `.github/workflows` file to run tests on every push.
    - [ ] Integrate Docker execution within the pipeline.
    - [ ] Configure artifact storage for test reports.
- [ ] Task: Quality Metrics
    - [ ] Document framework metrics (Execution time, pass/fail rate).
    - [ ] Review Test Management theory (Defect lifecycle).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration & Reporting' (Protocol in workflow.md)

## Phase 4: API & Data Strategy (Market Alignment)
Expanding skills to match current job offers (EverPass, dLocal, Descartes).

- [ ] Task: API Testing Foundation (REST & GraphQL)
    - [ ] Study REST vs GraphQL principles (EverPass requirement).
    - [ ] Implement API tests using Playwright's `APIRequestContext`.
    - [ ] Create a GraphQL Query/Mutation test.
- [ ] Task: Database Validation (SQL)
    - [ ] Setup a local mock database (SQLite).
    - [ ] Write SQL queries to validate test data creation.
    - [ ] Implement a helper to check DB state from Playwright tests.

## Phase 5: Polyglot & Performance (Advanced)
Differentiating factors for Senior roles (Azumo, dLocal).

- [ ] Task: Python Bridge
    - [ ] "Crash Course": Port one TS test suite to Python using Playwright-Python.
    - [ ] Compare syntax and ecosystem differences.
- [ ] Task: Performance Basics
    - [ ] Implement load testing basics (measure API response times under stress).
    - [ ] Explore k6 integration or Playwright perf-metrics.