import { createElement, ChevronRight } from 'lucide'

import '../../src/components/collapsible/index.js'

import styles from 'styles/collapsible.module.css'

const trigger = (label: string) => /* html */ `
  <ark-collapsible-trigger>
    <button class="${styles.Trigger}">
      ${label}
      <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
    </button>
  </ark-collapsible-trigger>`

const collapsible = (attrs: string, label: string, body: string, className = styles.Root) => /* html */ `
  <ark-collapsible class="${className}" ${attrs}>
    ${trigger(label)}
    <ark-collapsible-content class="${styles.Content}">${body}</ark-collapsible-content>
  </ark-collapsible>`

export function mount(root: HTMLElement) {
  root.innerHTML = collapsible(
    '',
    'Getting Started',
    /* html */ `<div class="${styles.Body}">
      <p>Welcome to the Ark UI documentation. Here are some topics to explore:</p>
      ${collapsible('', 'Installation', /* html */ `<div class="${styles.Body}"><p>Install Ark UI using your preferred package manager:</p><code>npm install @ark-ui/react</code></div>`, styles.Nested)}
      ${collapsible('', 'Styling', /* html */ `<div class="${styles.Body}"><p>Ark UI components are unstyled by default. Use CSS modules, Tailwind, or any styling solution.</p></div>`, styles.Nested)}
    </div>`,
  )
}
