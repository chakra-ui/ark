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

  it('merges selectors in style objects', () => {
    const result = cssDataAttributes(
      `export const accordion = defineSlotRecipe({
  base: {
    item: { '& [data-scope="accordion"][data-part="item-indicator"]': { transition: 'transform 0.2s' } },
  },
})`,
      'accordion.ts',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain(`'& [data-accordion-item-indicator]': {`)
  })

  it('merges selectors in template literals and querySelector strings', () => {
    const result = cssDataAttributes(
      `const Trigger = styled.button\`
  &[data-scope='dialog'][data-part='trigger'] { color: red; }
\`
document.querySelector('[data-scope=menu][data-part=content]')`,
      'a.tsx',
    )
    expect(result.count).toBe(2)
    expect(result.code).toContain('&[data-dialog-trigger] {')
    expect(result.code).toContain(`querySelector('[data-menu-content]')`)
  })

  it('only rewrites toggle on-state in JS/TS when it follows a toggle part', () => {
    const result = cssDataAttributes(
      `const radix = '[data-state="on"]'
const toggle = '[data-scope="toggle"][data-part="root"][data-state="on"]'`,
      'a.ts',
    )
    expect(result.code).toContain(`const radix = '[data-state="on"]'`)
    expect(result.code).toContain(`const toggle = '[data-toggle-root][data-pressed]'`)
  })

  it('merges selectors in Vue and Svelte style blocks', () => {
    const sfc = `<template><Dialog.Trigger /></template>
<style>
[data-scope="dialog"][data-part="trigger"] { color: red; }
</style>`
    expect(cssDataAttributes(sfc, 'a.vue').code).toContain('[data-dialog-trigger] {')
    expect(cssDataAttributes(sfc, 'a.svelte').code).toContain('[data-dialog-trigger] {')
  })

  it('does nothing to unrelated css', () => {
    expect(cssDataAttributes(`.foo { color: red; }`, 'a.css').code).toBeNull()
  })
})
