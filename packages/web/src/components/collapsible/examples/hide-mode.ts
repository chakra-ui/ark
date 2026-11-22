import { createElement, ChevronRight } from 'lucide'

import '@ark-ui/web/collapsible'

import styles from 'styles/collapsible.module.css'

const attr = (name: string, on?: boolean) => (on ? name : '')

interface CollapsibleProps {
  label: string
  defaultOpen?: boolean
  hiddenUntilFound?: boolean
}

const collapsible = ({ label, defaultOpen, hiddenUntilFound }: CollapsibleProps, children: string[]) => /* html */ `
  <ark-collapsible class="${styles.Root}" ${attr('default-open', defaultOpen)} ${attr('hidden-until-found', hiddenUntilFound)}>
    <ark-collapsible-trigger>
      <button class="${styles.Trigger}">
        ${label}
        <ark-collapsible-indicator class="${styles.Indicator}">${createElement(ChevronRight, { 'aria-hidden': 'true' }).outerHTML}</ark-collapsible-indicator>
      </button>
    </ark-collapsible-trigger>
    <ark-collapsible-content class="${styles.Content}">${children.join('')}</ark-collapsible-content>
  </ark-collapsible>`

const body = (text: string) => /* html */ `<div class="${styles.Body}">${text}</div>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="stack">
    <p style="margin: 0">Collapse both panels, then search the page for "find me". Only <code>hidden-until-found</code> reveals its content.</p>
    ${collapsible({ label: 'hidden', defaultOpen: true }, [body('Hidden content: find me in the default panel.')])}
    ${collapsible({ label: 'hidden-until-found', defaultOpen: true, hiddenUntilFound: true }, [
      body('Hidden content: find me in the until-found panel.'),
    ])}
  </div>`
}
