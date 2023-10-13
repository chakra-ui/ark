'use client'
import { Flex } from '@ark-ui/styled-system/jsx'
import React, { Suspense, type ComponentType, type PropsWithChildren } from 'react'
import { match } from 'ts-pattern'

type PlaygroundProps = {
  component: string
}

export const Playground = (props: PlaygroundProps) => {
  const { component } = props
  const Component: any = match(component)
    .with('accordion', () => lazyLoad(() => import('./accordion-demo'), 'AccordionDemo'))
    .with('avatar', () => lazyLoad(() => import('./avatar-demo'), 'AvatarDemo'))
    .with('carousel', () => lazyLoad(() => import('./carousel-demo'), 'CarouselDemo'))
    .with('checkbox', () => lazyLoad(() => import('./checkbox-demo'), 'CheckboxDemo'))
    .with('color-picker', () => lazyLoad(() => import('./color-picker-demo'), 'ColorPickerDemo'))
    .with('combobox', () => lazyLoad(() => import('./combobox-demo'), 'ComboboxDemo'))
    .with('date-picker', () => lazyLoad(() => import('./date-picker-demo'), 'DatePickerDemo'))
    .with('dialog', () => lazyLoad(() => import('./dialog-demo'), 'DialogDemo'))
    .with('editable', () => lazyLoad(() => import('./editable-demo'), 'EditableDemo'))
    .with('hover-card', () => lazyLoad(() => import('./hover-card-demo'), 'HoverCardDemo'))
    .with('menu', () => lazyLoad(() => import('./menu-demo'), 'MenuDemo'))
    .with('number-input', () => lazyLoad(() => import('./number-input-demo'), 'NumberInputDemo'))
    .with('pagination', () => lazyLoad(() => import('./pagination-demo'), 'PaginationDemo'))
    .with('pin-input', () => lazyLoad(() => import('./pin-input-demo'), 'PinInputDemo'))
    .with('popover', () => lazyLoad(() => import('./popover-demo'), 'PopoverDemo'))
    .with('radio-group', () => lazyLoad(() => import('./radio-group-demo'), 'RadioGroupDemo'))
    .with('range-slider', () => lazyLoad(() => import('./range-slider-demo'), 'RangeSliderDemo'))
    .with('rating-group', () => lazyLoad(() => import('./rating-group-demo'), 'RatingGroupDemo'))
    .with('segment-group', () => lazyLoad(() => import('./segment-group-demo'), 'SegmentGroupDemo'))
    .with('select', () => lazyLoad(() => import('./select-demo'), 'SelectDemo'))
    .with('slider', () => lazyLoad(() => import('./slider-demo'), 'SliderDemo'))
    .with('splitter', () => lazyLoad(() => import('./splitter-demo'), 'SplitterDemo'))
    .with('switch', () => lazyLoad(() => import('./switch-demo'), 'SwitchDemo'))
    .with('tabs', () => lazyLoad(() => import('./tabs-demo'), 'TabsDemo'))
    .with('tags-input', () => lazyLoad(() => import('./tags-input-demo'), 'TagsInputDemo'))
    .with('toast', () => lazyLoad(() => import('./toast-demo'), 'ToastDemo'))
    .with('tooltip', () => lazyLoad(() => import('./tooltip-demo'), 'TooltipDemo'))
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
  <Flex justify="center" align="center" flex="1" p={{ base: '4', md: '6' }} bg="bg.default">
    {props.children}
  </Flex>
)

function lazyLoad<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: () => Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise())[memberName] }))
}
