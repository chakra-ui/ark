import { makeRenameTransform, type PropRule } from './engine.ts'

export interface RenameTransformDef {
  slug: string
  description: string
  rules: PropRule[]
}

export const renameTransforms: RenameTransformDef[] = [
  {
    slug: 'carousel-props',
    description: 'Carousel.Root: slideCount → count, autoplay → autoPlay, padding → itemSpacing',
    rules: [
      {
        component: 'Carousel',
        part: 'Root',
        renames: [
          { from: 'slideCount', to: 'count' },
          { from: 'autoplay', to: 'autoPlay' },
          { from: 'padding', to: 'itemSpacing' },
        ],
      },
    ],
  },
  {
    slug: 'floating-panel-placement',
    description: 'FloatingPanel: resizeTriggerAxes → resizeTriggerPlacements, ResizeTrigger axis → placement',
    rules: [
      {
        component: 'FloatingPanel',
        part: 'Root',
        renames: [{ from: 'resizeTriggerAxes', to: 'resizeTriggerPlacements' }],
      },
      { component: 'FloatingPanel', part: 'ResizeTrigger', renames: [{ from: 'axis', to: 'placement' }] },
    ],
  },
  {
    slug: 'image-cropper-placement',
    description: 'ImageCropper: Root handles → placements, Handle position → placement',
    rules: [
      { component: 'ImageCropper', part: 'Root', renames: [{ from: 'handles', to: 'placements' }] },
      { component: 'ImageCropper', part: 'Handle', renames: [{ from: 'position', to: 'placement' }] },
    ],
  },
  {
    slug: 'tabs-virtual-focus',
    description: 'Tabs.Root: composite → virtualFocus (value inverted)',
    rules: [{ component: 'Tabs', part: 'Root', flips: [{ from: 'composite', to: 'virtualFocus' }] }],
  },
  {
    slug: 'popover-portalled',
    description: 'Popover.Root: remove the portalled prop (portalling is now auto-detected)',
    rules: [{ component: 'Popover', part: 'Root', removes: ['portalled'] }],
  },
  {
    slug: 'tags-input-editable',
    description: 'TagsInput.Root: add editable to preserve the old default (now false)',
    rules: [{ component: 'TagsInput', part: 'Root', ensure: [{ name: 'editable', value: '{true}' }] }],
  },
  {
    slug: 'pin-input-count',
    description: 'PinInput.Root: length → count (count is now required)',
    rules: [
      {
        component: 'PinInput',
        part: 'Root',
        require: [{ name: 'count', from: 'length', message: 'count is now required — add it to PinInput.Root' }],
      },
    ],
  },
]

export function renameRun(slug: string) {
  const def = renameTransforms.find((t) => t.slug === slug)
  if (!def) throw new Error(`unknown rename transform: ${slug}`)
  return makeRenameTransform({ rules: def.rules })
}
