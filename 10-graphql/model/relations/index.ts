import fs from 'fs'
import path from 'path'

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.ts' && /\.ts$/.test(file))
  .forEach(file => import(path.join(__dirname, file)))
