// main.ts — Serve static files from the project root on Deno Deploy

const ROOT = ".";

async function serveFile(path: string): Promise<Response> {
  try {
    const file = await Deno.readFile(path);
    const contentType = getContentType(path);
    return new Response(file, {
      headers: { "content-type": contentType }
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  let pathname = url.pathname;

  // Normalize root
  if (pathname === "/") pathname = "/index.html";

  // Try to serve the file directly
  const filePath = `${ROOT}${pathname}`;
  try {
    return await serveFile(filePath);
  } catch {
    // SPA fallback → serve index.html
    return await serveFile(`${ROOT}/index.html`);
  }
});
