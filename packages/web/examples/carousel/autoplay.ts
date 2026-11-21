import { createElement, ArrowLeft, ChevronLeft, Play, Pause, ArrowRight, ChevronRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const carouselMarkup = (attrs: string, children: string) =>
  /* html */ `<ark-carousel class="${styles.Root}" ${attrs}>${children}</ark-carousel>`

const itemGroup = (items: string) =>
  /* html */ `<ark-carousel-item-group class="${styles.ItemGroup}">${items}</ark-carousel-item-group>`

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

const item = (content: string, attrs = `class="${styles.Item}"`) =>
  /* html */ `<ark-carousel-item ${attrs}>${content}</ark-carousel-item>`

const image = ({ src, alt }: { src: string; alt: string }) =>
  /* html */ `<img src="${src}" alt="${alt}" width="500" height="300" />`

const imageItems = () => images.map((img) => item(image(img))).join('')

const control = (children: string, attrs = '') =>
  /* html */ `<ark-carousel-control class="${styles.Control}" ${attrs}>${children}</ark-carousel-control>`

const prev = (icon = createElement(ArrowLeft, { 'aria-hidden': 'true' }).outerHTML) =>
  /* html */ `<ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-prev-trigger>`

const next = (icon = createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML) =>
  /* html */ `<ark-carousel-next-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-next-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = carouselMarkup(
    'auto-play loop',
    `${itemGroup(imageItems())}${control(
      /* html */ `${prev(createElement(ChevronLeft, { 'aria-hidden': 'true' }).outerHTML)}
      <ark-carousel-autoplay-trigger>
        <button class="${styles.AutoplayTrigger}">
          <ark-carousel-autoplay-indicator>${createElement(Play, { 'aria-hidden': 'true' }).outerHTML.replace('<svg', '<svg fallback')}${createElement(Pause, { 'aria-hidden': 'true' }).outerHTML}</ark-carousel-autoplay-indicator>
        </button>
      </ark-carousel-autoplay-trigger>
      ${next(createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML)}`,
      'data-justify="center"',
    )}`,
  )
}
