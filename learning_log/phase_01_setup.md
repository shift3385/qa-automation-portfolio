# Bitácora de Aprendizaje - Fase 1: Configuración y Fundamentos
**Fecha:** 18 de Enero, 2026
**Estado:** Completado

## 1. Resumen Ejecutivo
En esta fase inicial, transformamos una carpeta vacía en un entorno de automatización profesional. No solo instalamos herramientas, sino que establecimos las "reglas del juego" (Linting) y la estructura arquitectónica (POM) para escalar el proyecto sin caos.

## 2. Tecnologías y Herramientas
*   **Playwright:** Nuestro motor de automatización. Elegido por su velocidad y estabilidad.
*   **TypeScript:** Lenguaje base. Nos ayuda a evitar errores de tipos antes de ejecutar el código.
*   **ESLint (Google Style):** Nuestro "policía" de código. Nos obliga a escribir código limpio (ej. prohibiendo `var`, obligando a usar punto y coma `;`).
*   **Git:** Control de versiones.

## 3. Conceptos Clave Aprendidos

### Aserciones (`expect`)
La parte más crítica de una prueba. Es cómo validamos que el software hace lo que debe.
```typescript
// Estructura: expect(VALOR_OBTENIDO).toBe(VALOR_ESPERADO);
const x = 1;
expect(x).toBe(1); // ✅ Pasa
expect(x).toBe(2); // ❌ Falla
```

### Linting & Calidad de Código
Configuramos reglas estrictas. Si intentamos usar `var`, el sistema nos bloquea.
*   **Comando:** `npm run lint`
*   **Lección:** Es mejor corregir el estilo antes de ejecutar la prueba.

### Page Object Model (POM)
Creamos la estructura de carpetas para separar responsabilidades:
*   `/pages`: Aquí irán las clases que representan páginas web (ej. `LoginPage.ts`).
*   `/tests`: Aquí van los scripts de prueba que usan las páginas.
*   `/utils`: Funciones de ayuda generales.
*   `/data`: Datos de prueba (usuarios, productos).

## 4. Guía Técnica (Comandos Útiles)

### Inicialización del Proyecto
```bash
# Iniciar Playwright con TS y GitHub Actions
npm init -y playwright@latest -- --quiet --lang=TypeScript --install-deps --gha

# Instalar ESLint y dependencias de desarrollo
npm install -D typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Ejecución Diaria
```bash
# Ejecutar todas las pruebas (Headless por defecto)
npm test

# Ejecutar pruebas viendo el navegador (Encabezado)
npx playwright test --headed

# Verificar calidad de código
npm run lint

# Ver reporte HTML de la última ejecución
npx playwright show-report
```
