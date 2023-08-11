'use client'
import React, { Suspense, type ComponentType, type PropsWithChildren } from 'react'
import { Flex } from 'styled-system/jsx'
import { match } from 'ts-pattern'

type PlaygroundProps = {
  component: string
}

export const Playground = (props: PlaygroundProps) => {
  const { component } = props
  const Component = match(component)
    .with('accordion', () => lazyLoad(() => import('./accordion'), 'AccordionDemo'))
    // .with('avatar', () => lazyLoad(() => import('./Avatar'), 'DemoAvatar'))
    // .with('carousel', () => lazyLoad(() => import('./Carousel'), 'DemoCarousel'))
    // .with('checkbox', () => lazyLoad(() => import('./Checkbox'), 'DemoCheckbox'))
    // .with('color-picker', () => lazyLoad(() => import('./ColorPicker'), 'DemoColorPicker'))
    // .with('date-picker', () => lazyLoad(() => import('./DatePicker'), 'DemoDatePicker'))
    // .with('dialog', () => lazyLoad(() => import('./Dialog'), 'DemoDialog'))
    // .with('hover-card', () => lazyLoad(() => import('./HoverCard'), 'DemoHoverCard'))
    // .with('menu', () => lazyLoad(() => import('./Menu'), 'DemoMenu'))
    // .with('number-input', () => lazyLoad(() => import('./NumberInput'), 'DemoNumberInput'))
    // .with('pagination', () => lazyLoad(() => import('./Pagination'), 'DemoPagination'))
    // .with('pin-input', () => lazyLoad(() => import('./PinInput'), 'DemoPinInput'))
    // .with('pressable', () => lazyLoad(() => import('./Pressable'), 'DemoPressable'))
    // .with('popover', () => lazyLoad(() => import('./Popover'), 'DemoPopover'))
    // .with('presence', () => lazyLoad(() => import('./Presence'), 'DemoPresence'))
    // .with('radio-group', () => lazyLoad(() => import('./RadioGroup'), 'DemoRadioGroup'))
    // .with('range-slider', () => lazyLoad(() => import('./RangeSlider'), 'DemoRangeSlider'))
    // .with('rating-group', () => lazyLoad(() => import('./RatingGroup'), 'DemoRatingGroup'))
    // .with('segment-group', () => lazyLoad(() => import('./SegmentGroup'), 'DemoSegmentGroup'))
    // .with('select', () => lazyLoad(() => import('./Select'), 'DemoSelect'))
    // .with('slider', () => lazyLoad(() => import('./Slider'), 'DemoSlider'))
    // .with('splitter', () => lazyLoad(() => import('./Splitter'), 'DemoSplitter'))
    // .with('switch', () => lazyLoad(() => import('./Switch'), 'DemoSwitch'))
    // .with('tabs', () => lazyLoad(() => import('./Tabs'), 'DemoTabs'))
    // .with('tags-input', () => lazyLoad(() => import('./TagsInput'), 'DemoTagsInput'))
    // .with('toast', () => lazyLoad(() => import('./Toast'), 'DemoToast'))
    // .with('tooltip', () => lazyLoad(() => import('./Tooltip'), 'DemoTooltip'))
    .otherwise(() => null)

  if (!Component) return null

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg="bg.default"
      minH="md"
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
  <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }} bg="bg.surface">
    {props.children}
  </Flex>
)

function lazyLoad<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: () => Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise())[memberName] }))
}
