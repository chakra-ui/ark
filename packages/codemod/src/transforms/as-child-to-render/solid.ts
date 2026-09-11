import { Node, Project, SyntaxKind } from 'ts-morph'
import type { JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph'
import type { TransformResult } from '../../types.ts'
import { arkLocalNames, isTrackedJsx } from '../../utils/ark-imports.ts'

export function solidAsChildToRender(source: string, filePath: string): TransformResult {
  const project = new Project({ useInMemoryFileSystem: true, compilerOptions: { jsx: 4 } })
  const sf = project.createSourceFile(filePath.endsWith('.tsx') ? filePath : `${filePath}.tsx`, source)

  let count = 0
  const skipped: string[] = []

  const arkNames = arkLocalNames(sf)
  if (arkNames.size === 0) return { code: null, count: 0, skipped: [] }

  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    if (attr.getNameNode().getText() !== 'asChild') continue

    const opening = attr.getFirstAncestor(
      (node): node is JsxOpeningElement | JsxSelfClosingElement =>
        Node.isJsxOpeningElement(node) || Node.isJsxSelfClosingElement(node),
    )
    if (!opening || !isTrackedJsx(opening, arkNames)) continue

    const initializer = attr.getInitializer()
    if (!initializer || !Node.isJsxExpression(initializer)) {
      skipped.push(`line ${attr.getStartLineNumber()}: asChild has no callback to migrate`)
      continue
    }

    const fn = initializer.getExpression()
    if (!fn || (!Node.isArrowFunction(fn) && !Node.isFunctionExpression(fn))) {
      skipped.push(`line ${attr.getStartLineNumber()}: asChild is not a function`)
      continue
    }

    attr.getNameNode().replaceWithText('render')
    count++
  }

  return { code: count > 0 ? sf.getFullText() : null, count, skipped }
}
