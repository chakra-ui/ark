type Transform = (code: string) => string

const compose =
  (...fns: Transform[]): Transform =>
  (code) =>
    fns.reduce((acc, fn) => fn(acc), code)

const createReplacer =
  (pattern: RegExp, replacement: string): Transform =>
  (code) =>
    code.replace(pattern, replacement)

const stripCssModuleImports = createReplacer(
  /import\s+\w+\s+from\s+['"]styles\/[^'"]+\.module\.css['"][ \t]*;?[ \t]*\n/g,
  '',
)

const stripReactClassName = createReplacer(/\s*className=\{\w+\.[^}]+\}/g, '')

const stripReactClassNameTemplateLiteral = createReplacer(/\s*className=\{`\$\{\w+\.[^}]+\}`\}/g, '')

const stripVueClass = createReplacer(/\s*:class="\w+\.[^"]+"/g, '')

const stripSvelteClass = createReplacer(/\s*class=\{\w+\.[^}]+\}/g, '')

const collapseEmptyLines = createReplacer(/\n{3,}/g, '\n\n')

const trim: Transform = (code) => code.trim()

export const stripCssModuleCode = compose(
  stripCssModuleImports,
  stripReactClassName,
  stripReactClassNameTemplateLiteral,
  stripVueClass,
  stripSvelteClass,
  collapseEmptyLines,
  trim,
)

export const transformCssModuleImports = createReplacer(
  /from\s+['"]styles\/[^'"]+\.module\.css['"]/g,
  "from './index.module.css'",
)
