import { existsSync, readFileSync } from 'node:fs'
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path'
import { argv, exit } from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const formsImportPattern = /^@angular\/forms(?:\/|$)/

export interface FormsIsolationEntry {
  name: string
  file: string
  outputs: string[]
  formsAllowed: boolean
}

export const entryPoints: FormsIsolationEntry[] = [
  {
    name: '@ark-ui/angular',
    file: 'src/index.ts',
    outputs: ['dist/fesm2022/ark-ui-angular.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/avatar',
    file: 'avatar/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-avatar.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/clipboard',
    file: 'clipboard/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-clipboard.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/collapsible',
    file: 'src/collapsible/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-collapsible.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/color-picker',
    file: 'src/color-picker/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-color-picker.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/combobox',
    file: 'combobox/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-combobox.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/date-input',
    file: 'src/date-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-date-input.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/date-picker',
    file: 'src/date-picker/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-date-picker.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/dialog',
    file: 'src/dialog/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-dialog.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/drawer',
    file: 'src/drawer/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-drawer.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/editable',
    file: 'editable/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-editable.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/field',
    file: 'field/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-field.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/fieldset',
    file: 'fieldset/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-fieldset.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/file-upload',
    file: 'file-upload/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-file-upload.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/hover-card',
    file: 'src/hover-card/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-hover-card.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/image-cropper',
    file: 'src/image-cropper/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-image-cropper.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/json-tree-view',
    file: 'src/json-tree-view/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-json-tree-view.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/listbox',
    file: 'listbox/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-listbox.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/menu',
    file: 'src/menu/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-menu.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/navigation-menu',
    file: 'src/navigation-menu/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-navigation-menu.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/number-input',
    file: 'number-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-number-input.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/password-input',
    file: 'password-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-password-input.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/pin-input',
    file: 'pin-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-pin-input.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/popover',
    file: 'src/popover/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-popover.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/progress',
    file: 'progress/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-progress.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/qr-code',
    file: 'src/qr-code/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-qr-code.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/select',
    file: 'select/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-select.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/signature-pad',
    file: 'src/signature-pad/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-signature-pad.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/tags-input',
    file: 'tags-input/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-tags-input.mjs'],
    formsAllowed: true,
  },
  {
    name: '@ark-ui/angular/toggle',
    file: 'toggle/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-toggle.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/tooltip',
    file: 'src/tooltip/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-tooltip.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/tree-view',
    file: 'src/tree-view/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-tree-view.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/client-only',
    file: 'src/client-only/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-client-only.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/collection',
    file: 'src/collection/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-collection.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/download-trigger',
    file: 'src/download-trigger/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-download-trigger.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/focus-trap',
    file: 'src/focus-trap/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-focus-trap.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/format',
    file: 'src/format/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-format.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/frame',
    file: 'src/frame/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-frame.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/highlight',
    file: 'src/highlight/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-highlight.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/portal',
    file: 'src/portal/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-portal.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/presence',
    file: 'src/presence/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-presence.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/providers/environment',
    file: 'src/providers/environment/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-providers-environment.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/providers/interaction',
    file: 'src/providers/interaction/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-providers-interaction.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/providers/locale',
    file: 'src/providers/locale/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-providers-locale.mjs'],
    formsAllowed: false,
  },
  {
    name: '@ark-ui/angular/swap',
    file: 'src/swap/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-src-swap.mjs'],
    formsAllowed: false,
  },
]

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

type ScanResult = {
  failed: boolean
  foundFormsImport: boolean
}

const combineScanResults = (...results: ScanResult[]): ScanResult => ({
  failed: results.some((result) => result.failed),
  foundFormsImport: results.some((result) => result.foundFormsImport),
})

