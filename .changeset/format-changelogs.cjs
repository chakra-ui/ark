const fs = require('node:fs')
const path = require('node:path')

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages')

const SECTION_MAP = {
  'Major Changes': 'Changed',
  'Minor Changes': 'Added',
  'Patch Changes': 'Fixed',
}

const SEMVER_HEADING_RE =
  /## (\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)\n/g

const CHANGESET_SECTION_HEADING_RE = /### (Major|Minor|Patch) Changes\n/g

function formatChangelog(content) {
  const date = new Date().toISOString().split('T')[0]
  return content
    .replace(SEMVER_HEADING_RE, (_, version) => `## [${version}] - ${date}\n`)
    .replace(CHANGESET_SECTION_HEADING_RE, (_, type) => `### ${SECTION_MAP[`${type} Changes`]}\n`)
}

const packages = fs.readdirSync(PACKAGES_DIR).filter((dir) => {
  const changelogPath = path.join(PACKAGES_DIR, dir, 'CHANGELOG.md')
  return fs.existsSync(changelogPath)
})

for (const pkg of packages) {
  const changelogPath = path.join(PACKAGES_DIR, pkg, 'CHANGELOG.md')
  const content = fs.readFileSync(changelogPath, 'utf-8')
  const formatted = formatChangelog(content)
  if (formatted !== content) {
    fs.writeFileSync(changelogPath, formatted)
  }
}
