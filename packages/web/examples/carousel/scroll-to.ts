import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import button from 'styles/button.module.css'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 5 }, (_, index) => `Slide ${index + 1}`)

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const carousel = ({ count }: { count: number }, children: string[]) => /* html */ `
  <ark-carousel class="${styles.Root}" count="${count}">${children.join('')}</ark-carousel>`

const scrollButton = ({ label }: { label: string }) => /* html */ `
  <button class="${button.Root}" data-scroll>${label}</button>`

const control = (children: string[]) => /* html */ `
  <ark-carousel-control class="${styles.Control}">${children.join('')}</ark-carousel-control>`

const prevTrigger = () => /* html */ `
  <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>`

const nextTrigger = () => /* html */ `
  <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>`

const itemGroup = (children: string[]) => /* html */ `
  <ark-carousel-item-group class="${styles.ItemGroup}">${children.join('')}</ark-carousel-item-group>`

const slideItem = ({ label }: { label: string }) => /* html */ `
  <ark-carousel-item class="${styles.Item}"><div class="${styles.Slide}">${label}</div></ark-carousel-item>`

const indicatorGroup = (children: string[]) => /* html */ `
  <ark-carousel-indicator-group class="${styles.IndicatorGroup}">${children.join('')}</ark-carousel-indicator-group>`

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

export function mount(root: HTMLElement) {
  root.innerHTML = carousel({ count: slides.length }, [
    scrollButton({ label: 'Go to slide 4' }),
    itemGroup(slides.map((label) => slideItem({ label }))),
    control([prevTrigger(), nextTrigger()]),
    indicatorGroup(slides.map(() => indicator())),
  ])
  const carouselEl = root.querySelector('ark-carousel')!
  root.querySelector('[data-scroll]')!.addEventListener('click', () => carouselEl.api?.scrollToIndex(3))
  root.replaceChildren(carouselEl)
}
