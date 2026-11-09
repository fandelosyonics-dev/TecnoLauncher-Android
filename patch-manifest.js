// Permite que la app vea Minecraft/Pojav instalados (Android 11+)
const fs = require('fs');
const f = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(f, 'utf8');
if (!x.includes('<queries>')) {
  x = x.replace('<application', `<queries>
        <package android:name="com.mojang.minecraftpe" />
        <package android:name="net.kdt.pojavlaunch" />
    </queries>
    <application`);
  fs.writeFileSync(f, x);
  console.log('AndroidManifest parcheado');
}
