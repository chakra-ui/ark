import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import button from 'styles/button.module.css'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-carousel class="${styles.Root}" count="5"><button class="${button.Root}" data-scroll>Go to slide 4</button><ark-carousel-item-group class="${styles.ItemGroup}"><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 1</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 2</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 3</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 4</div></ark-carousel-item><ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">Slide 5</div></ark-carousel-item></ark-carousel-item-group><ark-carousel-control class="${styles.Control}" ><ark-carousel-prev-trigger><button class="${styles.Trigger}">${createElement(ArrowLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-carousel-prev-trigger><ark-carousel-next-trigger><button class="${styles.Trigger}">${createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-carousel-next-trigger></ark-carousel-control><ark-carousel-indicator-group class="${styles.IndicatorGroup}"><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></ark-carousel-indicator-group></ark-carousel>`
  const carouselEl = root.querySelector('ark-carousel')!
  root.querySelector('[data-scroll]')!.addEventListener('click', () => carouselEl.api?.scrollToIndex(3))
  root.replaceChildren(carouselEl)
}
