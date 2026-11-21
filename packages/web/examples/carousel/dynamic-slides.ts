import { createElement, ArrowLeft, ArrowRight, Plus } from 'lucide'

import button from 'styles/button.module.css'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 5 }, (_, index) => `Slide ${index + 1}`)

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const slideItem = ({ label }: { label: string }) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">${label}</div></ark-carousel-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" page="0">
      <ark-carousel-item-group class="${styles.ItemGroup}">${slides.map((label) => slideItem({ label })).join('')}</ark-carousel-item-group>
      <ark-carousel-control class="${styles.Control}">
        <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>
        <ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></template></ark-carousel-indicator-group>
        <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>
      </ark-carousel-control>
    </ark-carousel>
    <button class="${button.Root}" data-add>${icon(Plus)}Add Slide</button>`
  const carouselEl = root.querySelector('ark-carousel')!
  carouselEl.addEventListener('pagechange', (event) => {
    carouselEl.setAttribute('page', String(event.detail.page))
  })
  const group = carouselEl.querySelector('ark-carousel-item-group')!
  root.querySelector('[data-add]')!.addEventListener('click', () => {
    const count = group.children.length
    group.insertAdjacentHTML('beforeend', slideItem({ label: `Slide ${count + 1}` }))
  })
}
