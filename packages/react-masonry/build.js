import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  target: 'es2016',
  outfile: 'dist/index.js',
  external: ['react'],
  platform: 'browser',
  format: 'esm',
})
