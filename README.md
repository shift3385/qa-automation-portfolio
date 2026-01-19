# 🎭 QA Automation Portfolio - E-Commerce

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

Un marco de automatización de pruebas profesional para E-Commerce (SauceDemo), construido con las mejores prácticas de la industria: **Page Object Model (POM)**, **Data-Driven Testing**, y **Monitoreo de Desempeño**.

---

## 📍 Roadmap Timeline

```text
START 🏁
 |
 |--- ✅ PHASE 1: ENVIRONMENT & ARCHITECTURE [COMPLETED]
 |    |-- [x] Project Scaffolding (Setup Playwright, TS, Lint)
 |    |-- [x] Theoretical Foundation (ISTQB, Test Design)
 |
 |--- 🚧 PHASE 2: CORE FLOW IMPLEMENTATION [IN PROGRESS]
 |    |-- [x] Authentication Flow (Login POM, Data-Driven)
 |    |-- [ ] Product Search & Navigation
 |    |-- [ ] Checkout Process
 |
 |--- 📅 PHASE 3: INTEGRATION & REPORTING [PENDING]
 |    |-- [ ] GitHub Actions (CI/CD)
 |    |-- [ ] Quality Metrics & Review
 |
 END 🏆
```

## 🚀 Características Clave

*   **Arquitectura Escalable:** Implementación estricta de **Page Object Model (POM)** para separar la lógica de prueba de la interfaz de usuario.
*   **Data-Driven:** Datos de prueba desacoplados en archivos JSON para escenarios flexibles (Usuarios válidos, bloqueados, inválidos).
*   **Performance Awareness:** Alertas automáticas en el reporte si la carga de páginas excede los **3000ms** (UX Standards), sin romper la prueba funcional.
*   **Código Limpio:** Configuración estricta de **ESLint** siguiendo la Guía de Estilo de Google.
*   **Knowledge Base:** Bitácora de aprendizaje detallada en `learning_log/`.

## 🛠️ Stack Tecnológico

*   **Framework:** Playwright (Node.js)
*   **Lenguaje:** TypeScript
*   **Linting:** ESLint (Google Style)
*   **Gestión de Tareas:** Conductor (Spec-driven development)

## 📂 Estructura del Proyecto

```bash
├── data/           # Archivos JSON para Data-Driven Testing
├── pages/          # Clases Page Objects (POM)
├── tests/          # Scripts de prueba (Specs)
├── utils/          # Funciones auxiliares
├── learning_log/   # Documentación de conceptos aprendidos
└── conductor/      # Gestión del proyecto y tracks
```

## ⚡ Quick Start

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Ejecutar todas las pruebas (Headless):**
    ```bash
    npm test
    ```

3.  **Verificar Calidad de Código:**
    ```bash
    npm run lint
    ```

4.  **Ejecutar con Interfaz Gráfica (Debug):**
    ```bash
    npx playwright test --headed
    ```

---
*Desarrollado como parte de un track de formación profesional en QA Automation.*
