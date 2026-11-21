import { createElement, ArrowLeft, ArrowUp, ArrowRight, ArrowDown } from 'lucide'

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

const indicator = (content = '', className = styles.Indicator) =>
  /* html */ `<ark-carousel-indicator><button class="${className}">${content}</button></ark-carousel-indicator>`

const indicators = (count: number) =>
  /* html */ `<ark-carousel-indicator-group class="${styles.IndicatorGroup}">${Array.from({ length: count }, () => indicator()).join('')}</ark-carousel-indicator-group>`

const next = (icon = createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML) =>
  /* html */ `<ark-carousel-next-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-next-trigger>`

export function mount(root: HTMLElement) {
  root.innerHTML = carouselMarkup(
    'default-page="0" orientation="vertical"',
    `${itemGroup(imageItems())}${control(`${prev(createElement(ArrowUp, { 'aria-hidden': 'true' }).outerHTML)}${indicators(5)}${next(createElement(ArrowDown, { 'aria-hidden': 'true' }).outerHTML)}`)}`,
  )
}
