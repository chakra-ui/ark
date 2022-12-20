import React, { ComponentType, PropsWithChildren, Suspense } from 'react'
import { Box } from '../../../panda/jsx'

function lazyNamedImport<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise)[memberName] }))
}

const presets = {
  dialog: {
    component: lazyNamedImport(import('../demo/Dialog'), 'DemoDialog'),
  },
  pagination: {
    component: lazyNamedImport(import('../demo/Pagination'), 'DemoPagination'),
  },
  'pin-input': {
    component: lazyNamedImport(import('../demo/PinInput'), 'DemoPinInput'),
  },
  popover: {
    component: lazyNamedImport(import('../demo/Popover'), 'DemoPopover'),
  },
  'range-slider': {
    component: lazyNamedImport(import('../demo/RangeSlider'), 'DemoRangeSlider'),
  },
  slider: {
    component: lazyNamedImport(import('../demo/Slider'), 'DemoSlider'),
  },
  tabs: {
    component: lazyNamedImport(import('../demo/Tabs'), 'DemoTabs'),
  },
  tooltip: {
    component: lazyNamedImport(import('../demo/Tooltip'), 'DemoTooltip'),
  },
} satisfies Record<string, { component: React.ElementType }>

type Presets = typeof presets

type PlaygroundProps = {
  preset: keyof Presets
}

export const Playground = (props: PlaygroundProps) => {
  const { preset } = props
  const { component: Comp } = presets[preset]

  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      minHeight="xs"
      my="12"
      bg="bg.surface"
      borderRadius="lg"
      boxShadow="sm"
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
    display="flex"
    justifyContent="center"
    alignItems="center"
    p="4"
    flex="1"
    bgImage={{
      base: 'radial-gradient(circle,var(--colors-gray-200) 1px, transparent 1px)',
      _dark: 'radial-gradient(circle,var(--colors-gray-800) 1px, transparent 1px)',
    }}
    bgSize="16px 16px"
  >
    {props.children}
  </Box>
)
