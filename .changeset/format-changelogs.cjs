const fs = require('node:fs')
const path = require('node:path')

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages')

const SECTION_MAP = {
  'Major Changes': 'Changed',
  'Minor Changes': 'Added',
  'Patch Changes': 'Fixed',
}

function formatChangelog(content) {
  return content
    .replace(/## (\d+\.\d+\.\d+)\n/g, (_, version) => {
      const date = new Date().toISOString().split('T')[0]
      return `## [${version}] - ${date}\n`
    })
    .replace(/### (Major|Minor|Patch) Changes\n/g, (_, type) => `### ${SECTION_MAP[`${type} Changes`]}\n`)
}

const packages = fs.readdirSync(PACKAGES_DIR).filter((dir) => {
  const changelogPath = path.join(PACKAGES_DIR, dir, 'CHANGELOG.md')
  return fs.existsSync(changelogPath)
})

let changed = 0

for (const pkg of packages) {
  const changelogPath = path.join(PACKAGES_DIR, pkg, 'CHANGELOG.md')
  const content = fs.readFileSync(changelogPath, 'utf-8')
  const formatted = formatChangelog(content)
  if (formatted !== content) {
    fs.writeFileSync(changelogPath, formatted)
    changed++
    console.log(`Formatted: ${pkg}/CHANGELOG.md`)
  }
}

console.log(`Done. ${changed} changelog(s) formatted.`)
