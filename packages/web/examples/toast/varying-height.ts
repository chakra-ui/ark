import { createElement, X } from 'lucide'

import { createToaster } from '../../src/components/toast/index.js'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const typeStyle = `<style>${['info', 'success', 'error', 'warning', 'loading']
  .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
  .join('\n')}</style>`

const toaster = (body: string) => `
  ${typeStyle}
  <ark-toaster>
    <template>
      <ark-toast class="${styles.Root}">${body}</ark-toast>
    </template>
  </ark-toaster>`

const title = (prefix = '') => `<ark-toast-title class="${styles.Title}">${prefix}</ark-toast-title>`

const description = `<ark-toast-description class="${styles.Description}"></ark-toast-description>`

const content = (body = `${title()}${description}`, style = '') =>
  `<ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ${style}">${body}</ark-toast-content>`

const closeTrigger = `<ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>`

const onClick = (host: HTMLElement, selector: string, listener: (el: HTMLElement) => void) => {
  for (const el of host.querySelectorAll<HTMLElement>(selector)) el.addEventListener('click', () => listener(el))
}

const store = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 })

const DESCRIPTIONS = [
  'Your changes have been saved.',
  'File uploaded successfully. You can view it in your documents folder.',
  'Your meeting has been scheduled for tomorrow at 10:00 AM. We have sent a calendar invite to all participants.',
  'We noticed unusual activity on your account. For your security, please verify your identity by clicking the link sent to your email address.',
]

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

export function mount(root: HTMLElement) {
  let count = 0
  const host = fragment(`
    <button type="button" class="${button.Root}">Create toast</button>
    ${toaster(`${content()}${closeTrigger}`)}`)
  onClick(host, 'button', () => {
    count += 1
    store.create({
      title: `Notification ${count}`,
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
      type: 'info',
    })
  })
  root.replaceChildren(connect(host, store))
}
