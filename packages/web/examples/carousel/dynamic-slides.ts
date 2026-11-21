import { createElement, ArrowLeft, ArrowRight, Plus } from 'lucide'

import button from 'styles/button.module.css'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 5 }, (_, index) => `Slide ${index + 1}`)

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const carousel = ({ page }: { page: number }, children: string[]) => /* html */ `
  <ark-carousel class="${styles.Root}" page="${page}">${children.join('')}</ark-carousel>`

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

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

const pageIndicators = () => /* html */ `
  <ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template>${indicator()}</template></ark-carousel-indicator-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    ${carousel({ page: 0 }, [
      itemGroup(slides.map((label) => slideItem({ label }))),
      control([prevTrigger(), pageIndicators(), nextTrigger()]),
    ])}
    <button class="${button.Root}" data-add>${icon(Plus)}Add Slide</button>`
  const carouselEl = root.querySelector('ark-carousel')!
  carouselEl.addEventListener('pagechange', (event) => {
    carouselEl.setAttribute('page', String(event.detail.page))
  })
  const group = carouselEl.querySelector('ark-carousel-item-group')!
  root.querySelector('[data-add]')!.addEventListener('click', () => {
    const count = group.children.length
    group.insertAdjacentHTML('beforeend', slideItem({ label: `Slide ${count + 1}` }))
  })
}
