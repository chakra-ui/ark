import { createElement, ChevronRight } from 'lucide'

import '../../src/components/collapsible/index.js'

import styles from 'styles/collapsible.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

const trigger = (label: string) => /* html */ `
  <ark-collapsible-trigger>
    <button class="${styles.Trigger}">
      ${label}
      <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
    </button>
  </ark-collapsible-trigger>`

interface CollapsibleProps {
  label: string
  disabled?: boolean
}

const collapsible = ({ label, disabled }: CollapsibleProps, children: string[]) => /* html */ `
  <ark-collapsible class="${styles.Root}" ${attr('disabled', disabled)}>
    ${trigger(label)}
    <ark-collapsible-content class="${styles.Content}">${children.join('')}</ark-collapsible-content>
  </ark-collapsible>`

const about = /* html */ `<div class="${styles.Body}">Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid, Vue, and Svelte.</div>`

export function mount(root: HTMLElement) {
  root.innerHTML = collapsible({ label: 'What is Ark UI?', disabled: true }, [about])
}
