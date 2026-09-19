import { describe, expect, it } from 'vitest'
import { renameRun } from '../src/transforms/rename-props/configs.ts'

const carousel = renameRun('carousel-props')
const floatingPanel = renameRun('floating-panel-placement')
const imageCropper = renameRun('image-cropper-placement')
const tabs = renameRun('tabs-virtual-focus')
const popover = renameRun('popover-portalled')
const tagsInput = renameRun('tags-input-editable')
const pinInput = renameRun('pin-input-count')

describe('carousel-props', () => {
  it('renames slideCount, autoplay and padding on Carousel.Root', () => {
    const result = carousel(
      `import { Carousel } from '@ark-ui/react/carousel'
const A = () => <Carousel.Root slideCount={5} autoplay padding="16px" />`,
      'a.tsx',
    )
    expect(result.count).toBe(3)
    expect(result.code).toContain('count={5}')
    expect(result.code).toContain('autoPlay')
    expect(result.code).toContain('itemSpacing="16px"')
    expect(result.code).not.toContain('slideCount')
    expect(result.code).not.toContain('padding')
  })

  it('leaves padding on a different component alone', () => {
    const result = carousel(
      `import { Tabs } from '@ark-ui/react/tabs'
const A = () => <Tabs.Root padding="16px" />`,
      'a.tsx',
    )
    expect(result.code).toBeNull()
  })

  it('does nothing without an ark import', () => {
    expect(carousel(`const A = () => <Carousel.Root slideCount={5} />`, 'a.tsx').code).toBeNull()
  })
})

describe('floating-panel-placement', () => {
  it('renames axis on ResizeTrigger and resizeTriggerAxes on Root', () => {
    const result = floatingPanel(
      `import { FloatingPanel } from '@ark-ui/react/floating-panel'
const A = () => (
  <FloatingPanel.Root resizeTriggerAxes={['n']}>
    <FloatingPanel.ResizeTrigger axis="n" />
  </FloatingPanel.Root>
)`,
      'a.tsx',
    )
    expect(result.count).toBe(2)
    expect(result.code).toContain('resizeTriggerPlacements={')
    expect(result.code).toContain('<FloatingPanel.ResizeTrigger placement="n" />')
  })
})

describe('image-cropper-placement', () => {
  it('renames handles on Root and position on Handle', () => {
    const result = imageCropper(
      `import { ImageCropper } from '@ark-ui/react/image-cropper'
const A = () => (
  <ImageCropper.Root handles={['nw']}>
    <ImageCropper.Handle position="nw" />
  </ImageCropper.Root>
)`,
      'a.tsx',
    )
    expect(result.count).toBe(2)
    expect(result.code).toContain('placements={')
    expect(result.code).toContain('<ImageCropper.Handle placement="nw" />')
  })
})

describe('tabs-virtual-focus', () => {
  const wrap = (attr: string) => `import { Tabs } from '@ark-ui/react/tabs'\nconst A = () => <Tabs.Root ${attr} />`

  it('bare composite becomes virtualFocus={false}', () => {
    expect(tabs(wrap('composite'), 'a.tsx').code).toContain('virtualFocus={false}')
  })
  it('composite={true} becomes virtualFocus={false}', () => {
    expect(tabs(wrap('composite={true}'), 'a.tsx').code).toContain('virtualFocus={false}')
  })
  it('composite={false} becomes virtualFocus={true}', () => {
    expect(tabs(wrap('composite={false}'), 'a.tsx').code).toContain('virtualFocus={true}')
  })
  it('dynamic composite is negated', () => {
    expect(tabs(wrap('composite={isNested}'), 'a.tsx').code).toContain('virtualFocus={!(isNested)}')
  })
})

describe('popover-portalled', () => {
  it('removes the portalled prop', () => {
    const result = popover(
      `import { Popover } from '@ark-ui/react/popover'
const A = () => <Popover.Root portalled>x</Popover.Root>`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).not.toContain('portalled')
  })
})

describe('tags-input-editable', () => {
  it('adds editable={true} when missing', () => {
    const result = tagsInput(
      `import { TagsInput } from '@ark-ui/react/tags-input'
const A = () => <TagsInput.Root id="x" />`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('editable={true}')
  })
  it('leaves an explicit editable alone', () => {
    const result = tagsInput(
      `import { TagsInput } from '@ark-ui/react/tags-input'
const A = () => <TagsInput.Root editable={false} />`,
      'a.tsx',
    )
    expect(result.code).toBeNull()
  })
})

describe('pin-input-count', () => {
  it('renames length to count', () => {
    const result = pinInput(
      `import { PinInput } from '@ark-ui/react/pin-input'
const A = () => <PinInput.Root length={4} />`,
      'a.tsx',
    )
    expect(result.count).toBe(1)
    expect(result.code).toContain('count={4}')
  })
  it('flags when count is missing and there is no length', () => {
    const result = pinInput(
      `import { PinInput } from '@ark-ui/react/pin-input'
const A = () => <PinInput.Root id="x" />`,
      'a.tsx',
    )
    expect(result.code).toBeNull()
    expect(result.skipped[0]).toContain('count is now required')
  })
  it('leaves an explicit count alone', () => {
    expect(
      pinInput(
        `import { PinInput } from '@ark-ui/react/pin-input'
const A = () => <PinInput.Root count={4} />`,
        'a.tsx',
      ).code,
    ).toBeNull()
  })
})
