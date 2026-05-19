import { existsSync, readFileSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { argv, exit } from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const formsImportPattern = /^@angular\/forms(?:\/|$)/

export type EntryPoint = {
  name: string
  file: string
  outputs: string[]
}

export const entryPoints: EntryPoint[] = [
  {
    name: '@ark-ui/angular',
    file: 'src/index.ts',
    outputs: ['dist/fesm2022/ark-ui-angular.mjs'],
  },
  {
    name: '@ark-ui/angular/avatar',
    file: 'avatar/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-avatar.mjs'],
  },
  {
    name: '@ark-ui/angular/clipboard',
    file: 'clipboard/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-clipboard.mjs'],
  },
  {
    name: '@ark-ui/angular/collapsible',
    file: 'src/collapsible/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-collapsible.mjs'],
  },
  {
    name: '@ark-ui/angular/dialog',
    file: 'src/dialog/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-dialog.mjs'],
  },
  {
    name: '@ark-ui/angular/drawer',
    file: 'src/drawer/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-drawer.mjs'],
  },
  {
    name: '@ark-ui/angular/editable',
    file: 'editable/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-editable.mjs'],
  },
  {
    name: '@ark-ui/angular/field',
    file: 'field/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-field.mjs'],
  },
  {
    name: '@ark-ui/angular/fieldset',
    file: 'fieldset/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-fieldset.mjs'],
  },
  {
    name: '@ark-ui/angular/hover-card',
    file: 'src/hover-card/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-hover-card.mjs'],
  },
  {
    name: '@ark-ui/angular/menu',
    file: 'src/menu/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-menu.mjs'],
  },
  {
    name: '@ark-ui/angular/navigation-menu',
    file: 'src/navigation-menu/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-navigation-menu.mjs'],
  },
  {
    name: '@ark-ui/angular/number-input',
    file: 'number-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-number-input.mjs'],
  },
  {
    name: '@ark-ui/angular/password-input',
    file: 'password-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-password-input.mjs'],
  },
  {
    name: '@ark-ui/angular/pin-input',
    file: 'pin-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-pin-input.mjs'],
  },
  {
    name: '@ark-ui/angular/popover',
    file: 'src/popover/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-popover.mjs'],
  },
  {
    name: '@ark-ui/angular/progress',
    file: 'progress/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-progress.mjs'],
  },
  {
    name: '@ark-ui/angular/tags-input',
    file: 'tags-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-tags-input.mjs'],
  },
  {
    name: '@ark-ui/angular/toggle',
    file: 'toggle/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-toggle.mjs'],
  },
  {
    name: '@ark-ui/angular/tooltip',
    file: 'src/tooltip/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-tooltip.mjs'],
  },
  {
    name: '@ark-ui/angular/client-only',
    file: 'src/client-only/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-client-only.mjs'],
  },
  {
    name: '@ark-ui/angular/collection',
    file: 'src/collection/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-collection.mjs'],
  },
  {
    name: '@ark-ui/angular/download-trigger',
    file: 'src/download-trigger/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-download-trigger.mjs'],
  },
  {
    name: '@ark-ui/angular/focus-trap',
    file: 'src/focus-trap/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-focus-trap.mjs'],
  },
  {
    name: '@ark-ui/angular/format',
    file: 'src/format/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-format.mjs'],
  },
  {
    name: '@ark-ui/angular/frame',
    file: 'src/frame/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-frame.mjs'],
  },
  {
    name: '@ark-ui/angular/highlight',
    file: 'src/highlight/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-highlight.mjs'],
  },
  {
    name: '@ark-ui/angular/portal',
    file: 'src/portal/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-portal.mjs'],
  },
  {
    name: '@ark-ui/angular/presence',
    file: 'src/presence/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-presence.mjs'],
  },
  {
    name: '@ark-ui/angular/providers/environment',
    file: 'src/providers/environment/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-providers-environment.mjs'],
  },
  {
    name: '@ark-ui/angular/providers/interaction',
    file: 'src/providers/interaction/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-providers-interaction.mjs'],
  },
  {
    name: '@ark-ui/angular/providers/locale',
    file: 'src/providers/locale/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-providers-locale.mjs'],
  },
  {
    name: '@ark-ui/angular/swap',
    file: 'src/swap/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-swap.mjs'],
  },
]

export const formBearingEntryPoints = new Set<string>([
  '@ark-ui/angular/editable',
  '@ark-ui/angular/number-input',
  '@ark-ui/angular/pin-input',
  '@ark-ui/angular/password-input',
  '@ark-ui/angular/tags-input',
  '@ark-ui/angular/select',
  '@ark-ui/angular/combobox',
])

const selfEntryFiles = new Map(
  entryPoints.flatMap(({ name, file }) => {
    const resolvedFile = join(root, file)
    const internalName = name.replace('@ark-ui/angular/', '@ark-ui/angular/src/')
    return internalName === name
      ? [[name, resolvedFile]]
      : [
          [name, resolvedFile],
          [internalName, resolvedFile],
        ]
  }),
)

