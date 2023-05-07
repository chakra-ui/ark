'use client'
import { Flex } from '@/panda/jsx'
import React, { Suspense, type ComponentType, type PropsWithChildren } from 'react'
import { match } from 'ts-pattern'

type PlaygroundProps = {
  component: string
}

export const Playground = (props: PlaygroundProps) => {
  const { component } = props
  const Component = match(component)
    .with('accordion', () => lazyLoad(() => import('./demo/Accordion'), 'DemoAccordion'))
    .with('checkbox', () => lazyLoad(() => import('./demo/Checkbox'), 'DemoCheckbox'))
    .with('color-picker', () => lazyLoad(() => import('./demo/ColorPicker'), 'DemoColorPicker'))
    .with('dialog', () => lazyLoad(() => import('./demo/Dialog'), 'DemoDialog'))
    .with('hover-card', () => lazyLoad(() => import('./demo/HoverCard'), 'DemoHoverCard'))
    .with('menu', () => lazyLoad(() => import('./demo/Menu'), 'DemoMenu'))
    .with('number-input', () => lazyLoad(() => import('./demo/NumberInput'), 'DemoNumberInput'))
    .with('pagination', () => lazyLoad(() => import('./demo/Pagination'), 'DemoPagination'))
    .with('pin-input', () => lazyLoad(() => import('./demo/PinInput'), 'DemoPinInput'))
    .with('pressable', () => lazyLoad(() => import('./demo/Pressable'), 'DemoPressable'))
    .with('popover', () => lazyLoad(() => import('./demo/Popover'), 'DemoPopover'))
    .with('radio-group', () => lazyLoad(() => import('./demo/RadioGroup'), 'DemoRadioGroup'))
    .with('range-slider', () => lazyLoad(() => import('./demo/RangeSlider'), 'DemoRangeSlider'))
    .with('rating-group', () => lazyLoad(() => import('./demo/RatingGroup'), 'DemoRatingGroup'))
    .with('select', () => lazyLoad(() => import('./demo/Select'), 'DemoSelect'))
    .with('slider', () => lazyLoad(() => import('./demo/Slider'), 'DemoSlider'))
    .with('splitter', () => lazyLoad(() => import('./demo/Splitter'), 'DemoSplitter'))
    .with('tabs', () => lazyLoad(() => import('./demo/Tabs'), 'DemoTabs'))
    .with('tags-input', () => lazyLoad(() => import('./demo/TagsInput'), 'DemoTagsInput'))
    .with('toast', () => lazyLoad(() => import('./demo/Toast'), 'DemoToast'))
    .with('tooltip', () => lazyLoad(() => import('./demo/Tooltip'), 'DemoTooltip'))
    .otherwise(() => null)

  if (!Component) return null

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg="bg.canvas"
      minH="40"
      borderRadius="lg"
      borderWidth="1px"
      width="full"
      overflow="hidden"
    >
      <Canvas>
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      </Canvas>
    </Flex>
  )
}

const Canvas = (props: PropsWithChildren) => (
  <Flex justify="center" align="center" flex="1" p="4" bg="bg.surface">
    {props.children}
  </Flex>
)

function lazyLoad<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: () => Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise())[memberName] }))
}
