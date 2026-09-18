import { describe, expect, it } from 'vitest'
import { renameRun } from '../src/transforms/rename-props/configs.ts'

const carousel = renameRun('carousel-props', 'vue')
const tabs = renameRun('tabs-virtual-focus', 'vue')
const popover = renameRun('popover-portalled', 'vue')
const tagsInput = renameRun('tags-input-editable', 'vue')
const pinInput = renameRun('pin-input-count', 'vue')

const wrap = (component: string, markup: string) =>
  `<script setup>import { ${component} } from '@ark-ui/vue/${component.toLowerCase()}'</script>\n<template>\n  ${markup}\n</template>`

describe('vue carousel-props', () => {
  it('renames static and bound props (kebab)', () => {
    const result = carousel(
      wrap('Carousel', `<Carousel.Root slide-count="5" autoplay :padding="p">x</Carousel.Root>`),
      'a.vue',
    )
    expect(result.count).toBe(3)
    expect(result.code).toContain('count="5"')
    expect(result.code).toContain('auto-play')
    expect(result.code).toContain(':item-spacing="p"')
    expect(result.code).not.toContain('slide-count')
  })

  it('does not touch padding inside an attribute value', () => {
    const result = carousel(wrap('Carousel', `<Carousel.Root title="my padding here" />`), 'a.vue')
    expect(result.code).toBeNull()
  })

  it('does nothing without an ark import', () => {
    expect(carousel(`<template><Carousel.Root slide-count="5" /></template>`, 'a.vue').code).toBeNull()
  })
})

describe('vue tabs-virtual-focus', () => {
  it('inverts a bound value', () => {
    expect(tabs(wrap('Tabs', `<Tabs.Root :composite="isNested" />`), 'a.vue').code).toContain(
      ':virtual-focus="!(isNested)"',
    )
  })
  it('bare composite becomes :virtual-focus="false"', () => {
    expect(tabs(wrap('Tabs', `<Tabs.Root composite />`), 'a.vue').code).toContain(':virtual-focus="false"')
  })
})

describe('vue popover-portalled', () => {
  it('removes portalled', () => {
    const result = popover(wrap('Popover', `<Popover.Root portalled>x</Popover.Root>`), 'a.vue')
    expect(result.count).toBe(1)
    expect(result.code).not.toContain('portalled')
  })
})

describe('vue tags-input-editable', () => {
  it('adds editable when missing', () => {
    const result = tagsInput(wrap('TagsInput', `<TagsInput.Root id="x" />`), 'a.vue')
    expect(result.code).toContain('editable')
  })
})

describe('vue pin-input-count', () => {
  it('renames length to count', () => {
    expect(pinInput(wrap('PinInput', `<PinInput.Root :length="4" />`), 'a.vue').code).toContain(':count="4"')
  })
  it('flags a missing count', () => {
    const result = pinInput(wrap('PinInput', `<PinInput.Root id="x" />`), 'a.vue')
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('count is now required')
  })
})
