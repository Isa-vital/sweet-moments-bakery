import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = new URL('../src/assets/images/', import.meta.url);
for (const file of await readdir(directory)) {
  if (!file.endsWith('.png')) continue;
  const source = new URL(file, directory);
  const output = new URL(`${parse(file).name}.webp`, directory);
  await sharp(fileURLToPath(source)).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(fileURLToPath(output));
  const before = (await stat(source)).size;
  const after = (await stat(output)).size;
  console.log(`${file}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB`);
}
