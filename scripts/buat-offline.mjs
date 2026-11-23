import { createHash } from "node:crypto";
import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("out");
async function daftar(folder, prefix = "") {
  const entries = await readdir(folder, { withFileTypes: true });
  const parts = await Promise.all(entries.map((entry) => {
    const path = prefix + "/" + entry.name;
    return entry.isDirectory() ? daftar(resolve(folder, entry.name), path) : [path];
  }));
  return parts.flat();
}
for (const path of await daftar(root)) {
  // Next meminta nama segmen bertitik melalui router klien.
  const segment = /^(.*\/)(__next\.[^/]+)\/(.+\.txt)$/.exec(path);
  if (segment) {
    const alias = segment[1] + segment[2] + "." + segment[3].replaceAll("/", ".");
    await copyFile(root + path, root + alias);
  }
}
const files = (await daftar(root)).filter((path) => !path.endsWith(".map") && path !== "/sw.js").sort();
const hash = createHash("sha256");
for (const file of files) {
  hash.update(file);
  hash.update(await readFile(root + file));
}
const version = "kelasceria-v2-" + hash.digest("hex").slice(0, 16);
const paths = files.filter((path) => !/^\/audio\//.test(path)).map((path) => path.endsWith("/index.html") ? path.slice(0, -"index.html".length) : path);
const audio = files.filter((path) => /^\/audio\/bgm-(menu|main)\.mp3$/.test(path));
await writeFile(root + "/sw.js", `
const CACHE = ${JSON.stringify(version)};
const PRECACHE = ${JSON.stringify(paths)};
const AUDIO = ${JSON.stringify(audio)};
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(PRECACHE.map((path) => new Request(path, { cache: "reload" })));
    await Promise.allSettled(AUDIO.map((path) => cache.add(path)));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("kelasceria-") && name !== CACHE).map((name) => caches.delete(name)));
    const lama = names.some((name) => name.startsWith("kelasceria-") && !name.startsWith("kelasceria-v2-"));
    const halamanLama = lama ? await self.clients.matchAll({ type: "window" }) : [];
    await self.clients.claim();
    // Pindahkan tab yang masih merender versi cache-first lama ke versi ini.
    for (const page of halamanLama) void page.navigate(page.url).catch(() => {});
  })());
});
self.addEventListener("fetch", (event) => {
  const {request} = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname === "/sw.js") return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const path = request.mode === "navigate" && !url.pathname.endsWith("/") ? url.pathname + "/" : url.pathname;
    const segment = request.headers.get("Next-Router-Segment-Prefetch");
    // HTML diambil dari server saat online. Simpan precache sebagai cadangan offline.
    if (request.mode === "navigate") {
      try {
        const terbaru = await fetch(request, { cache: "no-cache" });
        if (terbaru.status < 500) return terbaru;
      } catch { /* Lanjutkan dengan halaman offline. */ }
      return (await cache.match(path)) ?? (await cache.match("/404.html")) ?? Response.error();
    }
    // Next export statis menyimpan payload navigasi sebagai berkas .txt.
    if (request.headers.has("RSC") && !path.endsWith(".txt")) {
      const base = path === "/" ? "" : path.replace(/\\/$/, "");
      if (segment) {
        const name = segment === "/_tree" ? "__next._tree.txt" : "__next." + segment.replace(/^\\//, "").replaceAll("/", ".") + ".txt";
        const payload = await cache.match(base + "/" + name);
        if (payload) return payload;
      }
      const full = await cache.match(base + "/index.txt");
      if (full) return full;
      return fetch(request);
    }
    const cached = await cache.match(path);
    const range = request.headers.get("Range");
    if (cached && range && url.pathname.startsWith("/audio/")) {
      const bytes = await cached.arrayBuffer();
      const part = /^bytes=(\\d+)-(\\d*)$/.exec(range);
      if (part) {
        const start = Number(part[1]);
        const end = Math.min(part[2] ? Number(part[2]) : bytes.byteLength - 1, bytes.byteLength - 1);
        if (start <= end) return new Response(bytes.slice(start, end + 1), {status: 206, headers: {
          "Content-Type": "audio/mpeg", "Content-Range": "bytes " + start + "-" + end + "/" + bytes.byteLength,
          "Content-Length": String(end - start + 1), "Accept-Ranges": "bytes"
        }});
        return new Response(null, {status: 416, headers: {"Content-Range": "bytes */" + bytes.byteLength}});
      }
    }
    if (cached) return cached;
    try { return await fetch(request); }
    catch {
      return Response.error();
    }
  })());
});
`);
