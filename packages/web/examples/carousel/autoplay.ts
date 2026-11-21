import { createElement, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide'

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

const attr = (name: string, on?: boolean) => (on ? name : '')

const carousel = ({ autoPlay, loop }: { autoPlay?: boolean; loop?: boolean }, children: string[]) => /* html */ `
  <ark-carousel class="${styles.Root}" ${attr('auto-play', autoPlay)} ${attr('loop', loop)}>${children.join('')}</ark-carousel>`

const control = ({ justify }: { justify?: string }, children: string[]) => /* html */ `
  <ark-carousel-control class="${styles.Control}" ${justify ? `data-justify="${justify}"` : ''}>${children.join('')}</ark-carousel-control>`

const prevTrigger = ({ icon: node = ArrowLeft }: { icon?: typeof ArrowLeft } = {}) => /* html */ `
  <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(node)}</button></ark-carousel-prev-trigger>`

const nextTrigger = ({ icon: node = ArrowRight }: { icon?: typeof ArrowRight } = {}) => /* html */ `
  <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(node)}</button></ark-carousel-next-trigger>`

const autoplayTrigger = () => /* html */ `
  <ark-carousel-autoplay-trigger>
    <button class="${styles.AutoplayTrigger}">
      <ark-carousel-autoplay-indicator>${icon(Play).replace('<svg', '<svg fallback')}${icon(Pause)}</ark-carousel-autoplay-indicator>
    </button>
  </ark-carousel-autoplay-trigger>`

const itemGroup = (children: string[]) => /* html */ `
  <ark-carousel-item-group class="${styles.ItemGroup}">${children.join('')}</ark-carousel-item-group>`

const imageItem = ({ src, alt }: Image) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><img src="${src}" alt="${alt}" width="500" height="300" /></ark-carousel-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = carousel({ autoPlay: true, loop: true }, [
    itemGroup(images.map(imageItem)),
    control({ justify: 'center' }, [
      prevTrigger({ icon: ChevronLeft }),
      autoplayTrigger(),
      nextTrigger({ icon: ChevronRight }),
    ]),
  ])
}
