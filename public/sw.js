// Di server pengembangan, hentikan worker build lama yang masih mengontrol alamat ini.
// Build produksi mengganti berkas ini dengan worker offline di folder out.
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("kelasceria-")).map((key) => caches.delete(key)));
    await self.registration.unregister();
    const pages = await self.clients.matchAll({ type: "window" });
    for (const page of pages) void page.navigate(page.url).catch(() => {});
  })());
});
