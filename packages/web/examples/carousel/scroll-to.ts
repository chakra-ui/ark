import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import button from 'styles/button.module.css'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 5 }, (_, index) => `Slide ${index + 1}`)

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const slideItem = ({ label }: { label: string }) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">${label}</div></ark-carousel-item>`

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" count="${slides.length}">
      <button class="${button.Root}" data-scroll>Go to slide 4</button>
      <ark-carousel-item-group class="${styles.ItemGroup}">${slides.map((label) => slideItem({ label })).join('')}</ark-carousel-item-group>
      <ark-carousel-control class="${styles.Control}">
        <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>
        <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>
      </ark-carousel-control>
      <ark-carousel-indicator-group class="${styles.IndicatorGroup}">${slides.map(() => indicator()).join('')}</ark-carousel-indicator-group>
    </ark-carousel>`
  const carouselEl = root.querySelector('ark-carousel')!
  root.querySelector('[data-scroll]')!.addEventListener('click', () => carouselEl.api?.scrollToIndex(3))
  root.replaceChildren(carouselEl)
}
