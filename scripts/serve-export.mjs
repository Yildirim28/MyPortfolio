import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 4180);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

function sendNotFound(response) {
  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("Not found");
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (basePath) {
    if (pathname === basePath) {
      response.writeHead(308, { location: `${basePath}/` });
      response.end();
      return;
    }

    if (!pathname.startsWith(`${basePath}/`)) {
      sendNotFound(response);
      return;
    }

    pathname = pathname.slice(basePath.length);
  }

  const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  let filePath = resolve(root, `.${relativePath}`);

  if (!filePath.startsWith(`${root}${sep}`) && filePath !== root) {
    sendNotFound(response);
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = resolve(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    sendNotFound(response);
    return;
  }

  const contentType = mimeTypes[extname(filePath)] ?? "application/octet-stream";
  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type": contentType
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving static export at http://127.0.0.1:${port}${basePath || "/"}`);
});
