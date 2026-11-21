import { createToaster } from '../../src/components/toast/index.js'

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

const store = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 })

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

export function mount(root: HTMLElement) {
  let id: string | undefined
  const host = fragment(/* html */ `
    <div class="hstack">
      <button type="button" class="${button.Root}" data-create>Send message</button>
      <button type="button" class="${button.Root}" data-update>Mark as sent</button>
    </div>
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
        </ark-toast>
      </template>
    </ark-toaster>`)
  onClick(host, '[data-create]', () => {
    id = store.create({
      title: 'Sending message...',
      description: 'Please wait while we deliver your message.',
      type: 'loading',
    })
  })
  onClick(host, '[data-update]', () => {
    if (!id) return
    store.update(id, {
      title: 'Message sent',
      description: 'Your message has been delivered successfully.',
      type: 'success',
    })
  })
  root.replaceChildren(connect(host, store))
}
