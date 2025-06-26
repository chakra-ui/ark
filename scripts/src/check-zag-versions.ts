import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { exit } from 'node:process'

const FRAMEWORK_PACKAGES = ['react', 'solid', 'vue', 'svelte']
const FRAMEWORK_SPECIFIC_ZAG_PACKAGES = ['@zag-js/react', '@zag-js/solid', '@zag-js/vue', '@zag-js/svelte']

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

function readPackageJson(framework: string): PackageJson {
  const packagePath = join('..', 'packages', framework, 'package.json')
  try {
    const content = readFileSync(packagePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Failed to read package.json for ${framework}:`, error)
    return {}
  }
}

function getZagPackages(packageJson: PackageJson): Record<string, string> {
  const zagPackages: Record<string, string> = {}

  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }

  for (const [name, version] of Object.entries(dependencies || {})) {
    if (name.startsWith('@zag-js/') && !FRAMEWORK_SPECIFIC_ZAG_PACKAGES.includes(name)) {
      zagPackages[name] = version
    }
  }

  return zagPackages
}

function main() {
  console.log('🔍 Checking @zag-js/* package versions across frameworks...\n')

  const frameworkZagPackages: Record<string, Record<string, string>> = {}

  // Read all framework package.json files
  for (const framework of FRAMEWORK_PACKAGES) {
    const packageJson = readPackageJson(framework)
    frameworkZagPackages[framework] = getZagPackages(packageJson)
  }

  // Use React as the control framework
  const controlFramework = 'react'
  const controlZagPackages = frameworkZagPackages[controlFramework]
  const controlPackageNames = Object.keys(controlZagPackages).sort()

  // Check for inconsistencies
  let hasInconsistencies = false
  const versionInconsistencies: Array<{
    package: string
    versions: Record<string, string>
  }> = []
  const missingPackages: Array<{
    framework: string
    packages: string[]
  }> = []
  const extraPackages: Array<{
    framework: string
    packages: string[]
  }> = []

  // Check each framework against the control (React)
  for (const framework of FRAMEWORK_PACKAGES) {
    if (framework === controlFramework) continue

    const currentZagPackages = frameworkZagPackages[framework]
    const currentPackageNames = Object.keys(currentZagPackages).sort()

    // Find missing packages (in control but not in current)
    const missing = controlPackageNames.filter((pkg) => !currentPackageNames.includes(pkg))
    if (missing.length > 0) {
      hasInconsistencies = true
      missingPackages.push({
        framework,
        packages: missing,
      })
    }

    // Find extra packages (in current but not in control)
    const extra = currentPackageNames.filter((pkg) => !controlPackageNames.includes(pkg))
    if (extra.length > 0) {
      hasInconsistencies = true
      extraPackages.push({
        framework,
        packages: extra,
      })
    }
  }

  // Check for version inconsistencies among common packages
  for (const zagPackage of controlPackageNames) {
    const versions: Record<string, string> = {}

    for (const framework of FRAMEWORK_PACKAGES) {
      const version = frameworkZagPackages[framework][zagPackage]
      if (version) {
        versions[framework] = version
      }
    }

    const uniqueVersions = new Set(Object.values(versions))

    if (uniqueVersions.size > 1) {
      hasInconsistencies = true
      versionInconsistencies.push({
        package: zagPackage,
        versions,
      })
    }
  }

  if (hasInconsistencies) {
    console.error('❌ Found inconsistencies in @zag-js/* packages:\n')

    // Report missing packages
    if (missingPackages.length > 0) {
      console.error('📦 Missing packages (compared to React):')
      for (const { framework, packages } of missingPackages) {
        console.error(`  ${framework}: ${packages.join(', ')}`)
      }
      console.error()
    }

    // Report extra packages
    if (extraPackages.length > 0) {
      console.error('📦 Extra packages (not in React):')
      for (const { framework, packages } of extraPackages) {
        console.error(`  ${framework}: ${packages.join(', ')}`)
      }
      console.error()
    }

    // Report version inconsistencies
    if (versionInconsistencies.length > 0) {
      console.error('📦 Version inconsistencies:')
      for (const { package: packageName, versions } of versionInconsistencies) {
        console.error(`  ${packageName}:`)
        for (const [framework, version] of Object.entries(versions)) {
          console.error(`    ${framework}: ${version}`)
        }
        console.error()
      }
    }

    exit(1)
  } else {
    console.log('✅ All @zag-js/* packages are consistent across frameworks')

    // Show the common version
    if (controlPackageNames.length > 0) {
      const commonVersion = controlZagPackages[controlPackageNames[0]]
      console.log(`📋 Common version: ${commonVersion}`)
      console.log(`📊 Total packages checked: ${controlPackageNames.length}`)
    }
  }
}

main()
