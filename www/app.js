const $ = id => document.getElementById(id);
const AL = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AppLauncher;
let S = { servers: [{ name: 'Hypixel', ip: 'mc.hypixel.net' }] };
try { S = JSON.parse(localStorage.getItem('tl_settings')) || S; } catch (e) {}
const save = () => { try { localStorage.setItem('tl_settings', JSON.stringify(S)); } catch (e) {} };

let tt;
function toast(m) { const t = $('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600); }

document.querySelectorAll('nav button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('nav button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.id === 'tab-' + b.dataset.tab));
}));

async function openApp(pkg, name) {
  if (!AL) return toast('Esto solo funciona dentro de la app Android');
  try {
    const { value } = await AL.canOpenUrl({ url: pkg });
    if (!value) return toast(name + ' no está instalado');
    await AL.openUrl({ url: pkg });
  } catch (e) { toast('No se pudo abrir ' + name); }
}
$('btnBedrock').addEventListener('click', () => openApp('com.mojang.minecraftpe', 'Minecraft'));
$('btnPojav').addEventListener('click', () => openApp('net.kdt.pojavlaunch', 'PojavLauncher'));

// Servidores
function renderServers() {
  const list = $('serversList'); list.replaceChildren();
  S.servers.forEach((s, i) => {
    const row = document.createElement('div'); row.className = 'srv';
    const dot = document.createElement('div'); dot.className = 'dot';
    const info = document.createElement('div'); info.className = 'info';
    const n = document.createElement('div'); n.className = 'n'; n.textContent = s.name;
    const ip = document.createElement('div'); ip.className = 'ip'; ip.textContent = s.ip;
    const pl = document.createElement('div'); pl.className = 'pl'; pl.textContent = 'Comprobando…';
    info.append(n, ip, pl);
    const copy = document.createElement('button'); copy.className = 'mini'; copy.textContent = 'Copiar IP';
    copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(s.ip); toast('IP copiada'); } catch (e) { toast(s.ip); } });
    const del = document.createElement('button'); del.className = 'mini'; del.textContent = '✕';
    del.addEventListener('click', () => { S.servers.splice(i, 1); save(); renderServers(); });
    row.append(dot, info, copy, del); list.append(row);
    fetch('https://api.mcsrvstat.us/3/' + encodeURIComponent(s.ip)).then(r => r.json()).then(d => {
      if (d.online) { dot.classList.add('on'); pl.textContent = (d.players ? d.players.online + '/' + d.players.max + ' jugadores' : 'En línea'); }
      else pl.textContent = 'Offline';
    }).catch(() => { pl.textContent = 'Sin datos'; });
  });
}
$('btnAdd').addEventListener('click', () => {
  const ip = $('srvIP').value.trim(); if (!ip) return;
  S.servers.push({ name: $('srvName').value.trim() || ip, ip }); save(); renderServers();
  $('srvIP').value = ''; $('srvName').value = '';
});

// Versiones (lista oficial de Mojang)
let manifest = null;
function renderVersions() {
  const box = $('versionsList'); box.replaceChildren();
  if (!manifest) { box.textContent = 'Sin conexión a internet'; return; }
  const snap = $('snap').checked;
  manifest.versions.filter(v => v.type === 'release' || (snap && v.type === 'snapshot')).slice(0, 80).forEach(v => {
    const r = document.createElement('div'); r.className = 'ver';
    const a = document.createElement('span'); a.textContent = v.id;
    const b = document.createElement('i'); b.textContent = v.type === 'snapshot' ? 'snapshot' : '';
    r.append(a, b); box.append(r);
  });
}
$('snap').addEventListener('change', renderVersions);
fetch('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json').then(r => r.json())
  .then(m => { manifest = m; renderVersions(); }).catch(renderVersions);

renderServers();
