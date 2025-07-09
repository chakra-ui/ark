import type { JsonNode } from './types'

export const getNodeTypeDescription = (node: JsonNode): string => {
  if (node.type === 'array') {
    return `Array(${node.children?.length || 0})`
  }
  if (node.type === 'set') {
    return `Set(${node.children?.length || 0})`
  }
  if (node.type === 'map') {
    return `Map(${node.children?.length || 0})`
  }
  if (node.type === 'weakmap') {
    return 'WeakMap'
  }
  if (node.type === 'weakset') {
    return 'WeakSet'
  }
  if (node.type === 'dataview') {
    const dataView = node.value as DataView
    return `DataView(${dataView.byteLength})`
  }

  if (node.type === 'buffer') {
    const buffer = node.value as Buffer
    return `Buffer(${buffer.length})`
  }

  if (node.type === 'blob') {
    const blob = node.value as Blob
    return `Blob(${blob.size})`
  }

  if (node.type === 'file') {
    const file = node.value as File
    return `File(${file.size})`
  }

  if (node.type === 'url') {
    return 'URL'
  }

  if (node.type === 'urlsearchparams') {
    return 'URLSearchParams'
  }

  if (node.type === 'formdata') {
    return 'FormData'
  }

  if (node.type === 'promise') {
    return 'Promise'
  }

  if (node.type === 'headers') {
    return 'Headers'
  }

  if (node.type === 'int8array') {
    const typedArray = node.value as Int8Array
    return `Int8Array(${typedArray.length})`
  }

  if (node.type === 'uint8array') {
    const typedArray = node.value as Uint8Array
    return `Uint8Array(${typedArray.length})`
  }

  if (node.type === 'uint8clampedarray') {
    const typedArray = node.value as Uint8ClampedArray
    return `Uint8ClampedArray(${typedArray.length})`
  }

  if (node.type === 'int16array') {
    const typedArray = node.value as Int16Array
    return `Int16Array(${typedArray.length})`
  }

  if (node.type === 'uint16array') {
    const typedArray = node.value as Uint16Array
    return `Uint16Array(${typedArray.length})`
  }

  if (node.type === 'int32array') {
    const typedArray = node.value as Int32Array
    return `Int32Array(${typedArray.length})`
  }

  if (node.type === 'uint32array') {
    const typedArray = node.value as Uint32Array
    return `Uint32Array(${typedArray.length})`
  }

  if (node.type === 'float32array') {
    const typedArray = node.value as Float32Array
    return `Float32Array(${typedArray.length})`
  }

  if (node.type === 'float64array') {
    const typedArray = node.value as Float64Array
    return `Float64Array(${typedArray.length})`
  }

  if (node.type === 'bigint64array') {
    const typedArray = node.value as BigInt64Array
    return `BigInt64Array(${typedArray.length})`
  }

  if (node.type === 'biguint64array') {
    const typedArray = node.value as BigUint64Array
    return `BigUint64Array(${typedArray.length})`
  }

  if (node.type === 'iterable') {
    return `Iterable(${node.children?.length || 0})`
  }

  if (node.type === 'object') {
    return 'Object'
  }

  if (node.type === 'function') {
    const func = node.value as Function
    const name = func.name || 'anonymous'
    const constructorName = func.constructor.name

    switch (constructorName) {
      case 'AsyncFunction':
        return `async ƒ ${name}()`
      case 'AsyncGeneratorFunction':
        return `async ƒ* ${name}()`
      case 'GeneratorFunction':
        return `ƒ* ${name}()`
      default:
        return `ƒ ${name}()`
    }
  }

  return String(node.value)
}
