import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { test } from "node:test"

// The site must never say or imply that the first conversation is free: it makes later calls look paid.
const root = new URL("..", import.meta.url).pathname
function files(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return files(path)
    return /\.(ts|tsx|html)$/.test(name) && !name.endsWith(".test.ts") ? [path] : []
  })
}

test("no page text or preview calls the first conversation free", () => {
  const found: string[] = []
  for (const path of [...files(join(root, "src")), ...files(join(root, "public/previews"))]) {
    const text = readFileSync(path, "utf8")
    for (const sentence of text.split(/[.!?\n]/)) {
      if (/nemokam/i.test(sentence) && /pokalb|skambut|konsultac/i.test(sentence)) found.push(`${path.replace(root, "")}: ${sentence.trim().slice(0, 80)}`)
    }
  }
  assert.deepEqual(found, [])
})
