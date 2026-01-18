1. Instalación del Motor (Playwright & TypeScript)
* Qué hicimos: Inicializamos el proyecto con Playwright (la herramienta de automatización) y TypeScript (el lenguaje de programación).
* Objetivo: Tener las herramientas modernas necesarias para ejecutar las pruebas. Usamos TypeScript para que el código sea más robusto y fácil de mantener.

2. Definición de Estándares de Calidad (ESLint)
* Qué hicimos: Configuramos ESLint siguiendo la Guía de Estilo de Google. Incluso hicimos una prueba provocando un error (usando var) para confirmar que el sistema nos "regaña" si escribimos mal el código.
* Objetivo: Asegurar que, desde la primera línea de código real, mantengamos un estándar de calidad profesional y uniforme.

3. Arquitectura del Proyecto (Page Object Model)
* Qué hicimos: Creamos las carpetas vacías pages, utils, y data.
* Objetivo: Preparar la estructura para el patrón de diseño "Page Object Model" (POM). Esto separa la lógica de la prueba de la estructura de la página web, haciendo que las pruebas sean mucho más fáciles
    de arreglar si la web cambia.

4. Verificación del Sistema
* Qué hicimos: Creamos una prueba unitaria básica (framework basic check) que simplemente verifica que 1 es igual a 1.
* Objetivo: Confirmar que la instalación fue exitosa y que podemos ejecutar pruebas localmente sin depender de internet o servidores externos por ahora.

5. Fundamentos Teóricos (ISTQB)
* Qué hicimos: Escribimos el archivo notes_istqb.md resumiendo técnicas de diseño de pruebas (Partición de Equivalencia y Valores Límite) y diseñamos los casos de prueba teóricos para el Login.
* Objetivo: No solo "tirar código", sino aplicar teoría de QA profesional. Ya sabemos qué vamos a probar antes de empezar a programar la prueba.

----

Este comando inicializa un proyecto de Playwright desde cero de forma totalmente desatendida (sin preguntas interactivas), configurando TypeScript, instalando dependencias y preparando la integración continua.

`npm init -y playwright@latest -- --quiet --lang=TypeScript --install-deps --gha`

**Desglose de banderas**  

npm init -y playwright@latest: Descarga y ejecuta la última versión del generador de proyectos create-playwright.  
--: Separador crítico. Indica que los argumentos siguientes son para el instalador de Playwright, no para npm.  
--quiet: Modo silencioso. Evita la salida de texto innecesaria en la consola.  
--lang=TypeScript: Define TypeScript como el lenguaje de programación para los tests.  
--install-deps: Instala automáticamente las dependencias de npm (node_modules) y descarga los navegadores necesarios.  
--gha: Genera automáticamente el archivo de configuración para GitHub Actions (.github/workflows/playwright.yml).  

----

Este comando instala el compilador de TypeScript y el sistema de "Linting" (análisis de código), junto con los adaptadores necesarios para que funcionen juntos. La bandera -D asegura que todo se guarde como dependencias de desarrollo, ya que estas herramientas no son necesarias cuando la aplicación se ejecuta en producción.

`npm install -D typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

**Desglose de paquetes**  

npm install -D: Abreviatura de --save-dev. Indica que estas librerías solo se usarán durante la programación/construcción, no en el usuario final.

typescript: El núcleo del lenguaje. Permite compilar archivos .ts a JavaScript estándar.

eslint: La herramienta principal de linter. Busca errores de sintaxis, malas prácticas y problemas de estilo en el código. Por defecto, solo entiende JavaScript.

@typescript-eslint/parser: Es el traductor. Permite que ESLint "lea" y entienda la sintaxis de TypeScript (tipos, interfaces, enums) para poder analizarla.

@typescript-eslint/eslint-plugin: Contiene las reglas específicas. Añade validaciones propias de TypeScript a ESLint (ej: "no usar any explícitamente", "verificar que las funciones retornen el tipo correcto").

