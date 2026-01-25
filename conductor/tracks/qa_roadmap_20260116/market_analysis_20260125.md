# Análisis de Mercado Laboral QA - 25 de Enero 2026

Este documento resume el análisis de 7 ofertas laborales actuales (EverPass, Azumo, Descartes, Blend, Sofka, dLocal y Scanntech) para alinear el plan de estudio con la demanda real.

## 1. Matriz de Habilidades Requeridas (Clústeres)

### 🤖 Frameworks de Automatización Web
El mercado está dividido entre herramientas legacy y modernas.
*   **Playwright:** Solicitado explícitamente por **Scanntech** (perfil Senior/Lead). Es la apuesta a futuro.
*   **Cypress:** Solicitado por **Descartes** y **Scanntech**.
*   **Selenium:** Solicitado por **dLocal** y **Scanntech**.
*   **General:** EverPass y Azumo piden "Automated tools" sin casarse con una, pero valoran el conocimiento de arquitectura.

**Conclusión:** Playwright cubre las capacidades modernas requeridas.

### 🐍 Lenguajes de Programación
Bifurcación clara entre empresas de producto vs. financieras.
*   **JavaScript / TypeScript:** Dominante en startups y productos modernos (**EverPass**, **Sofka**, **Blend**).
*   **Python:** Muy fuerte en backend y data (**Azumo**, **dLocal**).
*   **Java:** Tradicional en banca/fintech (**Azumo**, **Sofka**, **dLocal**).

**Conclusión:** TypeScript es nuestro core, pero **ignorar Python es un riesgo** para aplicar a empresas como dLocal o Azumo.

### 🔌 API Testing & Arquitectura (CRÍTICO)
Habilidad transversal obligatoria.
*   **REST API:** Descartes, dLocal, Scanntech.
*   **GraphQL:** **EverPass** lo pide específicamente.
*   **Herramientas:** Postman, SOAPUI, RestAssured.

**Conclusión:** No basta con UI. Se necesita validar JSON, códigos HTTP y contratos (GraphQL/REST).

### 🗄️ Bases de Datos & Data Quality
El QA ya no es solo "caja negra".
*   **SQL (Consultas complejas):** **Azumo**, **dLocal**, **EverPass** (MySQL).
*   **NoSQL:** Redis, MongoDB (**Azumo**, **EverPass**).
*   **Big Data:** Hadoop (**Azumo**).

**Conclusión:** Se requiere capacidad para inyectar y validar datos directamente en DB.

### ☁️ DevOps, CI/CD & Cloud
El entorno es parte del test.
*   **CI/CD:** Jenkins, GitHub Actions, GitLab (**EverPass**, **Descartes**, **dLocal**, **Scanntech**).
*   **Docker:** **EverPass**, **Azumo**.
*   **Cloud:** AWS/Azure (**Azumo**, **dLocal**, **Scanntech**, **Blend**).
*   **Métricas DORA:** **Scanntech** pide medir frecuencia de despliegue y lead time.

### 🚀 Performance
*   **Load Testing:** **Azumo**, **dLocal** (JMeter/LoadRunner).

---

## 2. Gap Analysis (Nuestro Plan vs. Mercado)

| Área | Estado Actual | Veredicto | Acción Requerida |
| :--- | :--- | :--- | :--- |
| **Web UI (Playwright)** | ✅ Fase 1 y 2 (Sólido) | Cubierto. | Continuar con POM avanzado. |
| **API Testing** | ⚠️ Fase 4 (Incompleto) | **Crítico.** | Agregar GraphQL y pruebas de integración pura (sin UI). |
| **SQL / Datos** | ⚠️ Fase 4 (Vago) | **Falta detalle.** | Agregar ejercicios de validación SQL vs UI. |
| **Lenguajes (Python)** | ❌ No existe | **Brecha.** | Introducir módulo "Python for QA". |
| **Performance** | ❌ No existe | **Falta.** | Introducir pruebas de carga básicas (k6 o Playwright perf). |
| **Docker** | ⚠️ Fase 4 (Mencionado) | **Falta rigor.** | Hacer Docker obligatorio para ejecutar los tests. |

---

## 3. Recomendaciones para el Plan de Estudio

1.  **Reforzar Fase 3 (CI/CD):**
    *   Implementar Dockerfile para correr los tests en un contenedor aislado (Requisito EverPass).
    *   Integrar reporte de métricas básicas en GitHub Actions.

2.  **Expandir Fase 4 (API & Data):**
    *   Incluir módulo específico de **GraphQL** (Queries/Mutations).
    *   Crear utilidad de conexión a DB (SQLite mock) para aserciones de datos.

3.  **Crear Fase 5: Polyglot & Performance (Nueva):**
    *   **Python Crash Course:** Traducir 1 test suite de TS a Python para demostrar versatilidad.
    *   **Performance:** Pruebas de carga básicas a la API.
