#!/bin/bash
echo "=== Iniciando automatización con Git ==="
git add .
read -p "Introduce el mensaje para tu commit: " mensaje
git commit -m "$mensaje"
git push origin main
echo "¡Código respaldado y subido con éxito a la nube!"