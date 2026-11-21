import { createElement, ArrowLeft, ArrowRight, Plus } from 'lucide'

import button from 'styles/button.module.css'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const item = (content: string, attrs = `class="${styles.Item}"`) =>
  /* html */ `<ark-carousel-item ${attrs}>${content}</ark-carousel-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-carousel class="${styles.Root}" page="0"><ark-carousel-item-group class="${styles.ItemGroup}"><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 1</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 2</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 3</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 4</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 5</div></ark-carousel-item></ark-carousel-item-group><ark-carousel-control class="${styles.Control}" ><ark-carousel-prev-trigger><button class="${styles.Trigger}">${createElement(ArrowLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-carousel-prev-trigger><ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></template></ark-carousel-indicator-group><ark-carousel-next-trigger><button class="${styles.Trigger}">${createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-carousel-next-trigger></ark-carousel-control></ark-carousel>
    <button class="${button.Root}" data-add>${createElement(Plus, { 'aria-hidden': 'true' }).outerHTML}Add Slide</button>`
  const carouselEl = root.querySelector('ark-carousel')!
  carouselEl.addEventListener('pagechange', (event) => {
    carouselEl.setAttribute('page', String(event.detail.page))
  })
  const group = carouselEl.querySelector('ark-carousel-item-group')!
  root.querySelector('[data-add]')!.addEventListener('click', () => {
    const count = group.children.length
    group.insertAdjacentHTML('beforeend', item(/* html */ `<div class="${styles.Slide}">Slide ${count + 1}</div>`))
  })
}
