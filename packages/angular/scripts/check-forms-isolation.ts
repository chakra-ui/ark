import { existsSync, readFileSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { exit } from 'node:process'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const formsImportPattern = /^@angular\/forms(?:\/|$)/

const entryPoints = [
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
    name: '@ark-ui/angular/progress',
    file: 'progress/public-api.ts',
    outputs: ['dist/fesm2022/ark-ui-angular-progress.mjs'],
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
    // Bare dependency coverage comes from the optional FESM scan after build output exists.
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

const scanFile = (name: string, file: string, visited: Set<string>, stack: string[]) => {
  const resolvedFile = resolve(file)
  if (visited.has(resolvedFile)) {
    return false
  }

  visited.add(resolvedFile)

  const source = readFileSync(resolvedFile, 'utf-8')
  const sourceFile = ts.createSourceFile(resolvedFile, source, ts.ScriptTarget.Latest, true)
  if (sourceFile.parseDiagnostics.length > 0) {
    for (const diagnostic of sourceFile.parseDiagnostics) {
      console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
    }
    return true
  }

  const specifiers = collectImportSpecifiers(sourceFile)
  let failed = false

  for (const specifier of specifiers) {
    if (formsImportPattern.test(specifier)) {
      console.error(
        `${name} imports from ${specifier} through ${[...stack, resolvedFile].map(toDisplayPath).join(' -> ')}`,
      )
      failed = true
      continue
    }

    const nextFile = resolveLocalModule(resolvedFile, specifier)
    if (nextFile && scanFile(name, nextFile, visited, [...stack, resolvedFile])) {
      failed = true
    }
  }

  return failed
}

let failed = false
const missingOutputs: string[] = []
for (const { name, file, outputs } of entryPoints) {
  const visited = new Set<string>()
  if (scanFile(name, join(root, file), visited, [])) {
    failed = true
  }

  for (const output of outputs) {
    const outputFile = join(root, output)
    if (existsSync(outputFile) && scanFile(name, outputFile, visited, [])) {
      failed = true
    } else if (!existsSync(outputFile)) {
      missingOutputs.push(`${name} (${output})`)
    }
  }
}

if (failed) {
  console.error('forms isolation failed: non-form entry points must not import @angular/forms transitively.')
  exit(1)
}

if (missingOutputs.length > 0) {
  console.error(
    `forms isolation: build output not found for ${missingOutputs.join(', ')}; source imports were checked, but bare dependency verification requires running build first.`,
  )
  failed = true
}

if (failed) {
  exit(1)
}

console.log('forms isolation: ok')
