# Bitácora de Aprendizaje - Fase 2: Flujos Principales y POM
**Fecha:** 18 de Enero, 2026
**Estado:** En Progreso (Tarea de Autenticación Completada)

## 1. Conceptos Clave de esta Etapa

### Page Object Model (POM)
Es el patrón de diseño más importante en la automatización de UI. 
*   **¿Qué es?**: Creamos una "clase" (un plano) que representa una página web. Esta clase contiene los selectores (dónde están los botones) y los métodos (qué acciones se pueden hacer).
*   **Beneficio**: Si el desarrollador cambia el ID de un botón, solo lo corregimos en la clase `LoginPage`, y automáticamente todas las pruebas que usan ese botón vuelven a funcionar. No hay que buscar y reemplazar en 50 archivos.

### Data-Driven Testing (Pruebas Basadas en Datos)
Separamos los **datos** de la **lógica**.
*   **¿Qué hicimos?**: Creamos un archivo `loginData.json`.
*   **Beneficio**: Si queremos probar un nuevo usuario, solo lo añadimos al JSON. No tocamos el código de la prueba. Esto hace que las pruebas sean mucho más limpias y fáciles de leer.

### Monitoreo de Desempeño (Performance Annotations)
Aprendimos a diferenciar entre una **Prueba Funcional** y un **Monitoreo de UX**.
*   **Concepto**: No fallamos la prueba si el sistema es lento (para no generar ruido innecesario), pero dejamos una **Anotación** en el reporte.
*   **Umbral Crítico**: 3000ms (3 segundos). Es el estándar de oro para la retención de usuarios en la web.
*   **Herramienta**: Usamos `Date.now()` para medir y `test.info().annotations.push()` para registrar la alerta sin romper el flujo.

### Ciclo TDD (Red-Green-Refactor)
Hoy lo vivimos paso a paso:
1.  **Red (Rojo):** Escribimos la prueba de login y falló porque la clase `LoginPage` no existía.
2.  **Green (Verde):** Creamos la clase y corregimos los errores (como el de `simplewall` y el de `{ page }`) hasta que todo pasó en verde.
3.  **Refactor (Refactorizar):** Una vez que todo funcionaba, movimos los datos al JSON para mejorar la estructura.

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

## 4. Diferencias de Ejecución (Comandos)

Es vital entender la diferencia entre ejecución general y depuración específica.

| Comando | Descripción | Visibilidad | Uso |
| :--- | :--- | :--- | :--- |
| `npm test tests/login.spec.ts` | Ejecuta la prueba en **todos** los navegadores configurados (Chromium, Firefox, WebKit) en paralelo. | **Headless** (Invisible/Fondo) | Validación general rápida (CI/CD). |
| `npx playwright test tests/login.spec.ts --project=firefox --headed` | Ejecuta la prueba **solo** en el navegador especificado (Firefox). | **Headed** (Visible) | Depuración de errores específicos o validación visual. |

---

**Fecha:** 19 de Enero, 2026
**Estado:** Funcionalidad de Inventario (Búsqueda, Filtrado, Carrito) y **Checkout E2E** Completadas.

## 5. Profundización Técnica (Dudas y Soluciones)

### El Dilema del Naming: `goto()` vs `navigateToX()`
Surgió una duda existencial importante: ¿Por qué llamamos `goto()` al método de navegación dentro de `LoginPage`? ¿No choca con el `page.goto()` nativo?
*   **Encapsulamiento:** El objetivo del Page Object es ocultar la URL real (`/inventory.html`). Si la URL cambia mañana, solo editamos este archivo, no los 50 tests.
*   **Convención:** Aunque `this.page.goto()` (nativo) y `this.goto()` (nuestro) se llaman igual, viven en objetos diferentes.
    *   `page` es el controlador del navegador.
    *   `inventoryPage` es nuestra abstracción de alto nivel.
*   **Conclusión:** Ambos son válidos, pero mantener `goto()` es estándar en la industria para indicar "Ir a la página por defecto de este objeto".

### Lógica de Selección: ¿Cómo clickear el botón correcto?
En el inventario hay muchos botones "Add to cart". Si hacemos `page.locator('button').click()`, Playwright fallará porque hay muchos.
**Estrategia "Scope" (Alcance):**
1.  Primero buscamos la **tarjeta** del producto específico por su texto.
2.  Dentro de ESE contenedor, buscamos el botón.
```typescript
// Malo (Ambiguo)
await page.locator('button').click();

// Bueno (Preciso)
const productContainer = this.page.locator('.inventory_item', { hasText: 'Backpack' });
await productContainer.locator('button').click(); // Solo busca el botón DENTRO de la tarjeta de la mochila
```

