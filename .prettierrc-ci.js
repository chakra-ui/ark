/**
 * This additional config file is used in CI related checks,
 * to skip the annoying auto cleanup of imports while saving files in the IDE
 */
module.exports = {
  ...require('./.prettierrc.js'),
  plugins: ['prettier-plugin-organize-imports'],
}
