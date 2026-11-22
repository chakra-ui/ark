import { createElement, ChevronLeft, ChevronRight, Pause, Play } from 'lucide'

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

const icon = (node: typeof ChevronLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const imageItem = ({ src, alt }: Image) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><img src="${src}" alt="${alt}" width="500" height="300" /></ark-carousel-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-carousel class="${styles.Root}" auto-play loop>
      <ark-carousel-item-group class="${styles.ItemGroup}">${images.map(imageItem).join('')}</ark-carousel-item-group>
      <ark-carousel-control class="${styles.Control}" data-justify="center">
        <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ChevronLeft)}</button></ark-carousel-prev-trigger>
        <ark-carousel-autoplay-trigger>
          <button class="${styles.AutoplayTrigger}">
            <ark-carousel-autoplay-indicator>${icon(Play).replace('<svg', '<svg fallback')}${icon(Pause)}</ark-carousel-autoplay-indicator>
          </button>
        </ark-carousel-autoplay-trigger>
        <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ChevronRight)}</button></ark-carousel-next-trigger>
      </ark-carousel-control>
    </ark-carousel>`
}
