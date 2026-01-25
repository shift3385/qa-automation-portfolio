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
- [~] Task: Product Search & Navigation
    - [ ] Write tests for searching and filtering products.
    - [ ] Implement Page Objects for Search and Catalog.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Flow Implementation' (Protocol in workflow.md)

## Phase 3: Integration & Reporting
Connecting the framework to the ecosystem.

- [ ] Task: GitHub Actions Integration
    - [ ] Create a `.github/workflows` file to run tests on every push.
    - [ ] Configure artifact storage for test reports.
- [ ] Task: Quality Metrics & ISTQB Review
    - [ ] Document framework metrics (Execution time, pass/fail rate).
    - [ ] Review Test Management theory (Defect lifecycle).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration & Reporting' (Protocol in workflow.md)

## Phase 4: Market Alignment (API & Data) [New!]
Expanding skills to match current job offers (EverPass, dLocal, Descartes).

- [ ] Task: API Testing Foundation
    - [ ] Study REST vs GraphQL principles.
    - [ ] Implement API tests using Playwright's APIRequestContext (replacing Postman for automation).
    - [ ] Validate Backend-Frontend integration.
- [ ] Task: Database Validation (SQL)
    - [ ] Setup a local mock database (SQLite).
    - [ ] Write SQL queries to validate test data creation.
    - [ ] Implement a helper to check DB state from Playwright tests.
- [ ] Task: CI/CD & Containerization
    - [ ] Dockerize the testing environment (EverPass/Azumo requirement).
    - [ ] Optimize GitHub Actions for parallel execution.