### Estrategia de Pruebas: ¿Por qué probamos esto?
No probamos por probar. Cada test tiene una justificación de negocio:

1.  **Visualización (Sanity Check):** `isInventoryListVisible`
    *   *Por qué:* Si la lista no carga, nada más importa. Es la prueba "semáforo".
2.  **Interacción (Add to Cart):**
    *   *Por qué:* Es el flujo crítico de ingresos. Probamos que el contador del carrito (`.shopping_cart_badge`) cambie de 0 a 1. No necesitamos ir al carrito todavía, el feedback visual es suficiente para esta etapa unitaria.
3.  **Lógica de Negocio (Ordenamiento):**
    *   *Por qué:* Un usuario que ordena "Menor a Mayor" y ve un precio alto primero, desconfía del sitio.
    *   *Cómo:* Extraemos todos los precios como texto (`$29.99`), quitamos el signo `$` y los convertimos a números para verificar matemáticamente que `Precio A <= Precio B`.
    *   *Z a A:* Validamos comparando strings directos (`names[i] >= names[i+1]`), aprovechando que Javascript usa el valor ASCII/Unicode para comparaciones "mayor/menor que" en texto.

4.  **Estado de UI (Botón Remove):**
    *   *Por qué:* Validar que el botón cambie de texto ("Add to cart" -> "Remove") confirma que la aplicación reaccionó a la acción del usuario.
    *   *Cómo:* Buscamos el botón específico dentro del contenedor del producto y validamos su visibilidad.

## 6. La Joya de la Corona: El Test End-to-End (E2E)

Hoy hemos creado un test (`checkout.spec.ts`) que simula el "Happy Path" de un usuario real, desde el login hasta la confirmación de la compra. Este es el test más valioso para el negocio.

### Anatomía del Test E2E:

**1. Orquestación con POM:** El test no contiene ni un solo selector (`page.locator`). Es limpio y legible porque delega todo el trabajo sucio a los Page Objects.
   *   `loginPage.login(...)`
   *   `inventoryPage.addItemToCart(...)`
   *   `cartPage.proceedToCheckout(...)`
   *   `checkoutPage.fillInformation(...)`

**2. Aserciones de Trazabilidad:** Cada vez que el robot "cambia de página", hacemos una aserción de URL. Esto garantiza que estamos en el paso correcto del flujo.
   ```typescript
   await inventoryPage.goToCart();
   await expect(page).toHaveURL(/cart.html/); // ¡Estoy donde debería estar!
   ```

**3. Valor de Negocio:** Este test responde a la pregunta más importante: **"¿Pueden nuestros usuarios comprarnos dinero ahora mismo?"**. Si este test falla, es una alerta roja crítica que indica una pérdida directa de ingresos.

**4. Aserción Final:** La última línea es la más importante. Verifica que, tras todo el viaje, el usuario vea el mensaje de éxito.
   ```typescript
   const successMsg = await checkoutPage.getOrderSuccessMessage();
   expect(successMsg).toBe('Thank you for your order!');
   ```
Este test es el resultado final de toda la arquitectura POM que hemos construido. Cada Page Object es un bloque de Lego, y el test E2E es la construcción final.

---

**Fecha:** 25 de Enero, 2026
**Estado:** Fase 2 Completada. Alineación de Mercado Realizada.

## 7. Evolución del Framework: El toque Senior

Hoy cerramos la Fase 2 con una mentalidad de **Ingeniero**, no de aprendiz.

### Alineación con el Mercado Real
Analizamos 7 ofertas laborales reales (dLocal, Scanntech, Azumo, etc.) y descubrimos que no basta con Playwright.
*   **Lección:** Un QA Senior debe ser políglota (TS/Python) y entender de infraestructura (Docker/CI-CD).
*   **Acción:** Re-estructuramos el Roadmap para incluir **GraphQL**, **Docker** y un puente hacia **Python**.

### Robustez en Selectores
Aprendimos que el orden de preferencia en selectores es vital para la estabilidad (flakiness):
1.  `data-test` (Inamovible por diseño).
2.  `id` (Único pero a veces dinámico).
3.  `class` (Último recurso, propenso a cambios visuales).
*   **Refactor:** Ajustamos la `CheckoutCompletePage` para usar `[data-test="complete-header"]`, garantizando que el test no se rompa si el desarrollador cambia el diseño del contenedor.

### La importancia de los "Getters" en POM
Entendimos que la página debe ser "tonta" (solo entrega datos) y el test debe ser "inteligente" (hace las aserciones).
*   **Error corregido:** Intentamos validar el título dentro de la página. Lo corregimos devolviendo el `innerText()` y dejando que el `expect()` viva en el archivo `.spec.ts`. Esto hace que el código sea mucho más mantenible.