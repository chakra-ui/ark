/** @type {import("@changesets/types").ChangelogFunctions} */
const changelogFunctions = {
  getReleaseLine: async (changeset, _type) => {
    const lines = changeset.summary
      .split('\n')
      .map((l) => l.trimEnd())
      .filter(Boolean)

    const [firstLine, ...rest] = lines
    return `\n- ${firstLine}\n${rest.map((l) => `  ${l}`).join('\n')}`.trimEnd()
  },

  getDependencyReleaseLine: async () => {
    return ''
  },
}

module.exports = { default: changelogFunctions }
