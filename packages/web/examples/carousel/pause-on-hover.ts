import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `<ark-carousel class="${styles.Root}" auto-play loop><ark-carousel-control class="${styles.Control}" ><span class="${styles.StatusText}">Autoplay is: playing</span></ark-carousel-control><ark-carousel-item-group class="${styles.ItemGroup}"><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/1/500/300" alt="Nature landscape" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/2/500/300" alt="City skyline" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/3/500/300" alt="Mountain view" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/4/500/300" alt="Ocean sunset" width="500" height="300" /></ark-carousel-item><ark-carousel-item class="${styles.Item}"><img src="https://picsum.photos/seed/5/500/300" alt="Forest path" width="500" height="300" /></ark-carousel-item></ark-carousel-item-group><ark-carousel-indicator-group class="${styles.IndicatorGroup}"><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator><ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator></ark-carousel-indicator-group></ark-carousel>`
  const carouselEl = root.querySelector('ark-carousel')!
  const status = carouselEl.querySelector(`.${styles.StatusText}`)!
  carouselEl.addEventListener('autoplaystatuschange', (event) => {
    const { isPlaying } = event.detail
    status.textContent = `Autoplay is: ${isPlaying ? 'playing' : 'paused'}`
  })
  const group = carouselEl.querySelector('ark-carousel-item-group')!
  group.addEventListener('pointerover', () => carouselEl.api?.pause())
  group.addEventListener('pointerleave', () => carouselEl.api?.play())
  root.replaceChildren(carouselEl)
}
