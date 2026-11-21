import { createElement, ChevronDown } from 'lucide'

import '../../src/components/accordion/index.js'

import '../../src/components/slider/index.js'

import styles from 'styles/accordion.module.css'

import slider from 'styles/slider.module.css'

const items = [
  {
    value: 'ark-ui',
    title: 'What is Ark UI?',
    content: 'A headless component library for building accessible web apps.',
  },
  {
    value: 'getting-started',
    title: 'How to get started?',
    content: 'Install the package and import the components you need.',
  },
  {
    value: 'maintainers',
    title: 'Who maintains this project?',
    content: 'Ark UI is maintained by the Chakra UI team.',
  },
]

const accordion = (
  attrs: string,
  options: { indicator?: boolean; lazy?: boolean; disabled?: string; bodyClass?: string; extra?: string } = {},
) => `
  <ark-accordion class="${styles.Root}" ${attrs}>
    ${items
      .map((item) => {
        const body = `<div class="${options.bodyClass ?? styles.ItemBody}">${item.content}${options.extra ?? ''}</div>`
        return `
      <ark-accordion-item class="${styles.Item}" value="${item.value}" ${options.disabled === item.value ? 'disabled' : ''}>
        <ark-accordion-item-header class="${styles.ItemHeader}">
          <ark-accordion-item-trigger>
            <button class="${styles.ItemTrigger}">
              ${item.title}
              ${options.indicator === false ? '' : `<ark-accordion-item-indicator class="${styles.ItemIndicator}">${createElement(ChevronDown, { 'aria-hidden': 'true' }).outerHTML}</ark-accordion-item-indicator>`}
            </button>
          </ark-accordion-item-trigger>
        </ark-accordion-item-header>
        <ark-accordion-item-content class="${styles.ItemContent}">${options.lazy ? `<template>${body}</template>` : body}</ark-accordion-item-content>
      </ark-accordion-item>`
      })
      .join('')}
  </ark-accordion>`

export function mount(root: HTMLElement) {
  root.innerHTML = accordion(`default-value="ark-ui"`, {
    extra: `
      <ark-slider class="${slider.Root}">
        <ark-slider-label class="${slider.Label}">Slider</ark-slider-label>
        <ark-slider-control class="${slider.Control}">
          <ark-slider-track class="${slider.Track}"><ark-slider-range class="${slider.Range}"></ark-slider-range></ark-slider-track>
          <ark-slider-thumb class="${slider.Thumb}" index="0"><ark-slider-hidden-input></ark-slider-hidden-input></ark-slider-thumb>
        </ark-slider-control>
      </ark-slider>`,
  })
}
