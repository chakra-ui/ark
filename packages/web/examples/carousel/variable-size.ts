import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const carouselMarkup = (attrs: string, children: string) =>
  `<ark-carousel class="${styles.Root}" ${attrs}>${children}</ark-carousel>`

const control = (children: string, attrs = '') =>
  `<ark-carousel-control class="${styles.Control}" ${attrs}>${children}</ark-carousel-control>`

const prev = (icon = createElement(ArrowLeft, { 'aria-hidden': 'true' }).outerHTML) =>
  `<ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-prev-trigger>`

const next = (icon = createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML) =>
  `<ark-carousel-next-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-next-trigger>`

const itemGroup = (items: string) =>
  `<ark-carousel-item-group class="${styles.ItemGroup}">${items}</ark-carousel-item-group>`

const items = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]

const item = (content: string, attrs = `class="${styles.Item}"`) =>
  `<ark-carousel-item ${attrs}>${content}</ark-carousel-item>`

const indicator = (content = '', className = styles.Indicator) =>
  `<ark-carousel-indicator><button class="${className}">${content}</button></ark-carousel-indicator>`

const pageIndicators = () =>
  `<ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template>${indicator()}</template></ark-carousel-indicator-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = carouselMarkup(
    'auto-size spacing="8px"',
    `${control(`${prev()}${next()}`)}${itemGroup(
      items
        .map((it) =>
          item(
            `<div class="${styles.Slide}" style="width: ${it.width}; height: 6rem">${it.label}</div>`,
            'snap-align="center"',
          ),
        )
        .join(''),
    )}${pageIndicators()}`,
  )
}
