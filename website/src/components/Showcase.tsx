'use client'
import { Box } from '@/panda/jsx'
import React, { ComponentType, PropsWithChildren, Suspense } from 'react'

function lazyNamedImport<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: () => Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise())[memberName] }))
}

const presets = {
  accordion: {
    component: lazyNamedImport(() => import('./demo/Accordion'), 'DemoAccordion'),
  },
  checkbox: {
    component: lazyNamedImport(() => import('./demo/Checkbox'), 'DemoCheckbox'),
  },
  dialog: {
    component: lazyNamedImport(() => import('./demo/Dialog'), 'DemoDialog'),
  },
  'hover-card': {
    component: lazyNamedImport(() => import('./demo/HoverCard'), 'DemoHoverCard'),
  },
  'number-input': {
    component: lazyNamedImport(() => import('./demo/NumberInput'), 'DemoNumberInput'),
  },
  pagination: {
    component: lazyNamedImport(() => import('./demo/Pagination'), 'DemoPagination'),
  },
  'pin-input': {
    component: lazyNamedImport(() => import('./demo/PinInput'), 'DemoPinInput'),
  },
  pressable: {
    component: lazyNamedImport(() => import('./demo/Pressable'), 'DemoPressable'),
  },
  popover: {
    component: lazyNamedImport(() => import('./demo/Popover'), 'DemoPopover'),
  },
  'radio-group': {
    component: lazyNamedImport(() => import('./demo/RadioGroup'), 'DemoRadioGroup'),
  },
  'range-slider': {
    component: lazyNamedImport(() => import('./demo/RangeSlider'), 'DemoRangeSlider'),
  },
  'rating-group': {
    component: lazyNamedImport(() => import('./demo/RatingGroup'), 'DemoRatingGroup'),
  },
  slider: {
    component: lazyNamedImport(() => import('./demo/Slider'), 'DemoSlider'),
  },
  tabs: {
    component: lazyNamedImport(() => import('./demo/Tabs'), 'DemoTabs'),
  },
  'tags-input': {
    component: lazyNamedImport(() => import('./demo/TagsInput'), 'DemoTagsInput'),
  },
  toast: {
    component: lazyNamedImport(() => import('./demo/Toast'), 'DemoToast'),
  },
  tooltip: {
    component: lazyNamedImport(() => import('./demo/Tooltip'), 'DemoTooltip'),
  },
} satisfies Record<string, { component: React.ElementType }>

type Presets = typeof presets

type PlaygroundProps = {
  preset: keyof Presets
}

export const Showcase = (props: PlaygroundProps) => {
  const { preset } = props
  const { component: Comp } = presets[preset] ?? { component: () => <Box>n/A</Box> }

  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      minHeight="xs"
      bg="bg.surface"
      borderRadius="lg"
      boxShadow="sm"
      width="full"
    >
      <Canvas>
        <Suspense fallback={null}>
          <Comp />
        </Suspense>
      </Canvas>
    </Box>
  )
}

const Canvas = (props: PropsWithChildren) => (
  <Box
    alignItems="center"
    bgImage={{
      base: 'radial-gradient(circle,var(--colors-gray-200) 1px, transparent 1px)',
      _dark: 'radial-gradient(circle,var(--colors-gray-800) 1px, transparent 1px)',
    }}
    bgSize="16px 16px"
    display="flex"
    flex="1"
    justifyContent="center"
    p="6"
  >
    {props.children}
  </Box>
)
