// main.ts — Deno Deploy static site server (works on Deploy)

import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve((req) => {
  const url = new URL(req.url);

  return serveDir(req, {
    fsRoot: ".",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
    quiet: true,
    defaultDocument: "index.html",
  });
});
