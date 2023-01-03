'use client'
import { Box } from '@/panda/jsx'
import React, { ComponentType, PropsWithChildren, Suspense } from 'react'
import { match } from 'ts-pattern'

type PlaygroundProps = {
  component: string
}

export const Playground = (props: PlaygroundProps) => {
  const { component } = props
  const Component = match(component)
    .with('accordion', () => lazyLoad(() => import('./demo/Accordion'), 'DemoAccordion'))
    .with('checkbox', () => lazyLoad(() => import('./demo/Checkbox'), 'DemoCheckbox'))
    .with('dialog', () => lazyLoad(() => import('./demo/Dialog'), 'DemoDialog'))
    .with('hover-card', () => lazyLoad(() => import('./demo/HoverCard'), 'DemoHoverCard'))
    .with('number-input', () => lazyLoad(() => import('./demo/NumberInput'), 'DemoNumberInput'))
    .with('pagination', () => lazyLoad(() => import('./demo/Pagination'), 'DemoPagination'))
    .with('pin-input', () => lazyLoad(() => import('./demo/PinInput'), 'DemoPinInput'))
    .with('pressable', () => lazyLoad(() => import('./demo/Pressable'), 'DemoPressable'))
    .with('popover', () => lazyLoad(() => import('./demo/Popover'), 'DemoPopover'))
    .with('radio-group', () => lazyLoad(() => import('./demo/RadioGroup'), 'DemoRadioGroup'))
    .with('range-slider', () => lazyLoad(() => import('./demo/RangeSlider'), 'DemoRangeSlider'))
    .with('rating-group', () => lazyLoad(() => import('./demo/RatingGroup'), 'DemoRatingGroup'))
    .with('slider', () => lazyLoad(() => import('./demo/Slider'), 'DemoSlider'))
    .with('tabs', () => lazyLoad(() => import('./demo/Tabs'), 'DemoTabs'))
    .with('tags-input', () => lazyLoad(() => import('./demo/TagsInput'), 'DemoTagsInput'))
    .with('toast', () => lazyLoad(() => import('./demo/Toast'), 'DemoToast'))
    .with('tooltip', () => lazyLoad(() => import('./demo/Tooltip'), 'DemoTooltip'))
    .otherwise(() => null)

  if (!Component) return null

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
          <Component />
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

function lazyLoad<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: () => Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise())[memberName] }))
}
