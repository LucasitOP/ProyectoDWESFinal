#!/bin/bash

# Script para ejecutar el frontend

cd "$(dirname "$0")/frontend"

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install
fi

# Ejecutar servidor de desarrollo
echo "Iniciando servidor Angular en http://localhost:4200"
npm start

