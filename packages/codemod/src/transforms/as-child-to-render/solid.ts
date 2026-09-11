import { Node, Project, SyntaxKind } from 'ts-morph'
import type { TransformResult } from '../../types.ts'

export function solidAsChildToRender(source: string, filePath: string): TransformResult {
  const project = new Project({ useInMemoryFileSystem: true, compilerOptions: { jsx: 4 } })
  const sf = project.createSourceFile(filePath.endsWith('.tsx') ? filePath : `${filePath}.tsx`, source)

  let count = 0
  const skipped: string[] = []

  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    if (attr.getNameNode().getText() !== 'asChild') continue

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

    const [param] = fn.getParameters()
    if (param) {
      const name = param.getName()
      for (const call of fn.getDescendantsOfKind(SyntaxKind.CallExpression)) {
        if (call.getExpression().getText() === name && call.getArguments().length === 0) {
          call.replaceWithText(name)
        }
      }
    }

    attr.getNameNode().replaceWithText('render')
    count++
  }

  return { code: count > 0 ? sf.getFullText() : null, count, skipped }
}
