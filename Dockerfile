# Usamos la imagen oficial de Playwright (Incluye Node.js y Navegadores)
# Esto garantiza que el entorno sea IDÉNTICO en todas partes.
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar el caché de Docker)
COPY package.json package-lock.json ./

# Instalamos las dependencias (Clean Install)
RUN npm ci

# Copiamos el resto del código del proyecto
COPY . .

# Comando por defecto al iniciar el contenedor (Ejecutar tests)
CMD ["npx", "playwright", "test"]
