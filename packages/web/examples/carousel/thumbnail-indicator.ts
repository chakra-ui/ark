import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const carouselMarkup = (attrs: string, children: string) =>
  `<ark-carousel class="${styles.Root}" ${attrs}>${children}</ark-carousel>`

const control = (children: string, attrs = '') =>
  `<ark-carousel-control class="${styles.Control}" ${attrs}>${children}</ark-carousel-control>`

const prev = (icon = createElement(ArrowLeft, { 'aria-hidden': 'true' }).outerHTML) =>
  `<ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-prev-trigger>`

const itemGroup = (items: string) =>
  `<ark-carousel-item-group class="${styles.ItemGroup}">${items}</ark-carousel-item-group>`

const images = [
  { src: 'https://picsum.photos/seed/1/500/300', alt: 'Nature landscape' },
  { src: 'https://picsum.photos/seed/2/500/300', alt: 'City skyline' },
  { src: 'https://picsum.photos/seed/3/500/300', alt: 'Mountain view' },
  { src: 'https://picsum.photos/seed/4/500/300', alt: 'Ocean sunset' },
  { src: 'https://picsum.photos/seed/5/500/300', alt: 'Forest path' },
]

const item = (content: string, attrs = `class="${styles.Item}"`) =>
  `<ark-carousel-item ${attrs}>${content}</ark-carousel-item>`

const image = ({ src, alt }: { src: string; alt: string }) =>
  `<img src="${src}" alt="${alt}" width="500" height="300" />`

const imageItems = () => images.map((img) => item(image(img))).join('')

const next = (icon = createElement(ArrowRight, { 'aria-hidden': 'true' }).outerHTML) =>
  `<ark-carousel-next-trigger><button class="${styles.Trigger}">${icon}</button></ark-carousel-next-trigger>`

const indicator = (content = '', className = styles.Indicator) =>
  `<ark-carousel-indicator><button class="${className}">${content}</button></ark-carousel-indicator>`

const thumbnailIndicators = () =>
  `<ark-carousel-indicator-group class="${styles.IndicatorGroup}">${images.map((img) => indicator(image(img), styles.ThumbnailIndicator)).join('')}</ark-carousel-indicator-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = carouselMarkup(
    'default-page="0"',
    `${control(`${prev()}${itemGroup(imageItems())}${next()}`)}${thumbnailIndicators()}`,
  )
}
