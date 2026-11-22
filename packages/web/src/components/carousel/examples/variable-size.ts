import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '@ark-ui/web/carousel'

import styles from 'styles/carousel.module.css'

interface Slide {
  id: string
  width: string
  label: string
}

const slides: Slide[] = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const sizedItem = ({ width, label }: Slide) => /* html */ `
  <ark-carousel-item snap-align="center">
    <div class="${styles.Slide}" style="width: ${width}; height: 6rem">${label}</div>
  </ark-carousel-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" auto-size spacing="8px">
      <ark-carousel-control class="${styles.Control}">
        <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>
        <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>
      </ark-carousel-control>
      <ark-carousel-item-group class="${styles.ItemGroup}">${slides.map(sizedItem).join('')}</ark-carousel-item-group>
      <ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></template></ark-carousel-indicator-group>
    </ark-carousel>`
}
