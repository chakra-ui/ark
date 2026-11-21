import '../../src/components/steps/index.js'

import button from 'styles/button.module.css'
import styles from 'styles/steps.module.css'

interface Step {
  value: string
  title: string
  description: string
}

const items: Step[] = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

const step = ({ value, title, index }: { value: string; title: string; index: number }) => /* html */ `
  <ark-steps-item class="${styles.Item}" value="${value}">
    <ark-steps-trigger>
      <button class="${styles.Trigger}">
        <ark-steps-indicator class="${styles.Indicator}">${index + 1}</ark-steps-indicator>
        <span>${title}</span>
      </button>
    </ark-steps-trigger>
    <ark-steps-separator class="${styles.Separator}"></ark-steps-separator>
  </ark-steps-item>`

const content = ({ value, title, description }: Step) => /* html */ `
  <ark-steps-content class="${styles.Content}" value="${value}">${title} - ${description}</ark-steps-content>`

export function mount(root: HTMLElement) {
  const host = document.createElement('div')
  host.className = 'stack'
  host.innerHTML = /* html */ `
  <output>current step: first</output>
  <ark-steps class="${styles.Root}" value="first">
    <ark-steps-list class="${styles.List}">
      ${items.map((item, index) => step({ ...item, index })).join('')}
    </ark-steps-list>
    ${items.map((item) => content(item)).join('')}
    <ark-steps-completed-content class="${styles.CompletedContent}">
      Steps Complete - Thank you for filling out the form!
    </ark-steps-completed-content>
    <div class="${styles.Actions}">
      <ark-steps-prev-trigger><button class="${button.Root}">Back</button></ark-steps-prev-trigger>
      <ark-steps-next-trigger><button class="${button.Root}" data-variant="solid">Next</button></ark-steps-next-trigger>
    </div>
  </ark-steps>`

  const el = host.querySelector('ark-steps')!
  el.addEventListener('valuechange', (event) => {
    const { value } = event.detail
    el.setAttribute('value', value ?? '')
    host.querySelector('output')!.textContent = `current step: ${value}`
  })

  root.replaceChildren(host)
}
