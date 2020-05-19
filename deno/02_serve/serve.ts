// deno run --allow-net serve.ts
import { serve } from 'https://deno.land/std@0.50.0/http/server.ts'

const s = serve({ port: 4000 })
console.log(`Server running at http://localhost:4000/`)

for await (const req of s) {
  req.respond({body: "Hello world!\n"})
}
