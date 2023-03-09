import * as esbuild from 'esbuild'

const watch = process.env.WATCH

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  target: 'es2016',
  outfile: 'dist/index.js',
  external: ['react'],
  platform: 'browser',
  format: 'esm',
}

if (watch) {
  const ctx = await esbuild.context(config)
  await ctx.watch()
} else {
  await esbuild.build(config)
}
