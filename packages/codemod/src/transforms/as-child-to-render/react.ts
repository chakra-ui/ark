import { Node, Project, SyntaxKind } from 'ts-morph'
import type { TransformResult } from '../../types.ts'

export function reactAsChildToRender(source: string, filePath: string): TransformResult {
  const project = new Project({ useInMemoryFileSystem: true, compilerOptions: { jsx: 4 } })
  const sf = project.createSourceFile(filePath.endsWith('.tsx') ? filePath : `${filePath}.tsx`, source)

  let count = 0
  const skipped: string[] = []

  const elements = sf.getDescendantsOfKind(SyntaxKind.JsxElement).reverse()

  for (const element of elements) {
    const opening = element.getOpeningElement()
    const asChild = opening.getAttribute('asChild')
    if (!asChild) continue

    if (!Node.isJsxAttribute(asChild)) {
      skipped.push(`${describe(opening)}: asChild is spread, not an attribute`)
      continue
    }

    const initializer = asChild.getInitializer()
    if (initializer && initializer.getText() !== '{true}') {
      skipped.push(`${describe(opening)}: asChild={${initializer.getText()}} is not a plain boolean`)
      continue
    }

    const children = element.getJsxChildren().filter((child) => {
      if (Node.isJsxText(child)) return child.getText().trim().length > 0
      return true
    })

    if (children.length !== 1) {
      skipped.push(`${describe(opening)}: expected exactly one child element, found ${children.length}`)
      continue
    }

    const [child] = children
    if (!Node.isJsxElement(child) && !Node.isJsxSelfClosingElement(child)) {
      skipped.push(`${describe(opening)}: the child is not an element`)
      continue
    }

    const childText = child.getText()
    asChild.remove()
    const attrs = opening.getAttributes().map((a) => a.getText())
    element.replaceWithText(
      `<${opening.getTagNameNode().getText()} ${[...attrs, `render={${childText}}`].join(' ')} />`,
    )
    count++
  }

  return { code: count > 0 ? sf.getFullText() : null, count, skipped }
}

function describe(node: Node): string {
  return `line ${node.getStartLineNumber()}`
}
