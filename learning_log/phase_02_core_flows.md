# Bitácora de Aprendizaje - Fase 2: Flujos Principales y POM
**Fecha:** 18 de Enero, 2026
**Estado:** En Progreso (Tarea de Autenticación Completada)

## 1. Conceptos Clave de esta Etapa

### Page Object Model (POM)
...

### Monitoreo de Desempeño (Performance Annotations)
Aprendimos a diferenciar entre una **Prueba Funcional** y un **Monitoreo de UX**.
*   **Concepto**: No fallamos la prueba si el sistema es lento (para no generar ruido innecesario), pero dejamos una **Anotación** en el reporte.
*   **Umbral Crítico**: 3000ms (3 segundos). Es el estándar de oro para la retención de usuarios en la web.
*   **Herramienta**: Usamos `Date.now()` para medir y `test.info().annotations.push()` para registrar la alerta sin romper el flujo.

### Ciclo TDD (Red-Green-Refactor)
...

## 2. Lecciones Aprendidas en el Debugging
*   **Entorno:** Los firewalls (como Simplewall) pueden bloquear a Playwright. Siempre verificar la conexión si hay errores `ERR_NETWORK_ACCESS_DENIED`.
*   **Playwright Hooks:** En los tests, es vital pasar los argumentos correctamente. No es lo mismo `async () =>` que `async ({ page }) =>`. El segundo le pide a Playwright que nos entregue el objeto de la página activa.

## 3. Snippets de Código Pro

### Selector por `data-test`
Siempre que sea posible, usa atributos de test. Son los más estables.
```typescript
this.usernameInput = page.locator('[data-test="username"]');
```

### Importación de JSON en TS
Podemos importar datos directamente como si fueran objetos:
```typescript
import loginData from '../data/loginData.json';
// Uso: loginData.validUser.username
```
