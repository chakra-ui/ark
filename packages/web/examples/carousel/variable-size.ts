import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

interface Slide {
  id: string
  width: string
  label: string
}

const slides: Slide[] = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const attr = (name: string, on?: boolean) => (on ? name : '')

const carousel = ({ autoSize, spacing }: { autoSize?: boolean; spacing: string }, children: string[]) => /* html */ `
  <ark-carousel class="${styles.Root}" ${attr('auto-size', autoSize)} spacing="${spacing}">${children.join('')}</ark-carousel>`

const control = (children: string[]) => /* html */ `
  <ark-carousel-control class="${styles.Control}">${children.join('')}</ark-carousel-control>`

const prevTrigger = () => /* html */ `
  <ark-carousel-prev-trigger><button class="${styles.Trigger}">${icon(ArrowLeft)}</button></ark-carousel-prev-trigger>`

const nextTrigger = () => /* html */ `
  <ark-carousel-next-trigger><button class="${styles.Trigger}">${icon(ArrowRight)}</button></ark-carousel-next-trigger>`

const itemGroup = (children: string[]) => /* html */ `
  <ark-carousel-item-group class="${styles.ItemGroup}">${children.join('')}</ark-carousel-item-group>`

const sizedItem = ({ width, label }: Slide) => /* html */ `
  <ark-carousel-item snap-align="center">
    <div class="${styles.Slide}" style="width: ${width}; height: 6rem">${label}</div>
  </ark-carousel-item>`

const indicator = () => /* html */ `
  <ark-carousel-indicator><button class="${styles.Indicator}"></button></ark-carousel-indicator>`

const pageIndicators = () => /* html */ `
  <ark-carousel-indicator-group class="${styles.IndicatorGroup}"><template>${indicator()}</template></ark-carousel-indicator-group>`

export function mount(root: HTMLElement) {
  root.innerHTML = carousel({ autoSize: true, spacing: '8px' }, [
    control([prevTrigger(), nextTrigger()]),
    itemGroup(slides.map(sizedItem)),
    pageIndicators(),
  ])
}
