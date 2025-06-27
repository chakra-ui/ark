import { jsonToTree } from './json-to-tree'
import type { JsonNode } from './types'

const regexReturnCharacters = /\r/g
function hash(str: string) {
  const v = str.replace(regexReturnCharacters, '')
  let hash = 5381
  let i = v.length
  while (i--) hash = ((hash << 5) - hash) ^ v.charCodeAt(i)
  return (hash >>> 0).toString(36)
}

export function nodeToValue(node: JsonNode) {
  return hash(node.id)
}

export function nodeToString(node: JsonNode) {
  return node.key || 'root'
}

export function getRootNode(data: unknown): JsonNode {
  return {
    id: '#',
    key: '',
    value: '',
    type: 'object',
    children: [jsonToTree(data, '', '#', new WeakSet(), [], '')],
  }
}
