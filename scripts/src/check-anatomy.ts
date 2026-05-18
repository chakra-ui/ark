import { existsSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { glob } from 'glob'

const packages = ['react', 'solid', 'svelte', 'vue', 'angular']

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

function slugFromImportSpecifier(specifier: string): string {
  const segments = specifier.split('/').filter((segment) => segment.length > 0)
  const last = segments[segments.length - 1] ?? ''
  return last.endsWith('.anatomy') ? last.slice(0, -'.anatomy'.length) : last
}

async function getExportedAnatomies(anatomyTsPath: string): Promise<string[]> {
  if (!existsSync(anatomyTsPath)) {
    return []
  }

  const content = await Bun.file(anatomyTsPath).text()
  const exportRegex = /export\s+\{\s*(\w+Anatomy)\s*\}\s+from\s+['"]([^'"]+)['"]/g
  const anatomies: string[] = []

  let match: RegExpExecArray | null
  // biome-ignore lint/suspicious/noAssignInExpressions: works
  while ((match = exportRegex.exec(content)) !== null) {
    anatomies.push(slugFromImportSpecifier(match[2]))
  }

  return anatomies.sort()
}

async function checkPackage(packageName: string): Promise<AnatomyCheck> {
  // Find the root directory (parent of scripts or packages)
  const rootDir = process.cwd().endsWith('/scripts') ? join(process.cwd(), '..') : process.cwd()

  const isAngular = packageName === 'angular'

  const basePath = isAngular
    ? join(rootDir, 'packages', 'angular')
    : packageName === 'svelte'
      ? join(rootDir, 'packages', packageName, 'src', 'lib', 'components')
      : join(rootDir, 'packages', packageName, 'src', 'components')

  const anatomyTsPath = isAngular ? join(basePath, 'src', 'anatomy.ts') : join(basePath, 'anatomy.ts')

  const anatomyGlob = isAngular ? '*/*.anatomy.ts' : '*/*.anatomy.{ts,tsx}'

  // Find all anatomy files
  const anatomyFiles = await glob(anatomyGlob, {
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

  if (hasIssues) {
    console.log('❌ Some packages have anatomy export issues!')
    process.exit(1)
  } else {
    console.log('✅ All packages have complete anatomy exports!')
  }
}

main().catch(console.error)
