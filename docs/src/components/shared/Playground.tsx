import React, { ComponentType, Suspense } from 'react'
import { panda } from '../../../panda/jsx'

function lazyNamedImport<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise)[memberName] }))
}

const presets = {
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
    <panda.div
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      borderWidth="1px"
      minHeight="24rem"
      my="16"
    >
      <Canvas>
        <Suspense fallback={null}>
          <Comp />
        </Suspense>
      </Canvas>
    </panda.div>
  )
}

const Canvas = (props: { children?: React.ReactElement }) => (
  <panda.div
    display="flex"
    alignItems="center"
    justifyContent="center"
    py="20"
    bg="bg.dark"
    flexGrow="3"
    flexShrink="0"
    flexBasis="60"
    p="4"
    bgImage={{
      base: 'radial-gradient(circle,var(--colors-gray-200) 1px, transparent 1px)',
      _dark: 'radial-gradient(circle,var(--colors-gray-800) 1px, transparent 1px)',
    }}
    bgSize="16px 16px"
    {...props}
  />
)
