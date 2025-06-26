import { getNodeTypeDescription } from './node-type-description'
import type { JsonNode } from './types'

export const getAccessibleDescription = (node: JsonNode): string => {
  const typeDescription = getNodeTypeDescription(node)
  const key = node.key || 'root'
  const nonEnumerablePrefix = node.isNonEnumerable ? 'non-enumerable ' : ''

  // For expandable nodes, include child count
  if (node.children && node.children.length > 0) {
    const childCount = node.children.length
    const childText = childCount === 1 ? 'property' : 'properties'
    return `${key}: ${nonEnumerablePrefix}${typeDescription}, expandable with ${childCount} ${childText}`
  }

  // For leaf nodes, include the actual value for primitives
  if (node.type === 'primitive') {
    const value = typeof node.value === 'string' ? `"${node.value}"` : String(node.value)
    const info =
      node.isNonEnumerable && node.propertyDescriptor ? `, ${getDescriptorInfo(node.propertyDescriptor)}` : ''
    return `${key}: ${nonEnumerablePrefix}${value}${info}`
  }

  if (node.type === 'null') {
    return `${key}: ${nonEnumerablePrefix}null`
  }

  if (node.type === 'undefined') {
    return `${key}: ${nonEnumerablePrefix}undefined`
  }

  if (node.type === 'circular') {
    return `${key}: ${nonEnumerablePrefix}circular reference`
  }

  // For other leaf nodes, just use type description
  const info = node.isNonEnumerable && node.propertyDescriptor ? `, ${getDescriptorInfo(node.propertyDescriptor)}` : ''
  return `${key}: ${nonEnumerablePrefix}${typeDescription}${info}`
}

const getDescriptorInfo = (descriptor: PropertyDescriptor): string => {
  const parts: string[] = []
  if (!descriptor.writable) parts.push('read-only')
  if (!descriptor.configurable) parts.push('non-configurable')
  return parts.length > 0 ? parts.join(', ') : 'non-enumerable'
}
