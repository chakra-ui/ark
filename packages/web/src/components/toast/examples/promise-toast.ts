import { createElement, X, LoaderCircle, CircleCheck, CircleAlert } from 'lucide'

import { createToaster } from '@ark-ui/web/toast'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const indicatorIcons = {
  loading: LoaderCircle,
  success: CircleCheck,
  error: CircleAlert,
}

const indicator = (type: keyof typeof indicatorIcons) =>
  createElement(indicatorIcons[type], {
    'aria-hidden': 'true',
    class: styles.Indicator,
    'data-icon': type,
    ...(type === 'loading' ? { 'data-type': 'loading' } : {}),
  }).outerHTML

const onClick = (host: HTMLElement, selector: string, listener: (el: HTMLElement) => void) => {
  for (const el of host.querySelectorAll<HTMLElement>(selector)) el.addEventListener('click', () => listener(el))
}

const store = createToaster({ overlap: true, placement: 'bottom-end', gap: 16 })

const uploadFile = () =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve() : reject(new Error('Upload failed'))
    }, 2000)
  })

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

export function mount(root: HTMLElement) {
  const host = fragment(/* html */ `
    <button type="button" class="${button.Root}">Upload file</button>
    <style>${['info', 'success', 'error', 'warning', 'loading']
      .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
      .join('\n')}</style>
    <ark-toaster>
      <template>
        <ark-toast class="${styles.Root}">
          <ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ">
            <ark-toast-title class="${styles.Title}">${(['loading', 'success', 'error'] as const).map(indicator).join('')}</ark-toast-title>
            <ark-toast-description class="${styles.Description}"></ark-toast-description>
          </ark-toast-content>
          <ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>
        </ark-toast>
      </template>
    </ark-toaster>`)
  onClick(host, 'button', () => {
    store.promise(uploadFile, {
      loading: { title: 'Uploading file...', description: 'Please wait while we upload your document.' },
      success: { title: 'Upload complete', description: 'Your file has been uploaded successfully.' },
      error: { title: 'Upload failed', description: 'Could not upload the file. Please try again.' },
    })
  })
  root.replaceChildren(connect(host, store))
}
