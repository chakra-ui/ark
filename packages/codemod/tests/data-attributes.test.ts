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

  it('renames tree-view parts to their v6 names', () => {
    const result = cssDataAttributes(
      `[data-scope="tree-view"][data-part="branch-control"] { }
[data-scope="tree-view"][data-part="item"] { }
[data-tree-view-branch-content] { }
[data-tree-view-branch-indent-guide] { }
[data-tree-view-branch-trigger] { }
[data-tree-view-item-text] { }`,
      'a.css',
    )
    expect(result.code).toBe(`[data-tree-view-node][data-branch] { }
[data-tree-view-node]:not([data-branch]) { }
[data-tree-view-node-group-content] { }
[data-tree-view-indent-guide] { }
[data-tree-view-node-expand-trigger] { }
[data-tree-view-node-text] { }`)
  })

  it('moves json-tree-view selectors onto the tree-view attributes', () => {
    const result = cssDataAttributes(
      `[data-scope="json-tree-view"][data-part="branch"] { } [data-scope="json-tree-view"][data-part="tree"] { }`,
      'a.css',
    )
    expect(result.code).toBe(`[data-tree-view-node-group] { } [data-tree-view-tree] { }`)
  })

  it('counts a json-tree-view selector once and leaves parts v6 does not have', () => {
    const result = cssDataAttributes(
      `[data-scope="json-tree-view"][data-part="label"] { } [data-json-tree-view-item-indicator] { }`,
      'a.css',
    )
    expect(result.count).toBe(1)
    expect(result.code).toBe(`[data-tree-view-label] { } [data-json-tree-view-item-indicator] { }`)
  })

  it('renames only the attribute each part used, with any operator', () => {
    const result = cssDataAttributes(
      `[data-image-cropper-handle][data-position^="n"] { } [data-image-cropper-handle][data-position] { } [data-image-cropper-handle][data-axis="x"] { }`,
      'a.css',
    )
    expect(result.code).toBe(
      `[data-image-cropper-handle][data-placement^="n"] { } [data-image-cropper-handle][data-placement] { } [data-image-cropper-handle][data-axis="x"] { }`,
    )
  })

  it('leaves tree-view parts v6 removed and reports them', () => {
    const source = `[data-scope="tree-view"][data-part="node"] { }
[data-scope="tree-view"][data-part="node-checkbox-indicator"] { }
[data-part="item-indicator"][data-scope="json-tree-view"] { }`
    const result = cssDataAttributes(source, 'a.css')
    expect(result.count).toBe(1)
    expect(result.code).toBe(`[data-tree-view-node] { }
[data-scope="tree-view"][data-part="node-checkbox-indicator"] { }
[data-part="item-indicator"][data-scope="json-tree-view"] { }`)
    expect(result.skipped).toEqual([
      'line 2: [data-scope="tree-view"][data-part="node-checkbox-indicator"] has no v6 part, use [data-tree-view-node-indicator]',
      'line 3: [data-part="item-indicator"][data-scope="json-tree-view"] has no v6 part, use [data-tree-view-node-indicator]',
    ])
  })

  it('reports removed tree-view parts in line order', () => {
    const result = cssDataAttributes(
      `[data-part="item-indicator"][data-scope="tree-view"] { }
[data-scope="tree-view"][data-part="node-checkbox-indicator"] { }`,
      'a.css',
    )
    expect(result.skipped.map((entry) => entry.split(':')[0])).toEqual(['line 1', 'line 2'])
  })

  it('reports a removed tree-view part even when nothing else changes', () => {
    const result = cssDataAttributes(`[data-scope="tree-view"][data-part="item-indicator"] { }`, 'a.css')
    expect(result.code).toBeNull()
    expect(result.skipped).toHaveLength(1)
  })

  it('leaves v6 tree-view selectors alone', () => {
    expect(cssDataAttributes(`[data-tree-view-node][data-branch] { }`, 'a.css').code).toBeNull()
  })

  it('renames image-cropper and floating-panel handle attributes to data-placement', () => {
    const result = cssDataAttributes(
      `[data-scope="image-cropper"][data-part="handle"][data-position="nw"] { }
[data-floating-panel-resize-trigger][data-axis="se"] { }
[data-image-cropper-grid][data-axis="vertical"] { }`,
      'a.css',
    )
    expect(result.code).toBe(`[data-image-cropper-handle][data-placement="nw"] { }
[data-floating-panel-resize-trigger][data-placement="se"] { }
[data-image-cropper-grid][data-axis="vertical"] { }`)
  })

  it('renames field control and indicator parts', () => {
    const result = cssDataAttributes(
      `[data-scope="field"][data-part="input"], [data-scope="field"][data-part="textarea"], [data-scope="field"][data-part="required-indicator"], [data-scope="field"][data-part="label"] {}`,
      'a.css',
    )
    expect(result.code).toBe(
      '[data-field-control], [data-field-control], [data-field-indicator], [data-field-label] {}',
    )
  })

  it('does nothing to unrelated css', () => {
    expect(cssDataAttributes(`.foo { color: red; }`, 'a.css').code).toBeNull()
  })
})
