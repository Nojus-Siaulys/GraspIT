import type { IncomingMessage, ServerResponse } from "node:http"
import { pages } from "./src/site/content.ts"
import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { createContactHandler } from "./server/contact.ts"

// Match directory URLs in development and preview to the static production output.
function directoryUrls(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) {
  const url = new URL(req.url ?? "/", "http://localhost")
  if (url.pathname !== "/" && pages[url.pathname]) {
    res.writeHead(308, { Location: `${url.pathname}/${url.search}` })
    res.end()
    return
  }
  next()
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const contactHandler = createContactHandler({ key: env.RESEND_API_KEY, from: env.CONTACT_FROM, to: env.CONTACT_TO, origin: env.SITE_URL })
  return {
  server: { host: "127.0.0.1", port: 5174, strictPort: true },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "static-directory-urls",
      configureServer(server) {
        server.middlewares.use("/api/contact", (req, res) => { void contactHandler(req, res) })
        server.middlewares.use(directoryUrls)
      },
      configurePreviewServer(server) {
        server.middlewares.use("/api/contact", (req, res) => { void contactHandler(req, res) })
        server.middlewares.use(directoryUrls)
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
}
})
