import { getFunctionString } from './function-string'
import type { JsonNode } from './types'

const join = (...parts: string[]) => parts.filter(Boolean).join('/')

const ROOT_ID = '#'

export const jsonToTree = (
  data: unknown,
  parentKey = '',
  parentId = '',
  visited = new WeakSet(),
  keyPath: (string | number)[] = [],
  dataTypePath = '',
): JsonNode => {
  const id = parentId ? `${parentId}/${parentKey}` : parentKey || ROOT_ID

  // Build the full path from root - only add parentKey if it's not empty and not 'root'
  const currentKeyPath = parentKey && parentKey !== ROOT_ID ? [...keyPath, parentKey] : keyPath
  const currentDataTypePath = dataTypePath ? `${dataTypePath}/${parentKey}` : parentKey || ''

  // Check for circular references for objects
  if (data && typeof data === 'object') {
    if (visited.has(data)) {
      return {
        id,
        key: parentKey,
        value: '[Circular Reference]',
        type: 'circular',
        keyPath: currentKeyPath,
        dataTypePath: currentDataTypePath,
      }
    }
    visited.add(data)
  }

  if (data === null) {
    return {
      id,
      key: parentKey,
      value: null,
      type: 'null',
      keyPath: currentKeyPath,
      dataTypePath: currentDataTypePath,
    }
  }

  if (data === undefined) {
    return {
      id,
      key: parentKey,
      value: undefined,
      type: 'undefined',
      keyPath: currentKeyPath,
      dataTypePath: currentDataTypePath,
    }
  }

  if (typeof data === 'symbol') {
    return {
      id,
      key: parentKey,
      value: data.toString(),
      type: 'symbol',
    }
  }

  if (typeof data === 'bigint') {
    return {
      id,
      key: parentKey,
      value: `${data}n`,
      type: 'bigint',
    }
  }

  if (typeof data === 'function') {
    const funcName = data.name || 'anonymous'
    const constructorName = data.constructor.name

    // Extract function properties
    const funcProperties = []

    // Add the [[Function]] internal property showing the function implementation
    const funcString = getFunctionString(data)
    funcProperties.push({ key: '[[Function]]', value: funcString })

    // Add function metadata
    funcProperties.push({ key: 'name', value: funcName })
    funcProperties.push({ key: 'length', value: data.length })
    funcProperties.push({ key: 'constructor', value: constructorName })

    // Add any additional enumerable properties
    const additionalProps = Object.getOwnPropertyNames(data)
      .filter((key) => !['name', 'length', 'prototype', 'caller', 'arguments'].includes(key))
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .map((key) => ({ key, value: (data as any)[key] }))

    const allProperties = [...funcProperties, ...additionalProps]
    const children = allProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'function',
      children,
    }
  }

  if (data instanceof ArrayBuffer) {
    return {
      id,
      key: parentKey,
      value: `ArrayBuffer(${data.byteLength})`,
      type: 'arraybuffer',
    }
  }

  if (typeof SharedArrayBuffer !== 'undefined' && data instanceof SharedArrayBuffer) {
    return {
      id,
      key: parentKey,
      value: `SharedArrayBuffer(${data.byteLength})`,
      type: 'sharedarraybuffer',
    }
  }

  // Buffer detection (Node.js)
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
    return {
      id,
      key: parentKey,
      value: data,
      type: 'buffer',
    }
  }

  if (data instanceof DataView) {
    const dataViewProperties = [
      { key: 'buffer', value: data.buffer },
      { key: 'byteLength', value: data.byteLength },
      { key: 'byteOffset', value: data.byteOffset },
    ]

    const children = dataViewProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'dataview',
      children,
    }
  }

  if (data instanceof Error) {
    const errorProperties = [
      { key: 'name', value: data.name },
      { key: 'message', value: data.message },
      { key: 'stack', value: data.stack },
    ]

    // Add any additional enumerable properties
    const additionalProps = Object.getOwnPropertyNames(data)
      .filter((key) => !['name', 'message', 'stack'].includes(key))
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .map((key) => ({ key, value: (data as any)[key] }))

    const allProperties = [...errorProperties, ...additionalProps]
    const children = allProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'error',
      children,
    }
  }

  if (data instanceof Date) {
    return {
      id,
      key: parentKey,
      value: data,
      type: 'date',
    }
  }

  if (data instanceof RegExp) {
    const regexProperties = [
      { key: 'lastIndex', value: data.lastIndex },
      { key: 'dotAll', value: data.dotAll },
      { key: 'flags', value: data.flags },
      { key: 'global', value: data.global },
      { key: 'hasIndices', value: data.hasIndices },
      { key: 'ignoreCase', value: data.ignoreCase },
      { key: 'multiline', value: data.multiline },
      { key: 'source', value: data.source },
      { key: 'sticky', value: data.sticky },
      { key: 'unicode', value: data.unicode },
    ]

    const children = regexProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'regex',
      children,
    }
  }

  if (data instanceof Set) {
    const entriesChildren = Array.from(data).map((item, index) =>
      jsonToTree(item, index.toString(), `${id}.[[Entries]]`, visited, currentKeyPath, currentDataTypePath),
    )
    const entriesNode = {
      id: `${id}.[[Entries]]`,
      key: '[[Entries]]',
      value: Array.from(data),
      type: 'array' as const,
      children: entriesChildren,
    }
    const sizeNode = jsonToTree(data.size, 'size', id, visited, currentKeyPath, currentDataTypePath)

    return {
      id,
      key: parentKey,
      value: data,
      type: 'set',
      children: [entriesNode, sizeNode],
    }
  }

  if (data instanceof Map) {
    const entriesChildren = Array.from(data.entries()).map(([key, value], index) => {
      const entryId = join(id, '[[Entries]]', index.toString())
      const entryKeyPath = [...currentKeyPath, '[[Entries]]', index.toString()]
      const entryDataTypePath = join(currentDataTypePath, '[[Entries]]', index.toString())
      const keyNode = jsonToTree(key, 'key', entryId, visited, entryKeyPath, entryDataTypePath)
      const valueNode = jsonToTree(value, 'value', entryId, visited, entryKeyPath, entryDataTypePath)

      return {
        id: entryId,
        key: index.toString(),
        value: { [String(key)]: value },
        type: 'object' as const,
        children: [keyNode, valueNode],
      }
    })
    const entriesNode = {
      id: join(id, '[[Entries]]'),
      key: '[[Entries]]',
      value: Array.from(data.entries()),
      type: 'array' as const,
      children: entriesChildren,
    }
    const sizeNode = jsonToTree(data.size, 'size', id, visited, currentKeyPath, currentDataTypePath)

    return {
      id,
      key: parentKey,
      value: data,
      type: 'map',
      children: [entriesNode, sizeNode],
    }
  }

  if (data instanceof WeakMap) {
    return {
      id,
      key: parentKey,
      value: data,
      type: 'weakmap',
    }
  }

  if (data instanceof WeakSet) {
    return {
      id,
      key: parentKey,
      value: data,
      type: 'weakset',
    }
  }

  if (typeof Blob !== 'undefined' && data instanceof Blob) {
    const blobProperties = [
      { key: 'size', value: data.size },
      { key: 'type', value: data.type },
    ]

    const children = blobProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'blob',
      children,
    }
  }

  if (typeof File !== 'undefined' && data instanceof File) {
    const fileProperties = [
      { key: 'name', value: data.name },
      { key: 'size', value: data.size },
      { key: 'type', value: data.type },
      { key: 'lastModified', value: data.lastModified },
      { key: 'webkitRelativePath', value: data.webkitRelativePath },
    ]

    const children = fileProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'file',
      children,
    }
  }

  if (typeof URL !== 'undefined' && data instanceof URL) {
    const urlProperties = [
      { key: 'href', value: data.href },
      { key: 'origin', value: data.origin },
      { key: 'protocol', value: data.protocol },
      { key: 'host', value: data.host },
      { key: 'hostname', value: data.hostname },
      { key: 'port', value: data.port },
      { key: 'pathname', value: data.pathname },
      { key: 'search', value: data.search },
      { key: 'hash', value: data.hash },
    ]

    const children = urlProperties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: 'url',
      children,
    }
  }

  if (typeof URLSearchParams !== 'undefined' && data instanceof URLSearchParams) {
    const entriesChildren = Array.from(data.entries()).map(([key, value], index) => {
      const entryId = join(id, '[[Entries]]', index.toString())
      const keyNode = jsonToTree(key, 'key', entryId, visited)
      const valueNode = jsonToTree(value, 'value', entryId, visited)

      return {
        id: entryId,
        key: index.toString(),
        value: { [key]: value },
        type: 'object' as const,
        children: [keyNode, valueNode],
      }
    })

    const entriesNode = {
      id: join(id, '[[Entries]]'),
      key: '[[Entries]]',
      value: Array.from(data.entries()),
      type: 'array' as const,
      children: entriesChildren,
    }

    return {
      id,
      key: parentKey,
      value: data,
      type: 'urlsearchparams',
      children: [entriesNode],
    }
  }

  if (data instanceof Promise) {
    return {
      id,
      key: parentKey,
      value: data,
      type: 'promise',
    }
  }

  if (typeof Headers !== 'undefined' && data instanceof Headers) {
    const entriesChildren = Array.from(data.entries()).map(([key, value], index) => {
      const entryId = join(id, '[[Entries]]', index.toString())
      const keyNode = jsonToTree(key, 'key', entryId, visited)
      const valueNode = jsonToTree(value, 'value', entryId, visited)

      return {
        id: entryId,
        key: index.toString(),
        value: { [key]: value },
        type: 'object' as const,
        children: [keyNode, valueNode],
      }
    })

    const entriesNode = {
      id: join(id, '[[Entries]]'),
      key: '[[Entries]]',
      value: Array.from(data.entries()),
      type: 'array' as const,
      children: entriesChildren,
    }

    return {
      id,
      key: parentKey,
      value: data,
      type: 'headers',
      children: [entriesNode],
    }
  }

  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const entriesChildren = Array.from(data.entries()).map(([key, value], index) => {
      const entryId = join(id, '[[Entries]]', index.toString())
      const keyNode = jsonToTree(key, 'key', entryId, visited)
      const valueNode = jsonToTree(value, 'value', entryId, visited)

      return {
        id: entryId,
        key: index.toString(),
        value: { [key]: value },
        type: 'object' as const,
        children: [keyNode, valueNode],
      }
    })

    const entriesNode = {
      id: join(id, '[[Entries]]'),
      key: '[[Entries]]',
      value: Array.from(data.entries()),
      type: 'array' as const,
      children: entriesChildren,
    }

    return {
      id,
      key: parentKey,
      value: data,
      type: 'formdata',
      children: [entriesNode],
    }
  }

  if (Array.isArray(data)) {
    // Handle sparse arrays by showing only slots with actual values
    // This prevents crashes when arrays have holes (e.g., let arr = []; arr[50] = "value")
    const arrayChildren: JsonNode[] = []

    // Use Object.keys to get only the indices that actually have values
    // This automatically handles sparse arrays by skipping undefined slots
    const definedIndices = Object.keys(data)
      .filter((key) => !Number.isNaN(Number(key))) // Only numeric indices
      .map(Number)
      .sort((a, b) => a - b) // Sort numerically

    // Create nodes only for indices that have values
    for (const index of definedIndices) {
      arrayChildren.push(jsonToTree(data[index], index.toString(), id, visited, currentKeyPath, currentDataTypePath))
    }

    // Add length property to show the true size of the array (including sparse slots)
    const lengthChild = jsonToTree(data.length, 'length', id, visited, currentKeyPath, currentDataTypePath)

    // Get non-enumerable properties
    const allPropertyNames = Object.getOwnPropertyNames(data)
    const enumerableKeys = Object.keys(data).filter((key) => !Number.isNaN(Number(key))) // Only numeric indices
    const nonEnumerableKeys = allPropertyNames.filter(
      (key) =>
        !enumerableKeys.includes(key) &&
        key !== 'length' && // length is already handled above
        Number.isNaN(Number(key)), // exclude numeric indices
    )

    const nonEnumerableChildren = nonEnumerableKeys.map((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(data, key)
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const node = jsonToTree((data as any)[key], key, id, visited, currentKeyPath, currentDataTypePath)
      node.isNonEnumerable = true
      node.propertyDescriptor = descriptor
      return node
    })

    const children = [...arrayChildren, lengthChild, ...nonEnumerableChildren]

    return {
      id,
      key: parentKey,
      value: data,
      type: 'array',
      children,
      keyPath: currentKeyPath,
      dataTypePath: currentDataTypePath,
    }
  }

  // Check for typed arrays before the generic iterable check
  const typedArrayConstructors = {
    Int8Array: 'int8array',
    Uint8Array: 'uint8array',
    Uint8ClampedArray: 'uint8clampedarray',
    Int16Array: 'int16array',
    Uint16Array: 'uint16array',
    Int32Array: 'int32array',
    Uint32Array: 'uint32array',
    Float32Array: 'float32array',
    Float64Array: 'float64array',
    BigInt64Array: 'bigint64array',
    BigUint64Array: 'biguint64array',
  } as const

  if (data && typeof data === 'object' && data.constructor.name in typedArrayConstructors) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const typedArray = data as any
    const properties = [
      { key: 'length', value: typedArray.length },
      { key: 'byteLength', value: typedArray.byteLength },
      { key: 'byteOffset', value: typedArray.byteOffset },
      { key: 'buffer', value: typedArray.buffer },
    ]

    // Show first few values
    const values = Array.from(typedArray).slice(0, 100) // Limit for performance
    properties.push({ key: '[[Values]]', value: values })

    const children = properties.map(({ key, value }) => jsonToTree(value, key, id, visited))

    return {
      id,
      key: parentKey,
      value: data,
      type: typedArrayConstructors[data.constructor.name as keyof typeof typedArrayConstructors],
      children,
    }
  }

  // Check for other iterables (excluding already handled types)
  if (
    data &&
    typeof data === 'object' &&
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    typeof (data as any)[Symbol.iterator] === 'function' &&
    !(data instanceof Set) &&
    !(data instanceof Map) &&
    !Array.isArray(data) &&
    !(data instanceof Date) &&
    !(data instanceof RegExp) &&
    !(data instanceof ArrayBuffer)
  ) {
    const entriesArray = Array.from(data as Iterable<unknown>)
    const entriesChildren = entriesArray.map((item, index) =>
      jsonToTree(item, index.toString(), join(id, '[[Entries]]'), visited),
    )
    const entriesNode = {
      id: join(id, '[[Entries]]'),
      key: '[[Entries]]',
      value: entriesArray,
      type: 'array' as const,
      children: entriesChildren,
    }

    // Try to get size/length property
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const sizeValue = (data as any).size ?? (data as any).length ?? entriesArray.length
    const sizeNode = jsonToTree(sizeValue, 'size', id, visited)

    return {
      id,
      key: parentKey,
      value: data,
      type: 'iterable',
      children: [entriesNode, sizeNode],
    }
  }

  // Check for custom classes (objects with non-Object constructor)
  if (typeof data === 'object' && data !== null && data.constructor !== Object) {
    const constructorName = data.constructor.name
    const allPropertyNames = Object.getOwnPropertyNames(data)
    const enumerableKeys = Object.keys(data)
    const nonEnumerableKeys = allPropertyNames.filter((key) => !enumerableKeys.includes(key))

    const children = [
      // Enumerable properties
      ...enumerableKeys.map((key) =>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        jsonToTree((data as any)[key], key, id, visited, currentKeyPath, currentDataTypePath),
      ),
      // Non-enumerable properties (with special marking)
      ...nonEnumerableKeys.map((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(data, key)
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const node = jsonToTree((data as any)[key], `[[${key}]]`, id, visited, currentKeyPath, currentDataTypePath)
        node.isNonEnumerable = true
        node.propertyDescriptor = descriptor
        return node
      }),
    ]

    return {
      id,
      key: parentKey,
      value: data,
      type: 'object',
      constructorName,
      children,
      keyPath: currentKeyPath,
      dataTypePath: currentDataTypePath,
    }
  }

  if (typeof data === 'object') {
    const allPropertyNames = Object.getOwnPropertyNames(data)
    const enumerableKeys = Object.keys(data)
    const nonEnumerableKeys = allPropertyNames.filter((key) => !enumerableKeys.includes(key))

    const children = [
      // Enumerable properties
      ...enumerableKeys.map((key) =>
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        jsonToTree((data as any)[key], key, id, visited, currentKeyPath, currentDataTypePath),
      ),
      // Non-enumerable properties (with special marking)
      ...nonEnumerableKeys.map((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(data, key)
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const node = jsonToTree((data as any)[key], `[[${key}]]`, id, visited, currentKeyPath, currentDataTypePath)
        node.isNonEnumerable = true
        node.propertyDescriptor = descriptor
        return node
      }),
    ]

    return {
      id,
      key: parentKey,
      value: data,
      type: 'object',
      children,
      keyPath: currentKeyPath,
      dataTypePath: currentDataTypePath,
    }
  }

  return {
    id,
    key: parentKey,
    value: data,
    type: 'primitive',
    keyPath: currentKeyPath,
    dataTypePath: currentDataTypePath,
  }
}
