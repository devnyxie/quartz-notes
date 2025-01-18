import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

// Directories to skip
const skipDirs = ['node_modules', 'dist', 'public', '.git', 'cleanup', 'content']

async function findFiles(dir, ext) {
  const files = new Set()
  
  async function scan(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name)
      
      if (entry.isDirectory()) {
        if (!skipDirs.includes(entry.name)) {
          await scan(fullPath)
        }
        continue
      }
      
      if (entry.name.endsWith(ext)) {
        files.add(fullPath)
      }
    }
  }
  
  await scan(dir)
  return files
}

async function cleanup() {
  console.log('Finding files...')
  
  const jsFiles = await findFiles(projectRoot, '.js')
  const tsFiles = await findFiles(projectRoot, '.ts')
  
  let deleted = 0
  
  for (const jsFile of jsFiles) {
    const tsFile = jsFile.replace('.js', '.ts')
    if (tsFiles.has(tsFile)) {
      await fs.unlink(jsFile)
      console.log(`Deleted: ${path.relative(projectRoot, jsFile)}`)
      deleted++
    }
  }
  
  console.log(`\nDeleted ${deleted} JS files that had TS counterparts`)
}

cleanup().catch(console.error)