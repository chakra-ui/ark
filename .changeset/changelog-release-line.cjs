/** @type {import("@changesets/types").ChangelogFunctions} */
const changelogFunctions = {
  getReleaseLine: async (changeset, _type) => {
    const lines = changeset.summary
      .split('\n')
      .map((l) => l.trimEnd())
      .filter(Boolean)

    if (lines[0]?.startsWith('- ')) {
      return `\n${lines.map((l, i) => (i > 0 && l.startsWith('- ') ? `\n${l}` : l)).join('\n')}`
    }

    const [firstLine, ...rest] = lines
    return `\n- ${firstLine}\n${rest.map((l) => `  ${l}`).join('\n')}`.trimEnd()
  },

  getDependencyReleaseLine: async () => {
    return ''
  },
}

module.exports = { default: changelogFunctions }
