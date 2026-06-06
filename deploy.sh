#!/bin/bash

# Script de despliegue para Vías del Chocó
# Uso: ./deploy.sh

echo "🚀 Iniciando despliegue de Vías del Chocó..."

# Verificar que gcloud esté instalado y configurado
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI no está instalado. Instálalo desde: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Verificar autenticación
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n 1 > /dev/null; then
    echo "🔐 No estás autenticado en Google Cloud. Ejecuta: gcloud auth login"
    exit 1
fi

echo "✅ Autenticación verificada"

# Configurar proyecto
echo "🔧 Configurando proyecto vias-choco..."
gcloud config set project vias-choco

# Construir y desplegar backend
echo "🏗️  Construyendo imagen Docker del backend..."
gcloud builds submit --config cloudbuild.yaml .

echo "🚀 Desplegando backend en Cloud Run..."
gcloud run deploy viaschoco-backend \
  --image gcr.io/vias-choco/viaschoco-backend \
  --platform managed \
  --region southamerica-east1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1

# Obtener URL del backend
BACKEND_URL=$(gcloud run services describe viaschoco-backend --region=southamerica-east1 --format="value(status.url)")
echo "✅ Backend desplegado en: $BACKEND_URL"

# Construir y desplegar frontend
echo "🎨 Construyendo frontend..."
npm run build

echo "🌐 Desplegando frontend en Firebase Hosting..."
firebase deploy --only hosting

echo "🎉 ¡Despliegue completado!"
echo ""
echo "📋 Resumen:"
echo "   Backend: $BACKEND_URL"
echo "   Frontend: https://vias-choco.web.app"
echo ""
echo "🔍 Para ver logs: gcloud run logs read viaschoco-backend"