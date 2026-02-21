# Script para ejecutar el backend sin variables de entorno

# Variables de entorno opcionales (descomenta si tienes credenciales)
# export TWILIO_SID="your_twilio_sid"
# export TWILIO_TOKEN="your_twilio_auth_token"
# export TWILIO_PHONE="+1234567890"
# export CLOUDINARY_NAME="your_cloud_name"
# export CLOUDINARY_KEY="your_api_key"
# export CLOUDINARY_SECRET="your_api_secret"

# Ejecutar Maven
cd "$(dirname "$0")"
mvn clean spring-boot:run

