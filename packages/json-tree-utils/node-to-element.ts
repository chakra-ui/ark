import { getFunctionString } from './function-string'
import { getPreviewText } from './preview-text'
import type { JsonNode, JsonNodeElement } from './types'

export const jsonNodeToElement = (node: JsonNode): JsonNodeElement => {
  switch (node.type) {
    case 'null':
      return { type: 'span', props: { nodeType: 'null', children: 'null' } }
    case 'undefined':
      return { type: 'span', props: { nodeType: 'undefined', children: 'undefined' } }
    case 'date':
      return { type: 'span', props: { nodeType: 'date', children: (node.value as Date).toISOString() } }
    case 'regex':
      return { type: 'span', props: { nodeType: 'regex', children: String(node.value) } }
    case 'symbol':
      return { type: 'span', props: { nodeType: 'symbol', children: node.value as string } }
    case 'bigint':
      return { type: 'span', props: { nodeType: 'bigint', children: node.value as string } }
    case 'arraybuffer':
      return { type: 'span', props: { nodeType: 'arraybuffer', children: node.value as string } }
    case 'sharedarraybuffer':
      return { type: 'span', props: { nodeType: 'sharedarraybuffer', children: node.value as string } }
    case 'buffer': {
      const buffer = node.value as Buffer
      const preview = Array.from(new Uint8Array(buffer).slice(0, 8))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join(' ')
      const hasMore = buffer.length > 8
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: `Buffer(${buffer.length})` } },
            { type: 'span', props: { kind: 'brace', children: " ['" } },
            { type: 'span', props: { kind: 'preview', children: preview + (hasMore ? ' …' : '') } },
            { type: 'span', props: { kind: 'brace', children: "']" } },
          ],
        },
      }
    }
    case 'circular':
      return { type: 'span', props: { kind: 'circular', children: node.value as string } }
    case 'dataview': {
      const dataView = node.value as DataView
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: `DataView(${dataView.byteLength})` } },
            { type: 'span', props: { kind: 'brace', children: ' { ' } },
            {
              type: 'span',
              props: {
                kind: 'preview',
                children: ` buffer: ArrayBuffer(${dataView.buffer.byteLength}), byteOffset: ${dataView.byteOffset} `,
              },
            },
            { type: 'span', props: { kind: 'brace', children: ' }' } },
          ],
        },
      }
    }
    case 'blob': {
      const blob = node.value as Blob
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'Blob' } },
            { type: 'span', props: { kind: 'brace', children: ' { ' } },
            {
              type: 'span',
              props: {
                kind: 'preview',
                children: `size: ${blob.size}, type: '${blob.type || 'application/octet-stream'}'`,
              },
            },
            { type: 'span', props: { kind: 'brace', children: ' }' } },
          ],
        },
      }
    }
    case 'file': {
      const file = node.value as File
      const maxItems = 2
      const properties = ['name', 'size', 'type', 'lastModified', 'webkitRelativePath']
      const hasMore = properties.length > maxItems
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'File' } },
            { type: 'span', props: { kind: 'brace', children: ' { ' } },
            {
              type: 'span',
              props: {
                kind: 'preview',
                children: `name: '${file.name}', lastModified: ${file.lastModified}${hasMore ? ', …' : ''}`,
              },
            },
            { type: 'span', props: { kind: 'brace', children: ' }' } },
          ],
        },
      }
    }
    case 'url': {
      const url = node.value as URL
      const maxItems = 5
      const properties = [
        'href',
        'origin',
        'protocol',
        'host',
        'hostname',
        'port',
        'pathname',
        'search',
        'hash',
        'username',
        'password',
      ]
      const hasMore = properties.length > maxItems
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'URL' } },
            { type: 'span', props: { kind: 'brace', children: ' { ' } },
            {
              type: 'span',
              props: {
                kind: 'preview',
                children: `origin: '${url.origin}', protocol: '${url.protocol}', username: '${url.username}', password: '${url.password}', host: '${url.host}'${hasMore ? ', …' : ''}`,
              },
            },
            { type: 'span', props: { kind: 'brace', children: ' }' } },
          ],
        },
      }
    }
    case 'urlsearchparams': {
      const params = node.value as URLSearchParams
      const paramsArray = Array.from(params.entries())
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'URLSearchParams' } },
            { type: 'span', props: { kind: 'brace', children: ' { ' } },
            { type: 'span', props: { kind: 'preview', children: `size: ${paramsArray.length}` } },
            { type: 'span', props: { kind: 'brace', children: ' }' } },
          ],
        },
      }
    }
    case 'formdata': {
      const formData = node.value as FormData
      const entriesArray = Array.from(formData.entries())
      const preview = entriesArray
        .slice(0, 2)
        .map(([key, value]) => {
          const valueStr = value instanceof File ? `File(${value.name})` : String(value)
          return `${key}: ${valueStr}`
        })
        .join(', ')
      const hasMore = entriesArray.length > 2
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: `FormData(${entriesArray.length})` } },
            { type: 'span', props: { kind: 'brace', children: ' {' } },
            { type: 'span', props: { kind: 'preview', children: ` ${preview}${hasMore ? ', …' : ''} ` } },
            { type: 'span', props: { kind: 'brace', children: '}' } },
          ],
        },
      }
    }
    case 'promise': {
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'Promise' } },
            { type: 'span', props: { kind: 'brace', children: ' {' } },
            {
              type: 'span',
              props: {
                kind: 'preview',
                children: ' [[PromiseState]]: pending, [[PromiseResult]]: undefined ',
              },
            },
            { type: 'span', props: { kind: 'brace', children: '}' } },
          ],
        },
      }
    }
    case 'headers': {
      const headers = node.value as Headers
      const entriesArray = Array.from(headers.entries())
      const preview = entriesArray
        .slice(0, 2)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
      const hasMore = entriesArray.length > 2
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: `Headers(${entriesArray.length})` } },
            { type: 'span', props: { kind: 'brace', children: ' {' } },
            { type: 'span', props: { kind: 'preview', children: ` ${preview}${hasMore ? ', …' : ''} ` } },
            { type: 'span', props: { kind: 'brace', children: '}' } },
          ],
        },
      }
    }
    case 'int8array':
    case 'uint8array':
    case 'uint8clampedarray':
    case 'int16array':
    case 'uint16array':
    case 'int32array':
    case 'uint32array':
    case 'float32array':
    case 'float64array':
    case 'bigint64array':
    case 'biguint64array': {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const typedArray = node.value as any
      const constructorName = typedArray.constructor.name
      const preview = Array.from(typedArray).slice(0, 5).join(', ')
      const hasMore = typedArray.length > 5
      return {
        type: 'span',
        props: {
          children: [
            {
              type: 'span',
              props: { kind: 'constructor', children: `${constructorName}(${typedArray.length})` },
            },
            { type: 'span', props: { kind: 'brace', children: ' [ ' } },
            { type: 'span', props: { kind: 'preview', children: preview + (hasMore ? ', …' : '') } },
            { type: 'span', props: { kind: 'brace', children: ' ]' } },
          ],
        },
      }
    }

    case 'primitive': {
      const valueType = typeof node.value
      if (valueType === 'string') {
        return { type: 'span', props: { nodeType: 'primitive', children: `"${node.value as string}"` } }
      }
      if (valueType === 'number') {
        return { type: 'span', props: { nodeType: 'primitive', children: node.value as number } }
      }
      if (valueType === 'boolean') {
        return { type: 'span', props: { nodeType: 'primitive', children: String(node.value) } }
      }
      return { type: 'span', props: { nodeType: 'primitive', children: String(node.value) } }
    }

    case 'array': {
      const preview = getPreviewText(node)
      // Only count actual array elements (numeric indices), not length property or non-enumerable properties
      const arrayElementCount =
        node.children?.filter((child) => child.key && !Number.isNaN(Number(child.key)) && !child.isNonEnumerable)
          .length || 0
      const children: JsonNodeElement[] = []
      if (arrayElementCount > 0) {
        children.push({ type: 'span', props: { kind: 'preview', children: `(${arrayElementCount}) ` } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: '[' } })
      if (preview) {
        children.push({ type: 'span', props: { kind: 'preview', children: preview } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: ']' } })
      return { type: 'span', props: { children } }
    }

    case 'object': {
      const preview = getPreviewText(node)
      const children: JsonNodeElement[] = []
      if (node.constructorName) {
        children.push({ type: 'span', props: { kind: 'constructor', children: `${node.constructorName} ` } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: '{' } })
      if (preview) {
        children.push({ type: 'span', props: { kind: 'preview', children: preview } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: '}' } })
      return { type: 'span', props: { children } }
    }
    case 'set': {
      const preview = getPreviewText(node)
      const size = node.children?.length || 0
      const children: JsonNodeElement[] = [
        { type: 'span', props: { kind: 'constructor', children: `Set(${size})` } },
        { type: 'span', props: { kind: 'brace', children: ' {' } },
      ]
      if (preview) {
        children.push({ type: 'span', props: { kind: 'preview', children: preview } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: '}' } })
      return { type: 'span', props: { children } }
    }
    case 'map': {
      const preview = getPreviewText(node)
      const size = node.children?.length || 0
      const children: JsonNodeElement[] = [
        { type: 'span', props: { kind: 'constructor', children: `Map(${size})` } },
        { type: 'span', props: { kind: 'brace', children: ' {' } },
      ]
      if (preview) {
        children.push({ type: 'span', props: { kind: 'preview', children: preview } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: '}' } })
      return { type: 'span', props: { children } }
    }
    case 'weakmap': {
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'WeakMap' } },
            { type: 'span', props: { kind: 'brace', children: ' {' } },
            { type: 'span', props: { kind: 'preview', children: ' [[Entries]]: not enumerable ' } },
            { type: 'span', props: { kind: 'brace', children: '}' } },
          ],
        },
      }
    }
    case 'weakset': {
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: 'WeakSet' } },
            { type: 'span', props: { kind: 'brace', children: ' {' } },
            { type: 'span', props: { kind: 'preview', children: ' [[Entries]]: not enumerable ' } },
            { type: 'span', props: { kind: 'brace', children: '}' } },
          ],
        },
      }
    }
    case 'iterable': {
      const preview = getPreviewText(node)
      const size = node.children?.length || 0
      const children: JsonNodeElement[] = [
        { type: 'span', props: { kind: 'constructor', children: `Iterable(${size})` } },
        { type: 'span', props: { kind: 'brace', children: ' {' } },
      ]
      if (preview) {
        children.push({ type: 'span', props: { kind: 'preview', children: preview } })
      }
      children.push({ type: 'span', props: { kind: 'brace', children: '}' } })
      return { type: 'span', props: { children } }
    }
    case 'error': {
      const errorValue = node.value as Error
      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'constructor', children: errorValue.name } },
            { type: 'span', props: { kind: 'colon', children: ': ' } },
            { type: 'span', props: { nodeType: 'string', children: `"${errorValue.message}"` } },
          ],
        },
      }
    }
    case 'function': {
      const func = node.value as Function
      const funcString = getFunctionString(func)
      const constructorName = func.constructor.name

      // Show a shortened version of the function
      const preview = funcString.length > 50 ? `${funcString.substring(0, 47)}...` : funcString

      let functionTypePrefix = ''
      if (constructorName === 'AsyncFunction') functionTypePrefix += 'async '
      if (constructorName === 'AsyncGeneratorFunction') functionTypePrefix += 'async '
      if (constructorName === 'GeneratorFunction' || constructorName === 'AsyncGeneratorFunction')
        functionTypePrefix += 'ƒ* '
      if (!constructorName.includes('Generator')) functionTypePrefix += 'ƒ '

      return {
        type: 'span',
        props: {
          children: [
            { type: 'span', props: { kind: 'function-type', children: functionTypePrefix } },
            { type: 'span', props: { kind: 'function-body', children: preview } },
          ],
        },
      }
    }

    default:
      return { type: 'span', props: { children: String(node.value) } }
  }
}
