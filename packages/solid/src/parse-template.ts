/* eslint-disable @typescript-eslint/no-explicit-any */
// Forked from https://github.com/natemoo-re/ultrahtml.git under MIT license

type Node = DocumentNode | ElementNode | TextNode | CommentNode | DoctypeNode
type NodeType =
  | typeof DOCUMENT_NODE
  | typeof ELEMENT_NODE
  | typeof TEXT_NODE
  | typeof COMMENT_NODE
  | typeof DOCTYPE_NODE
interface Location {
  start: number
  end: number
}
interface BaseNode {
  type: NodeType
  loc: [Location, Location]
  parent: Node
  [key: string]: any
}

interface LiteralNode extends BaseNode {
  value: string
}

interface ParentNode extends BaseNode {
  children: Node[]
}
interface DocumentNode extends Omit<ParentNode, 'parent'> {
  type: typeof DOCUMENT_NODE
  attributes: Record<string, string>
  parent: undefined
}

interface ElementNode extends ParentNode {
  type: typeof ELEMENT_NODE
  name: string
  attributes: Record<string, string>
}

interface TextNode extends LiteralNode {
  type: typeof TEXT_NODE
}

interface CommentNode extends LiteralNode {
  type: typeof COMMENT_NODE
}

interface DoctypeNode extends LiteralNode {
  type: typeof DOCTYPE_NODE
}

const DOCUMENT_NODE = 0
const ELEMENT_NODE = 1
const TEXT_NODE = 2
const COMMENT_NODE = 3
const DOCTYPE_NODE = 4

const Fragment = Symbol('Fragment')

