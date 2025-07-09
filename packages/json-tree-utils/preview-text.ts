import { getNodeTypeDescription } from './node-type-description'
import type { JsonNode } from './types'

export const getPreviewText = (node: JsonNode, maxItems = 3): string => {
  if (node.type === 'object' && node.children) {
    const previews = node.children.slice(0, maxItems).map((child) => {
      const valueDesc = getNodeTypeDescription(child)
      return `${child.key}: ${valueDesc}`
    })

    const hasMore = node.children.length > maxItems
    return ` ${previews.join(', ')}${hasMore ? ' , … ' : ' '}`
  }

  if (node.type === 'map' && node.value instanceof Map) {
    const entries = Array.from((node.value as Map<unknown, unknown>).entries())
    const previews = entries.slice(0, maxItems).map(([key, value]) => {
      let valueDesc = ''
      if (value === null) valueDesc = 'null'
      else if (value === undefined) valueDesc = 'undefined'
      else if (typeof value === 'string') valueDesc = `"${value}"`
      else if (typeof value === 'number' || typeof value === 'boolean') valueDesc = String(value)
      else if (value instanceof Date) valueDesc = value.toISOString()
      else if (value instanceof Set) valueDesc = `Set(${value.size})`
      else if (value instanceof Map) valueDesc = `Map(${value.size})`
      else if (Array.isArray(value)) valueDesc = `Array(${value.length})`
      else if (typeof value === 'object') valueDesc = 'Object'
      else valueDesc = String(value)

      const keyStr = typeof key === 'string' ? `"${key}"` : String(key)
      return `${keyStr} => ${valueDesc}`
    })
    const hasMore = entries.length > maxItems
    return ` ${previews.join(', ')}${hasMore ? ' , … ' : ' '}`
  }

  if (node.type === 'array' && node.children) {
    const enumerableChildren = node.children.filter((child) => !child.isNonEnumerable && child.key !== 'length')
    const values = enumerableChildren.slice(0, maxItems).map((child) => {
      if (child.type === 'primitive') {
        if (typeof child.value === 'string') return `"${child.value}"`
        return String(child.value)
      }
      if (child.type === 'null') return 'null'
      if (child.type === 'undefined') return 'undefined'
      if (child.type === 'object') return '{…}'
      if (child.type === 'array') return '[…]'
      if (child.type === 'set') return 'Set(…)'
      if (child.type === 'map') return 'Map(…)'
      return String(child.value)
    })
    const hasMore = enumerableChildren.length > maxItems
    return ` ${values.join(', ')}${hasMore ? ' , … ' : ' '}`
  }

  if (node.type === 'set' && node.children) {
    const values = node.children.slice(0, maxItems).map((child) => {
      if (child.type === 'primitive') {
        if (typeof child.value === 'string') return `"${child.value}"`
        return String(child.value)
      }
      if (child.type === 'null') return 'null'
      if (child.type === 'undefined') return 'undefined'
      if (child.type === 'object') return '{…}'
      if (child.type === 'array') return '[…]'
      if (child.type === 'set') return 'Set(…)'
      if (child.type === 'map') return 'Map(…)'
      if (child.type === 'iterable') return 'Iterable(…)'
      return String(child.value)
    })
    const hasMore = node.children.length > maxItems
    return ` ${values.join(', ')}${hasMore ? ' , … ' : ' '}`
  }

  if (node.type === 'iterable' && node.children) {
    const values = node.children.slice(0, maxItems).map((child) => {
      if (child.type === 'primitive') {
        if (typeof child.value === 'string') return `"${child.value}"`
        return String(child.value)
      }
      if (child.type === 'null') return 'null'
      if (child.type === 'undefined') return 'undefined'
      if (child.type === 'object') return '{…}'
      if (child.type === 'array') return '[…]'
      if (child.type === 'set') return 'Set(…)'
      if (child.type === 'map') return 'Map(…)'
      if (child.type === 'iterable') return 'Iterable(…)'
      if (child.type === 'function') return 'ƒ(…)'
      return String(child.value)
    })
    const hasMore = node.children.length > maxItems
    return ` ${values.join(', ')}${hasMore ? ' , … ' : ' '}`
  }

  if (node.type === 'function') {
    return ''
  }

  return ''
}
