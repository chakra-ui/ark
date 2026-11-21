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

const carousel = ({ defaultPage }: { defaultPage: number }, children: string[]) => /* html */ `
  <ark-carousel class="${styles.Root}" default-page="${defaultPage}">${children.join('')}</ark-carousel>`

const control = (children: string[]) => /* html */ `
  <ark-carousel-control class="${styles.Control}">${children.join('')}</ark-carousel-control>`

const prevTrigger = () => /* html */ `
  <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>`

const nextTrigger = () => /* html */ `
  <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>`

const itemGroup = (children: string[]) => /* html */ `
  <ark-carousel-item-group class="${styles.ItemGroup}">${children.join('')}</ark-carousel-item-group>`

const image = ({ src, alt }: Image) => /* html */ `<img src="${src}" alt="${alt}" width="500" height="300" />`

const imageItem = (img: Image) => /* html */ `
  <ark-carousel-item class="${styles.Item}">${image(img)}</ark-carousel-item>`

const indicatorGroup = (children: string[]) => /* html */ `
  <ark-carousel-indicator-group class="${styles.IndicatorGroup}">${children.join('')}</ark-carousel-indicator-group>`

const thumbnailIndicator = (img: Image) => /* html */ `
  <ark-carousel-indicator><button class="${styles.ThumbnailIndicator}">${image(img)}</button></ark-carousel-indicator>`

export function mount(root: HTMLElement) {
  root.innerHTML = carousel({ defaultPage: 0 }, [
    control([prevTrigger(), itemGroup(images.map(imageItem)), nextTrigger()]),
    indicatorGroup(images.map(thumbnailIndicator)),
  ])
}
