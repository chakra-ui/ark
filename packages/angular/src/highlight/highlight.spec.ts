import { describe, expect, it } from 'vitest'
import { highlightWord } from './highlight'

describe('highlightWord (criterion 33)', () => {
  it('marks an exact match chunk as match: true', () => {
    const chunks = highlightWord({ text: 'Hello World', query: 'World' })
    expect(chunks).toEqual([
      { text: 'Hello ', match: false },
      { text: 'World', match: true },
    ])
  })

  it('matches case-insensitively when ignoreCase is true', () => {
    const chunks = highlightWord({ text: 'Hello World', query: 'hello', ignoreCase: true })
    expect(chunks).toEqual([
      { text: 'Hello', match: true },
      { text: ' World', match: false },
    ])
  })

  it('does not match case differences without ignoreCase', () => {
    const chunks = highlightWord({ text: 'Hello World', query: 'hello' })
    expect(chunks).toEqual([{ text: 'Hello World', match: false }])
  })

  it('returns multiple match chunks for a repeated query when matchAll is true', () => {
    const chunks = highlightWord({ text: 'abc abc', query: 'abc', matchAll: true })
    const matches = chunks.filter((chunk) => chunk.match)
    expect(matches).toHaveLength(2)
    expect(matches.every((chunk) => chunk.text === 'abc')).toBe(true)
    expect(chunks).toEqual([
      { text: 'abc', match: true },
      { text: ' ', match: false },
      { text: 'abc', match: true },
    ])
  })

  it('marks only the first occurrence when matchAll is not set for a string query', () => {
    const chunks = highlightWord({ text: 'abc abc', query: 'abc' })
    expect(chunks).toEqual([
      { text: 'abc', match: true },
      { text: ' abc', match: false },
    ])
  })

  it('returns a single non-match chunk when there is no match', () => {
    const chunks = highlightWord({ text: 'Hello', query: 'World' })
    expect(chunks).toEqual([{ text: 'Hello', match: false }])
  })

  it('is deterministic across repeated invocations with the same input', () => {
    const first = highlightWord({ text: 'abc abc', query: 'abc' })
    const second = highlightWord({ text: 'abc abc', query: 'abc' })
    expect(second).toEqual(first)
  })
})
