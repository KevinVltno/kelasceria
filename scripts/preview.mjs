import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const dir = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = { ".html":"text/html; charset=utf-8", ".txt":"text/plain; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".svg":"image/svg+xml", ".png":"image/png", ".webmanifest":"application/manifest+json", ".ttf":"font/ttf", ".woff2":"font/woff2", ".mp3":"audio/mpeg" };

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    let path = resolve(dir, "." + decodeURIComponent(url.pathname));
    if (path !== dir && !path.startsWith(dir + sep)) {
      response.writeHead(403).end();
      return;
    }
    let file = await stat(path);
    if (file.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(308, { Location: url.pathname + "/" + url.search }).end();
        return;
      }
      path = resolve(path, "index.html");
      file = await stat(path);
    }
    const type = types[extname(path)] ?? "application/octet-stream";
    const headers = { "Content-Type": type, "Content-Length": file.size };
    const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range ?? "");
    if (range && type === "audio/mpeg") {
      const start = Number(range[1]);
      const end = Math.min(range[2] ? Number(range[2]) : file.size - 1, file.size - 1);
      if (start > end) {
        response.writeHead(416, { "Content-Range": "bytes */" + file.size }).end();
        return;
      }
      response.writeHead(206, { ...headers, "Content-Length": end - start + 1, "Content-Range": "bytes " + start + "-" + end + "/" + file.size, "Accept-Ranges": "bytes" });
      if (request.method === "HEAD") response.end();
      else createReadStream(path, { start, end }).pipe(response);
      return;
    }
    response.writeHead(200, headers);
    if (request.method === "HEAD") response.end();
    else createReadStream(path).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Halaman tidak ditemukan.");
  }
}).listen(port, "127.0.0.1", () => console.log("KelasCeria • http://localhost:" + port));
