import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
  external: ['emoji-picker-element/database', 'emoji-picker-element/shared', 'vue-demi'],
  dts: true,
})
