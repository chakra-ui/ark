import type { JsonNodeElement } from './types'

export function errorStackToElement(stack: string): JsonNodeElement {
  const stackLines = stack?.split('\n').filter((line) => line.trim()) || []
  return {
    type: 'span',
    props: {
      children: stackLines.map((line, index) => {
        const appendNewLine = index < stackLines.length - 1
        return {
          type: 'span',
          props: {
            kind: 'error-stack',
            children: [
              { type: 'span', props: { children: line + (appendNewLine ? '\\n' : '') } },
              { type: 'span', props: { children: appendNewLine ? ' +' : '' } },
            ],
          },
        }
      }),
    },
  }
}