const VOID_TAGS = new Set<string>([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])
const RAW_TAGS = new Set<string>(['script', 'style'])
const SPLIT_ATTRS_RE = /([@.a-z0-9_:-]*)\s*?=?\s*?(['"]?)([\s\S]*?)\2\s+/gim
const DOM_PARSER_RE =
  /(?:<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<!--)([\s\S]*?)(-->)|(<!)([\s\S]*?)(>))/gm

function splitAttrs(str?: string) {
  const obj: Record<string, string> = {}
  let token: any
  if (str) {
    SPLIT_ATTRS_RE.lastIndex = 0
    str = ' ' + (str || '') + ' '
    while ((token = SPLIT_ATTRS_RE.exec(str))) {
      if (token[0] === ' ') continue
      obj[token[1]] = token[3]
    }
  }
  return obj
}

export function parse(str: string): any {
  let doc: Node, parent: Node, token: any, text, i, bStart, bText, bEnd, tag: Node
  const tags: Node[] = []
  DOM_PARSER_RE.lastIndex = 0
  parent = doc = {
    type: DOCUMENT_NODE,
    children: [] as Node[],
  } as any

  let lastIndex = 0
  function commitTextNode() {
    text = str.substring(lastIndex, DOM_PARSER_RE.lastIndex - token[0].length)
    if (text) {
      // eslint-disable-next-line
      ;(parent as ParentNode).children.push({
        type: TEXT_NODE,
        value: text,
        parent,
      } as any)
    }
  }

  while ((token = DOM_PARSER_RE.exec(str))) {
    bStart = token[5] || token[8]
    bText = token[6] || token[9]
    bEnd = token[7] || token[10]
    if (RAW_TAGS.has(parent.name) && token[2] !== parent.name) {
      i = DOM_PARSER_RE.lastIndex - token[0].length
      if (parent.children.length > 0) {
        parent.children[0].value += token[0]
      }
      continue
    } else if (bStart === '<!--') {
      i = DOM_PARSER_RE.lastIndex - token[0].length
      if (RAW_TAGS.has(parent.name)) {
        continue
      }
      tag = {
        type: COMMENT_NODE,
        value: bText,
        parent: parent,
        loc: [
          {
            start: i,
            end: i + bStart.length,
          },
          {
            start: DOM_PARSER_RE.lastIndex - bEnd.length,
            end: DOM_PARSER_RE.lastIndex,
          },
        ],
      } as any
      tags.push(tag)
      ;(tag.parent as any).children.push(tag)
    } else if (bStart === '<!') {
      i = DOM_PARSER_RE.lastIndex - token[0].length
      tag = {
        type: DOCTYPE_NODE,
        value: bText,
        parent: parent,
        loc: [
          {
            start: i,
            end: i + bStart.length,
          },
          {
            start: DOM_PARSER_RE.lastIndex - bEnd.length,
            end: DOM_PARSER_RE.lastIndex,
          },
        ],
      }
      // commitTextNode();
      tags.push(tag)
      tag.parent.children.push(tag)
    } else if (token[1] !== '/') {
      commitTextNode()
      if (RAW_TAGS.has(parent.name)) {
        lastIndex = DOM_PARSER_RE.lastIndex
        commitTextNode()
        continue
      } else {
        tag = {
          type: ELEMENT_NODE,
          name: token[2] + '',
          attributes: splitAttrs(token[3]),
          parent,
          children: [],
          loc: [
            {
              start: DOM_PARSER_RE.lastIndex - token[0].length,
              end: DOM_PARSER_RE.lastIndex,
            },
          ] as any,
        }
        tags.push(tag)
        tag.parent.children.push(tag)
        if ((token[4] && token[4].indexOf('/') > -1) || VOID_TAGS.has(tag.name)) {
          tag.loc[1] = tag.loc[0]
          tag.isSelfClosingTag = true
        } else {
          parent = tag
        }
      }
    } else {
      commitTextNode()
      // Close parent node if end-tag matches
      if (token[2] + '' === parent.name) {
        tag = parent
        parent = tag.parent!
        tag.loc.push({
          start: DOM_PARSER_RE.lastIndex - token[0].length,
          end: DOM_PARSER_RE.lastIndex,
        })
        text = str.substring(tag.loc[0].end, tag.loc[1].start)
        if (tag.children.length === 0) {
          tag.children.push({
            type: TEXT_NODE,
            value: text,
            parent,
          })
        }
      }
      // account for abuse of self-closing tags when an end-tag is also provided:
      else if (
        token[2] + '' === tags[tags.length - 1].name &&
        tags[tags.length - 1].isSelfClosingTag === true
      ) {
        tag = tags[tags.length - 1]
        tag.loc.push({
          start: DOM_PARSER_RE.lastIndex - token[0].length,
          end: DOM_PARSER_RE.lastIndex,
        })
      }
    }
    lastIndex = DOM_PARSER_RE.lastIndex
  }

  text = str.slice(lastIndex)
  parent.children.push({
    type: TEXT_NODE,
    value: text,
    parent,
  })
  return doc
}

const HTMLString = Symbol('HTMLString')
const AttrString = Symbol('AttrString')
const RenderFn = Symbol('RenderFn')
function mark(str: string, tags: symbol[] = [HTMLString]): { value: string } {
  const v = { value: str }
  for (const tag of tags) {
    Object.defineProperty(v, tag, {
      value: true,
      enumerable: false,
      writable: false,
    })
  }
  return v
}

const ESCAPE_CHARS: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
}
function escapeHTML(str: string): string {
  return str.replace(/[&<>]/g, (c) => ESCAPE_CHARS[c] || c)
}
function attrs(attributes: Record<string, string>) {
  let attrStr = ''
  for (const [key, value] of Object.entries(attributes)) {
    attrStr += ` ${key}="${value}"`
  }
  return mark(attrStr, [HTMLString, AttrString])
}

function renderElement(node: Node): string {
  const { name, attributes = {} } = node
  const children = node.children.map((child: Node) => render(child)).join('')
  if (RenderFn in node) {
    const value = (node as any)[RenderFn](attributes, mark(children))
    if (value && (value as any)[HTMLString]) return value.value
    return escapeHTML(String(value))
  }
  if (name === Fragment) return children
  if (VOID_TAGS.has(name)) {
    return `<${node.name}${attrs(attributes).value}>`
  }
  return `<${node.name}${attrs(attributes).value}>${children}</${node.name}>`
}

export function render(node: Node): string {
  switch (node.type) {
    case DOCUMENT_NODE:
      return node.children.map((child: Node) => render(child)).join('')
    case ELEMENT_NODE:
      return renderElement(node)
    case TEXT_NODE:
      return `${node.value}`
    case COMMENT_NODE:
      return `<!--${node.value}-->`
    case DOCTYPE_NODE:
      return `<!${node.value}>`
  }
}
