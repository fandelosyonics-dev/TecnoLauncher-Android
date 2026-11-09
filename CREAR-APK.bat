@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul || ( echo Instala Node.js LTS: https://nodejs.org & start https://nodejs.org & pause & exit /b 1 )
if not defined ANDROID_HOME if not defined ANDROID_SDK_ROOT (
  echo Falta Android Studio / SDK. Instalalo desde https://developer.android.com/studio
  echo o usa el metodo de GitHub Actions del README.
  pause & exit /b 1
)
call npm install || ( pause & exit /b 1 )
call npx cap add android
node patch-manifest.js
call npx cap sync android
cd android
call gradlew.bat assembleDebug || ( pause & exit /b 1 )
echo.
echo APK listo en: android\app\build\outputs\apk\debug\app-debug.apk
start "" "app\build\outputs\apk\debug"
pause
