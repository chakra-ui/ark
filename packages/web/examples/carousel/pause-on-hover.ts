import '@ark-ui/web/carousel'

import styles from 'styles/carousel.module.css'

interface Image {
  src: string
  alt: string
}

const images: Image[] = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

const imageItem = ({ src, alt }: Image) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><img src="${src}" alt="${alt}" width="500" height="300" /></ark-carousel-item>`

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" auto-play loop>
      <ark-carousel-control class="${styles.Control}"><span class="${styles.StatusText}">Autoplay is: playing</span></ark-carousel-control>
      <ark-carousel-item-group class="${styles.ItemGroup}">${images.map(imageItem).join('')}</ark-carousel-item-group>
      <ark-carousel-indicator-group class="${styles.IndicatorGroup}">${images.map(() => indicator()).join('')}</ark-carousel-indicator-group>
    </ark-carousel>`
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
