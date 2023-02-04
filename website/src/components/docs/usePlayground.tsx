import type { ComponentType } from 'react'
import React from 'react'

export const usePlayground = async (component: string) => {
  // const [Component, controls] = match(component)
  //   .with('accordion', () => [
  //     lazyLoad(() => import('./demo/Accordion'), 'DemoAccordion'),
  //     lazyLoad(() => import('./demo/Accordion'), 'controls'),
  //   ])
  //   .with('checkbox', () => [lazyLoad(() => import('./demo/Checkbox'), 'DemoCheckbox')])
  //   .with('dialog', () => [lazyLoad(() => import('./demo/Dialog'), 'DemoDialog')])
  //   .with('hover-card', () => [lazyLoad(() => import('./demo/HoverCard'), 'DemoHoverCard')])
  //   .with('menu', () => [lazyLoad(() => import('./demo/Menu'), 'DemoMenu')])
  //   .with('number-input', () => [lazyLoad(() => import('./demo/NumberInput'), 'DemoNumberInput')])
  //   .with('pagination', () => [lazyLoad(() => import('./demo/Pagination'), 'DemoPagination')])
  //   .with('pin-input', () => [lazyLoad(() => import('./demo/PinInput'), 'DemoPinInput')])
  //   .with('pressable', () => [lazyLoad(() => import('./demo/Pressable'), 'DemoPressable')])
  //   .with('popover', () => [lazyLoad(() => import('./demo/Popover'), 'DemoPopover')])
  //   .with('radio-group', () => [lazyLoad(() => import('./demo/RadioGroup'), 'DemoRadioGroup')])
  //   .with('range-slider', () => [lazyLoad(() => import('./demo/RangeSlider'), 'DemoRangeSlider')])
  //   .with('rating-group', () => [lazyLoad(() => import('./demo/RatingGroup'), 'DemoRatingGroup')])
  //   .with('select', () => [lazyLoad(() => import('./demo/Select'), 'DemoSelect')])
  //   .with('slider', () => [lazyLoad(() => import('./demo/Slider'), 'DemoSlider')])
  //   .with('tabs', () => [lazyLoad(() => import('./demo/Tabs'), 'DemoTabs')])
  //   .with('tags-input', () => [lazyLoad(() => import('./demo/TagsInput'), 'DemoTagsInput')])
  //   .with('toast', () => [lazyLoad(() => import('./demo/Toast'), 'DemoToast')])
  //   .with('tooltip', () => [lazyLoad(() => import('./demo/Tooltip'), 'DemoTooltip')])
  //   .otherwise(() => [])

  // if (!Component) return null

  // return { Component, controls }

  const Component = lazyLoad(() => import('./demo/Accordion'), 'DemoAccordion')
  const controls = await import('./demo/Accordion').then((module) => module.controls)
  return [Component, controls]
}

function lazyLoad<
  Module extends { [Key in MemberName]: ComponentType<any> },
  MemberName extends keyof Module,
>(modulePromise: () => Promise<Module>, memberName: MemberName) {
  return React.lazy(async () => ({ default: (await modulePromise())[memberName] }))
}
