const cssModuleImportPattern = /from\s+['"]styles\/([^'"]+\.module\.css)['"]/g
export const stripCss = (code: string): string =>
  code
    .replace(/import\s+\w+\s+from\s+['"]styles\/[^'"]+\.module\.css['"][ \t]*;?[ \t]*\n/g, '')
    .replace(/\s*className=\{\w+\.[^}]+\}/g, '')
    .replace(/\s*className=\{`\$\{\w+\.[^}]+\}`\}/g, '')
    .replace(/\s*:class="\w+\.[^"]+"/g, '')
    .replace(/\s*class=\{\w+\.[^}]+\}/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

export const rewriteCssImports = (code: string): string =>
  code.replace(cssModuleImportPattern, (_match, filename: string) => `from './${filename}'`)

export const getCssFiles = (cssModules: Record<string, string>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(cssModules)
      .filter(([filename]) => filename.endsWith('.module.css'))
      .map(([filename, content]) => [`src/${filename}`, content]),
  )

export const getCssModules = (cssModules: Record<string, string>): Array<[string, string]> =>
  Object.entries(cssModules)
    .filter(([filename]) => filename.endsWith('.module.css'))
    .sort(([a], [b]) => a.localeCompare(b))

export const getPrimaryCssModules = (
  cssModules: Record<string, string>,
  component?: string,
): Array<[string, string]> => {
  const modules = getCssModules(cssModules)
  if (!component) return modules

  const candidates = new Set([`${component}.module.css`])

  if (component === 'progress-circular' || component === 'progress-linear') {
    candidates.add('progress.module.css')
  }

  const primaryModules = modules.filter(([filename]) => candidates.has(filename))
  return primaryModules.length > 0 ? primaryModules : modules
}
