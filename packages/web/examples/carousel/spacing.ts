import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 }, (_, index) => String(index + 1))

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const slideItem = ({ label }: { label: string }) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">${label}</div></ark-carousel-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" slides-per-page="1.5" spacing="48px">
      <span class="${styles.StatusText}">spacing='48px'</span>
      <ark-carousel-item-group class="${styles.ItemGroup}">${slides.map((label) => slideItem({ label })).join('')}</ark-carousel-item-group>
      <ark-carousel-control class="${styles.Control}">
        <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>
        <ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></template></ark-carousel-indicator-group>
        <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>
      </ark-carousel-control>
    </ark-carousel>`
}