const scanFile = (
  name: string,
  file: string,
  visited: Set<string>,
  stack: string[],
  allowForms: boolean,
  reporter: Reporter,
): ScanResult => {
  const resolvedFile = resolve(file)
  if (visited.has(resolvedFile)) {
    return { failed: false, foundFormsImport: false }
  }

  if (!existsSync(resolvedFile)) {
    reporter.error(`forms isolation: source entry not found for ${name} (${toDisplayPath(resolvedFile)})`)
    return { failed: true, foundFormsImport: false }
  }

  visited.add(resolvedFile)

  const source = readFileSync(resolvedFile, 'utf-8')
  const sourceFile = ts.createSourceFile(resolvedFile, source, ts.ScriptTarget.Latest, true)
  const parseDiagnostics =
    (sourceFile as ts.SourceFile & { parseDiagnostics?: readonly ts.Diagnostic[] }).parseDiagnostics ?? []
  if (parseDiagnostics.length > 0) {
    for (const diagnostic of parseDiagnostics) {
      reporter.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    }
    return { failed: true, foundFormsImport: false }
  }

  const specifiers = collectImportSpecifiers(sourceFile)
  let result: ScanResult = { failed: false, foundFormsImport: false }

  for (const specifier of specifiers) {
    if (formsImportPattern.test(specifier)) {
      result = combineScanResults(result, { failed: false, foundFormsImport: true })
      if (allowForms) {
        continue
      }
      reporter.error(
        `${name} imports from ${specifier} through ${[...stack, resolvedFile].map(toDisplayPath).join(' -> ')}`,
      )
      result = combineScanResults(result, { failed: true, foundFormsImport: false })
      continue
    }

    const nextFile = resolveLocalModule(resolvedFile, specifier)
    if (nextFile) {
      result = combineScanResults(
        result,
        scanFile(name, nextFile, visited, [...stack, resolvedFile], allowForms, reporter),
      )
    }
  }

  return result
}

export const scanEntryPoint = (
  entryPoint: Pick<FormsIsolationEntry, 'name' | 'file' | 'formsAllowed'> & { outputs?: string[] },
  reporter: Reporter = defaultReporter,
) => {
  const visited = new Set<string>()
  const sourceFile = isAbsolute(entryPoint.file) ? entryPoint.file : join(root, entryPoint.file)
  const sourceResult = scanFile(entryPoint.name, sourceFile, visited, [], entryPoint.formsAllowed, reporter)
  let failed = sourceResult.failed

  if (entryPoint.formsAllowed && !sourceResult.foundFormsImport) {
    reporter.error(
      `forms isolation: ${entryPoint.name} allows forms but its source entry does not import @angular/forms transitively.`,
    )
    failed = true
  }

  for (const output of entryPoint.outputs ?? []) {
    const outputFile = isAbsolute(output) ? output : join(root, output)
    if (!existsSync(outputFile)) {
      reporter.error(`forms isolation: build output not found for ${entryPoint.name} (${output})`)
      failed = true
      continue
    }
    if (scanFile(entryPoint.name, outputFile, visited, [], entryPoint.formsAllowed, reporter).failed) {
      failed = true
    }
  }

  return failed
}

export const runFormsIsolationCheck = (reporter: Reporter = defaultReporter) => {
  let failed = false
  const missingOutputs: string[] = []
  for (const { name, file, outputs, formsAllowed } of entryPoints) {
    const visited = new Set<string>()
    const sourceResult = scanFile(name, join(root, file), visited, [], formsAllowed, reporter)
    if (sourceResult.failed) {
      failed = true
    }

    if (formsAllowed && !sourceResult.foundFormsImport) {
      reporter.error(
        `forms isolation: ${name} allows forms but its source entry does not import @angular/forms transitively.`,
      )
      failed = true
    }

    for (const output of outputs) {
      const outputFile = join(root, output)
      if (existsSync(outputFile) && scanFile(name, outputFile, visited, [], formsAllowed, reporter).failed) {
        failed = true
      } else if (!existsSync(outputFile)) {
        missingOutputs.push(`${name} (${output})`)
      }
    }
  }

  if (failed) {
    reporter.error(
      'forms isolation failed: non-form entry points must not import @angular/forms transitively, and form-bearing entry points must import it.',
    )
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
