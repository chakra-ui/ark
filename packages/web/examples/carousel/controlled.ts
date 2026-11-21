import { createElement, ArrowLeft, ArrowRight } from 'lucide'

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

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const imageItem = ({ src, alt }: Image) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><img src="${src}" alt="${alt}" width="500" height="300" /></ark-carousel-item>`

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" page="0">
      <ark-carousel-control class="${styles.Control}">
        <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>
        <ark-carousel-item-group class="${styles.ItemGroup}">${images.map(imageItem).join('')}</ark-carousel-item-group>
        <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>
      </ark-carousel-control>
      <ark-carousel-indicator-group class="${styles.IndicatorGroup}">${images.map(() => indicator()).join('')}</ark-carousel-indicator-group>
    </ark-carousel>`
  const carouselEl = root.querySelector('ark-carousel')!
  carouselEl.addEventListener('pagechange', (event) => {
    carouselEl.setAttribute('page', String(event.detail.page))
  })
  root.replaceChildren(carouselEl)
}
