#!/bin/sh
# Renderiza las imágenes PNG (OG + iconos) con Chrome headless. Uso: npm run images
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
shot() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 --window-size="$2" --screenshot="$3" "file://$PWD/assets/$1" >/dev/null 2>&1; }
shot og.html 1200,630 public/og.png
shot icon.html 512,512 public/logo.png
python3 -I -c "from PIL import Image; im=Image.open('public/logo.png').convert('RGB'); im.resize((180,180), Image.LANCZOS).save('public/apple-touch-icon.png'); im.resize((32,32), Image.LANCZOS).save('public/favicon-32.png')"
ls -la public