const toDisplayPath = (file: string) => relative(root, file)

const isStringLiteralLike = (node: ts.Node): node is ts.StringLiteralLike =>
  ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)

const resolveLocalModule = (fromFile: string, specifier: string) => {
  const selfEntry = selfEntryFiles.get(specifier)
  if (selfEntry) {
    return selfEntry
  }

  if (!specifier.startsWith('.') && !specifier.startsWith('/')) {
    return undefined
  }

  const base = resolve(dirname(fromFile), specifier)
  const candidates = extname(base)
    ? [base]
    : [
        `${base}.ts`,
        `${base}.tsx`,
        `${base}.mts`,
        `${base}.js`,
        `${base}.mjs`,
        join(base, 'index.ts'),
        join(base, 'public-api.ts'),
      ]

  return candidates.find((candidate) => existsSync(candidate))
}

const collectImportSpecifiers = (sourceFile: ts.SourceFile) => {
  const specifiers: string[] = []
  let hasNonLiteralDynamicImport = false

  const collect = (node: ts.Node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      isStringLiteralLike(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text)
    }

    if (
      ts.isImportEqualsDeclaration(node) &&
      ts.isExternalModuleReference(node.moduleReference) &&
      isStringLiteralLike(node.moduleReference.expression)
    ) {
      specifiers.push(node.moduleReference.expression.text)
    }

    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const [specifier] = node.arguments
      if (specifier && isStringLiteralLike(specifier)) {
        specifiers.push(specifier.text)
      } else {
        hasNonLiteralDynamicImport = true
      }
    }

    ts.forEachChild(node, collect)
  }

  collect(sourceFile)
  if (hasNonLiteralDynamicImport) {
    console.warn(
      `${toDisplayPath(sourceFile.fileName)} contains a non-literal dynamic import that forms isolation cannot statically resolve.`,
    )
  }
  return specifiers
}

export type Reporter = {
  error: (message: string) => void
  warn?: (message: string) => void
}

const defaultReporter: Reporter = {
  error: (message) => console.error(message),
  warn: (message) => console.warn(message),
}

const scanFile = (
  name: string,
  file: string,
  visited: Set<string>,
  stack: string[],
  allowForms: boolean,
  reporter: Reporter,
) => {
  const resolvedFile = resolve(file)
  if (visited.has(resolvedFile)) {
    return false
  }

  visited.add(resolvedFile)

  const source = readFileSync(resolvedFile, 'utf-8')
  const sourceFile = ts.createSourceFile(resolvedFile, source, ts.ScriptTarget.Latest, true)
  if (sourceFile.parseDiagnostics.length > 0) {
    for (const diagnostic of sourceFile.parseDiagnostics) {
      reporter.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    }
    return true
  }

  const specifiers = collectImportSpecifiers(sourceFile)
  let failed = false

  for (const specifier of specifiers) {
    if (formsImportPattern.test(specifier)) {
      if (allowForms) {
        continue
      }
      reporter.error(
        `${name} imports from ${specifier} through ${[...stack, resolvedFile].map(toDisplayPath).join(' -> ')}`,
      )
      failed = true
      continue
    }

    const nextFile = resolveLocalModule(resolvedFile, specifier)
    if (nextFile && scanFile(name, nextFile, visited, [...stack, resolvedFile], allowForms, reporter)) {
      failed = true
    }
  }

  return failed
}

export const scanEntryPoint = (entryPoint: { name: string; file: string }, reporter: Reporter = defaultReporter) => {
  const allowForms = formBearingEntryPoints.has(entryPoint.name)
  const visited = new Set<string>()
  return scanFile(entryPoint.name, entryPoint.file, visited, [], allowForms, reporter)
}

export const runFormsIsolationCheck = (reporter: Reporter = defaultReporter) => {
  let failed = false
  const missingOutputs: string[] = []
  for (const { name, file, outputs } of entryPoints) {
    const allowForms = formBearingEntryPoints.has(name)
    const visited = new Set<string>()
    if (scanFile(name, join(root, file), visited, [], allowForms, reporter)) {
      failed = true
    }

    for (const output of outputs) {
      const outputFile = join(root, output)
      if (existsSync(outputFile) && scanFile(name, outputFile, visited, [], allowForms, reporter)) {
        failed = true
      } else if (!existsSync(outputFile)) {
        missingOutputs.push(`${name} (${output})`)
      }
    }
  }

  if (failed) {
    reporter.error('forms isolation failed: non-form entry points must not import @angular/forms transitively.')
    return { failed: true, missingOutputs }
  }

  if (missingOutputs.length > 0) {
    reporter.error(
      `forms isolation: build output not found for ${missingOutputs.join(', ')}; source imports were checked, but bare dependency verification requires running build first.`,
    )
    return { failed: true, missingOutputs }
  }

  return { failed: false, missingOutputs }
}

const isMain = argv[1] ? import.meta.url === pathToFileURL(argv[1]).href : false

if (isMain) {
  const result = runFormsIsolationCheck()
  if (result.failed) {
    exit(1)
  }
  console.log('forms isolation: ok')
}
