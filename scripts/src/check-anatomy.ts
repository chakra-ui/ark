import { existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { glob } from 'glob'

const packages = ['react', 'solid', 'svelte', 'vue']

interface AnatomyCheck {
  package: string
  anatomyFiles: string[]
  exportedAnatomies: string[]
  missing: string[]
  extra: string[]
}

function getComponentName(filePath: string): string {
  return basename(dirname(filePath))
}

async function getExportedAnatomies(anatomyTsPath: string): Promise<string[]> {
  if (!existsSync(anatomyTsPath)) {
    return []
  }

  const content = await Bun.file(anatomyTsPath).text()
  const exportRegex = /export\s+{\s*(\w+Anatomy)\s*}\s+from\s+['"]\.\/([\w-]+)\//g
  const anatomies: string[] = []

  let match: RegExpExecArray | null
  // biome-ignore lint/suspicious/noAssignInExpressions: works
  while ((match = exportRegex.exec(content)) !== null) {
    anatomies.push(match[2])
  }

  return anatomies.sort()
}

async function checkPackage(packageName: string): Promise<AnatomyCheck> {
  // Find the root directory (parent of scripts or packages)
  const rootDir = process.cwd().endsWith('/scripts') ? join(process.cwd(), '..') : process.cwd()

  const basePath =
    packageName === 'svelte'
      ? join(rootDir, 'packages', packageName, 'src', 'lib', 'components')
      : join(rootDir, 'packages', packageName, 'src', 'components')

  const anatomyTsPath = join(basePath, 'anatomy.ts')

  // Find all anatomy files
  const anatomyFiles = await glob('*/*.anatomy.{ts,tsx}', {
    cwd: basePath,
    absolute: false,
  })

  const componentNames = anatomyFiles.map((file) => getComponentName(file)).sort()

  // Get exported anatomies
  const exportedAnatomies = await getExportedAnatomies(anatomyTsPath)

  // Find missing and extra exports
  const missing = componentNames.filter((comp) => !exportedAnatomies.includes(comp))
  const extra = exportedAnatomies.filter((exp) => !componentNames.includes(exp))

  return {
    package: packageName,
    anatomyFiles: componentNames,
    exportedAnatomies,
    missing,
    extra,
  }
}

interface UncalledAttrs {
  file: string
  line: number
  text: string
}

async function findUncalledAttrs(): Promise<UncalledAttrs[]> {
  const files = await glob(`packages/{${packages.join(',')}}/src/**/*.{ts,tsx,svelte,vue}`, {
    cwd: join(import.meta.dir, '../..'),
    absolute: true,
  })

  const hits: UncalledAttrs[] = []

  for (const file of files) {
    const source = await Bun.file(file).text()
    source.split('\n').forEach((text, index) => {
      if (/parts\.[a-zA-Z]+\.attrs(?!\s*\()/.test(text)) {
        hits.push({ file, line: index + 1, text: text.trim() })
      }
    })
  }

  return hits
}

async function main() {
  console.log('🔍 Checking anatomy exports across all packages...\n')

  let hasIssues = false

  for (const pkg of packages) {
    const result = await checkPackage(pkg)

    console.log(`📦 ${pkg.toUpperCase()}`)
    console.log(`   Total anatomy files: ${result.anatomyFiles.length}`)
    console.log(`   Exported in anatomy.ts: ${result.exportedAnatomies.length}`)

    if (result.missing.length > 0) {
      hasIssues = true
      console.log(`   ❌ Missing exports:`)
      result.missing.forEach((comp) => {
        console.log(`      - ${comp}`)
      })
    }

    if (result.extra.length > 0) {
      hasIssues = true
      console.log(`   ⚠️  Extra exports (no anatomy file):`)
      result.extra.forEach((comp) => {
        console.log(`      - ${comp}`)
      })
    }

    if (result.missing.length === 0 && result.extra.length === 0) {
      console.log(`   ✅ All anatomy files are properly exported`)
    }

    console.log()
  }

  const uncalled = await findUncalledAttrs()

  console.log('🔍 Checking anatomy attrs are called...\n')

  if (uncalled.length > 0) {
    hasIssues = true
    console.log(`   ❌ ${uncalled.length} anatomy attrs spread without being called:`)
    uncalled.forEach(({ file, line, text }) => {
      console.log(`      - ${file.split('/packages/')[1]}:${line}`)
      console.log(`        ${text}`)
    })
    console.log('\n   Zag v2 takes the scope id: parts.root.attrs(id). Spreading the')
    console.log('   function contributes nothing and the part renders without its attribute.')
    console.log()
  } else {
    console.log('   ✅ All anatomy attrs are called\n')
  }

  if (hasIssues) {
    console.log('❌ Some packages have anatomy export issues!')
    process.exit(1)
  } else {
    console.log('✅ All packages have complete anatomy exports!')
  }
}

main().catch(console.error)
