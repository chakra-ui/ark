import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-carousel class="${styles.Root}" page="0"><ark-carousel-control class="${styles.Control}" ><ark-carousel-prev-trigger><button class="${styles.Trigger}">${createElement(ArrowLeft, { 'aria-hidden': 'true' }).outerHTML}</button></ark-carousel-prev-trigger><ark-carousel-item-group class="${styles.ItemGroup}"><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/1/500/300" alt="Nature landscape" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/2/500/300" alt="City skyline" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/3/500/300" alt="Mountain view" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/4/500/300" alt="Ocean sunset" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/5/500/300" alt="Forest path" width="500" height="300" /></ark-carousel-item></ark-carousel-item-group><ark-carousel-next-trigger><button class="${styles.Trigger}">${createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML}</button></ark-carousel-next-trigger></ark-carousel-control><ark-carousel-indicator-group class="${styles.IndicatorGroup}"><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></ark-carousel-indicator-group></ark-carousel>`
  const carouselEl = root.querySelector('ark-carousel')!
  carouselEl.addEventListener('pagechange', (event) => {
    carouselEl.setAttribute('page', String(event.detail.page))
  })
  root.replaceChildren(carouselEl)
}
