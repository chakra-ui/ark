import { describe, expect, it } from 'vitest'
import { renameRun } from '../src/transforms/rename-props/configs.ts'

const carousel = renameRun('carousel-props', 'svelte')
const tabs = renameRun('tabs-virtual-focus', 'svelte')
const popover = renameRun('popover-portalled', 'svelte')
const tagsInput = renameRun('tags-input-editable', 'svelte')
const pinInput = renameRun('pin-input-count', 'svelte')

const wrap = (component: string, markup: string) =>
  `<script>import { ${component} } from '@ark-ui/svelte/${component.toLowerCase()}'</script>\n${markup}`

describe('svelte carousel-props', () => {
  it('renames slideCount, autoplay and padding', () => {
    const result = carousel(
      wrap('Carousel', `<Carousel.Root slideCount={5} autoplay padding="16px">x</Carousel.Root>`),
      'a.svelte',
    )
    expect(result.count).toBe(3)
    expect(result.code).toContain('count={5}')
    expect(result.code).toContain('autoPlay')
    expect(result.code).toContain('itemSpacing="16px"')
    expect(result.code).not.toContain('slideCount')
  })

  it('does not touch padding inside a string value', () => {
    const result = carousel(wrap('Carousel', `<Carousel.Root title="my padding here" />`), 'a.svelte')
    expect(result.code).toBeNull()
  })

  it('does nothing without an ark import', () => {
    expect(carousel(`<Carousel.Root slideCount={5} />`, 'a.svelte').code).toBeNull()
  })
})

describe('svelte tabs-virtual-focus', () => {
  it('inverts a dynamic value', () => {
    expect(tabs(wrap('Tabs', `<Tabs.Root composite={isNested} />`), 'a.svelte').code).toContain(
      'virtualFocus={!(isNested)}',
    )
  })
  it('bare composite becomes virtualFocus={false}', () => {
    expect(tabs(wrap('Tabs', `<Tabs.Root composite />`), 'a.svelte').code).toContain('virtualFocus={false}')
  })
})

describe('svelte popover-portalled', () => {
  it('removes portalled', () => {
    const result = popover(wrap('Popover', `<Popover.Root portalled>x</Popover.Root>`), 'a.svelte')
    expect(result.count).toBe(1)
    expect(result.code).not.toContain('portalled')
  })
})

describe('svelte tags-input-editable', () => {
  it('adds editable when missing', () => {
    const result = tagsInput(wrap('TagsInput', `<TagsInput.Root id="x" />`), 'a.svelte')
    expect(result.code).toContain('editable={true}')
  })
})

describe('svelte pin-input-count', () => {
  it('renames length to count', () => {
    expect(pinInput(wrap('PinInput', `<PinInput.Root length={4} />`), 'a.svelte').code).toContain('count={4}')
  })
  it('flags a missing count', () => {
    const result = pinInput(wrap('PinInput', `<PinInput.Root id="x" />`), 'a.svelte')
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('count is now required')
  })
})
