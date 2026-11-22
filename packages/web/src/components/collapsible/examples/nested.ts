import { createElement, ChevronRight } from 'lucide'

import '@ark-ui/web/collapsible'

import styles from 'styles/collapsible.module.css'

interface CollapsibleProps {
  label: string
  className?: string
}

const collapsible = ({ label, className = styles.Root }: CollapsibleProps, children: string[]) => /* html */ `
  <ark-collapsible class="${className}">
    <ark-collapsible-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
      </button>
    </ark-collapsible-trigger>
    <ark-collapsible-content class="${styles.Content}">${children.join('')}</ark-collapsible-content>
  </ark-collapsible>`

const body = (children: string[]) => /* html */ `<div class="${styles.Body}">${children.join('')}</div>`

const paragraph = (text: string) => /* html */ `<p>${text}</p>`

export function mount(root: HTMLElement) {
  root.innerHTML = collapsible({ label: 'Getting Started' }, [
    body([
      paragraph('Welcome to the Ark UI documentation. Here are some topics to explore:'),
      collapsible({ label: 'Installation', className: styles.Nested }, [
        body([
          paragraph('Install Ark UI using your preferred package manager:'),
          /* html */ `<code>npm install @ark-ui/react</code>`,
        ]),
      ]),
      collapsible({ label: 'Styling', className: styles.Nested }, [
        body([
          paragraph('Ark UI components are unstyled by default. Use CSS modules, Tailwind, or any styling solution.'),
        ]),
      ]),
    ]),
  ])
}
