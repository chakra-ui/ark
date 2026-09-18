import { describe, expect, it } from 'vitest'
import { cssDataAttributes } from '../src/transforms/data-attributes/css.ts'

describe('css/data-attributes', () => {
  it('merges scope and part selectors', () => {
    const result = cssDataAttributes(`[data-scope="dialog"][data-part="trigger"] { color: red; }`, 'a.css')
    expect(result.count).toBe(1)
    expect(result.code).toContain('[data-dialog-trigger] {')
  })

  it('merges part before scope', () => {
    const result = cssDataAttributes(`[data-part="content"][data-scope="dialog"] { }`, 'a.css')
    expect(result.code).toContain('[data-dialog-content] {')
  })

  it('keeps trailing state attributes', () => {
    const result = cssDataAttributes(`[data-scope="slider"][data-part="thumb"][data-focus] { }`, 'a.css')
    expect(result.code).toContain('[data-slider-thumb][data-focus] {')
  })

  it('rewrites toggle on-state to data-pressed', () => {
    const result = cssDataAttributes(`[data-toggle-root][data-state="on"] { }`, 'a.css')
    expect(result.code).toContain('[data-toggle-root][data-pressed] {')
  })

  it('rewrites toggle-group focus to native selectors', () => {
    const result = cssDataAttributes(
      `[data-toggle-group-root][data-focus] { } [data-toggle-group-item][data-focus] { }`,
      'a.css',
    )
    expect(result.code).toContain('[data-toggle-group-root]:focus-within {')
    expect(result.code).toContain('[data-toggle-group-item]:focus-visible {')
  })

  it('does nothing to unrelated css', () => {
    expect(cssDataAttributes(`.foo { color: red; }`, 'a.css').code).toBeNull()
  })
})
