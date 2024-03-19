import fs from 'fs/promises'
import * as esbuild from 'esbuild'

await fs.rm('dist', { recursive: true })

const options = {
  entryPoints: ['index.js'],
  bundle: true,
  platform: 'browser',
  format: 'esm',
  external: [],
  bundle: true,
  treeShaking: true,
  sourcemap: false,
  minify: true,
  metafile: true,
}

let result

result = await esbuild.build(
  Object.assign(
    {
      outdir: 'dist/splitting',
      splitting: true,
    },
    options,
  ),
)

await fs.writeFile('dist/splitting/metafile.json', JSON.stringify(result, null, 2))

result = await esbuild.build(
  Object.assign(
    {
      outdir: 'dist/no-splitting',
      splitting: false,
    },
    options,
  ),
)

await fs.writeFile('dist/no-splitting/metafile.json', JSON.stringify(result, null, 2))
