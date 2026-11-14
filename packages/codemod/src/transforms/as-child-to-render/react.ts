import { Node, SyntaxKind } from 'ts-morph'
import type { TransformOptions, TransformResult } from '../../types.ts'
import { arkLocalNames, isArkJsx } from '../../utils/ark-imports.ts'
import { createTransformSourceFile } from '../../utils/ts-project.ts'

export function reactAsChildToRender(
  source: string,
  filePath: string,
  options: TransformOptions = {},
): TransformResult {
  const sf = createTransformSourceFile(filePath, source, options.crossFile ?? false)

  let count = 0
  const skipped: string[] = []

  const arkNames = arkLocalNames(sf, { crossFile: options.crossFile })
  if (arkNames.size === 0) return { code: null, count: 0, skipped: [] }

  const elements = sf.getDescendantsOfKind(SyntaxKind.JsxElement).reverse()

  for (const element of elements) {
    const opening = element.getOpeningElement()
    const asChild = opening.getAttribute('asChild')
    if (!asChild) continue

    if (!isArkJsx(sf, opening, arkNames, options)) continue

    if (!Node.isJsxAttribute(asChild)) {
      skipped.push(`${describe(opening)}: asChild is spread, not an attribute`)
      continue
    }

    const initializer = asChild.getInitializer()
    if (initializer && initializer.getText() !== '{true}') {
      skipped.push(`${describe(opening)}: asChild={${initializer.getText()}} is not a plain boolean`)
      continue
    }

    if (opening.getAttribute('render')) {
      skipped.push(`${describe(opening)}: element already has a render prop`)
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
    const renderNode = elementNode(child)
    if (renderNode === undefined) {
      skipped.push(`${describe(opening)}: the child is not an element`)
      continue
    }

    const childText = dedent(renderNode, lineIndent(child) - lineIndent(element))
    asChild.remove()
    const attrs = opening.getAttributes().map((a) => a.getText())
    const replacement = `<${opening.getTagNameNode().getText()} ${[...attrs, `render={${childText}}`].join(' ')} />`
    element.replaceWithText((writer) => writer.queueIndentationLevel(0).write(replacement))
    count++
  }

  if (count === 0) return { code: null, count, skipped }
  const code = sf.getFullText()
  return { code: source.includes('\r\n') ? code.replace(/\r?\n/g, '\r\n') : code, count, skipped }
}

function elementNode(child: Node): Node | undefined {
  if (Node.isJsxElement(child) || Node.isJsxSelfClosingElement(child)) return child
  if (Node.isJsxExpression(child)) {
    const expression = child.getExpression()
    if (expression && isElementExpression(expression)) return expression
  }
  return undefined
}

function isElementExpression(node: Node): boolean {
  if (Node.isParenthesizedExpression(node)) return isElementExpression(node.getExpression())
  if (Node.isJsxElement(node) || Node.isJsxSelfClosingElement(node)) return true
  if (Node.isConditionalExpression(node)) {
    return isElementExpression(node.getWhenTrue()) && isElementExpression(node.getWhenFalse())
  }
  return false
}

function describe(node: Node): string {
  return `line ${node.getStartLineNumber()}`
}

function lineIndent(node: Node): number {
  const line = node.getSourceFile().getFullText().slice(node.getStartLinePos(), node.getStart())
  return line.length - line.trimStart().length
}

function dedent(node: Node, by: number): string {
  const text = node.getText()
  if (by <= 0) return text
  const start = node.getStart()
  const literals = node
    .getDescendants()
    .filter((d) => Node.isNoSubstitutionTemplateLiteral(d) || Node.isTemplateExpression(d) || Node.isStringLiteral(d))
    .map((d) => [d.getStart() - start, d.getEnd() - start])
  const insideLiteral = (offset: number) => literals.some(([from, to]) => offset > from && offset < to)
  const indent = new RegExp(`^[ \\t]{0,${by}}`)
  let offset = 0
  return text
    .split('\n')
    .map((line, index) => {
      const lineStart = offset
      offset += line.length + 1
      return index === 0 || insideLiteral(lineStart) ? line : line.replace(indent, '')
    })
    .join('\n')
}
