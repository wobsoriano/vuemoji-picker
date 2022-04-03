import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['emoji-picker-element/database'],
  dts: true,
  minify: true,
})
