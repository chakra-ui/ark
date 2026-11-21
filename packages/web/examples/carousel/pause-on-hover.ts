import '../../src/components/carousel/index.js'

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

const attr = (name: string, on?: boolean) => (on ? name : '')

const carousel = ({ autoPlay, loop }: { autoPlay?: boolean; loop?: boolean }, children: string[]) => /* html */ `
  <ark-carousel class="${styles.Root}" ${attr('auto-play', autoPlay)} ${attr('loop', loop)}>${children.join('')}</ark-carousel>`

const control = (children: string[]) => /* html */ `
  <ark-carousel-control class="${styles.Control}">${children.join('')}</ark-carousel-control>`

const statusText = (text: string) => /* html */ `<span class="${styles.StatusText}">${text}</span>`

const itemGroup = (children: string[]) => /* html */ `
  <ark-carousel-item-group class="${styles.ItemGroup}">${children.join('')}</ark-carousel-item-group>`

const imageItem = ({ src, alt }: Image) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><img src="${src}" alt="${alt}" width="500" height="300" /></ark-carousel-item>`

const indicatorGroup = (children: string[]) => /* html */ `
  <ark-carousel-indicator-group class="${styles.IndicatorGroup}">${children.join('')}</ark-carousel-indicator-group>`

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

export function mount(root: HTMLElement) {
  root.innerHTML = carousel({ autoPlay: true, loop: true }, [
    control([statusText('Autoplay is: playing')]),
    itemGroup(images.map(imageItem)),
    indicatorGroup(images.map(() => indicator())),
  ])
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
