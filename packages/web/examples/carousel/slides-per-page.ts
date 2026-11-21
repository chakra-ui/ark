import { createElement, ArrowLeft, ArrowRight } from 'lucide'

import '../../src/components/carousel/index.js'

import styles from 'styles/carousel.module.css'

const slides = Array.from({ length: 6 }, (_, index) => `Slide ${index + 1}`)

const icon = (node: typeof ArrowLeft) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const carousel = (
  { slidesPerPage, spacing }: { slidesPerPage: number; spacing: string },
  children: string[],
) => /* html */ `
  <ark-carousel class="${styles.Root}" slides-per-page="${slidesPerPage}" spacing="${spacing}">${children.join('')}</ark-carousel>`

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
  root.innerHTML = carousel({ slidesPerPage: 2, spacing: '20px' }, [
    control([prevTrigger(), nextTrigger()]),
    itemGroup(slides.map((label) => slideItem({ label }))),
    pageIndicators(),
  ])
}
