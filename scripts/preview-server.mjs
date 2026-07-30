import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const outputRoot = join(root, "out");
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".mp4": "video/mp4", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".ttf": "font/ttf" };

function resolveFile(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname.startsWith("/bali-tours-russia/")) pathname = pathname.slice("/bali-tours-russia".length);
  const relativePath = pathname.replace(/^\/+/, "");
  const direct = join(outputRoot, relativePath);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const indexFile = join(direct, "index.html");
  if (existsSync(indexFile) && statSync(indexFile).isFile()) return indexFile;
  return pathname === "/" ? join(outputRoot, "ru", "index.html") : null;
}

http.createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/enquiries") {
    request.resume();
    request.on("end", () => {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ ok: true, enquiryId: crypto.randomUUID(), preview: true }));
    });
    return;
  }
  const file = resolveFile(request.url || "/");
  if (!file || !existsSync(file) || !statSync(file).isFile()) { response.writeHead(404); response.end("Not found"); return; }
  const safe = normalize(file);
  if (!safe.startsWith(root)) { response.writeHead(403); response.end("Forbidden"); return; }
  response.writeHead(200, { "Content-Type": mime[extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
  createReadStream(file).pipe(response);
}).listen(3000, "127.0.0.1", () => console.log("Preview ready at http://127.0.0.1:3000/ru"));
