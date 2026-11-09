# TecnoLauncher 2.0 — Android

App de celular (Capacitor). Funciones: abrir Minecraft Bedrock o PojavLauncher si están instalados,
estado de servidores (con copiar IP) y lista oficial de versiones.

> Minecraft Java no corre dentro de esta app: en Android lo ejecuta PojavLauncher u otro launcher similar.

## Opción A — Sin instalar nada (GitHub Actions)
1. Crea una cuenta en github.com y un repositorio nuevo.
2. Sube TODO el contenido de esta carpeta (incluida `.github`).
3. Pestaña **Actions** → "Build APK" → espera ~5 min.
4. Descarga el artefacto **TecnoLauncher-apk** → dentro está `app-debug.apk`.

## Opción B — En tu PC con Windows
Necesitas Node.js LTS, JDK 17 y Android Studio (SDK). Luego doble clic en **CREAR-APK.bat**.
El APK queda en `android\app\build\outputs\apk\debug\app-debug.apk`.

## Instalar en el celular
Pasa el `.apk` al teléfono, ábrelo y permite "instalar apps de orígenes desconocidos".
