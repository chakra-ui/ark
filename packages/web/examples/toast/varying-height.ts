import { createElement, X } from 'lucide'

import { createToaster } from '@ark-ui/web/toast'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

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
  const host = fragment(/* html */ `
    <button type="button" class="${button.Root}">Create toast</button>
    <style>${['info', 'success', 'error', 'warning', 'loading']
      .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
      .join('\n')}</style>
    <ark-toaster>
      <template>
        <ark-toast class="${styles.Root}">
          <ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ">
            <ark-toast-title class="${styles.Title}"></ark-toast-title>
            <ark-toast-description class="${styles.Description}"></ark-toast-description>
          </ark-toast-content>
          <ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>
        </ark-toast>
      </template>
    </ark-toaster>`)
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
