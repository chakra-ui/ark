import { createElement, X, Clock, Info, CircleCheck, CircleAlert, TriangleAlert, LoaderCircle } from 'lucide'

import { createToaster } from '../../src/components/toast/index.js'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const typeStyle = /* html */ `<style>${['info', 'success', 'error', 'warning', 'loading']
  .map((type) => `ark-toast:not([data-type='${type}']) [data-icon='${type}'] { display: none; }`)
  .join('\n')}</style>`

const toaster = (children: string[]) => /* html */ `
  ${typeStyle}
  <ark-toaster>
    <template>
      <ark-toast class="${styles.Root}">${children.join('')}</ark-toast>
    </template>
  </ark-toaster>`

const title = (children: string[] = []) =>
  /* html */ `<ark-toast-title class="${styles.Title}">${children.join('')}</ark-toast-title>`

const description = /* html */ `<ark-toast-description class="${styles.Description}"></ark-toast-description>`

const content = ({ style = '' }: { style?: string } = {}, children = [title(), description]) =>
  /* html */ `<ark-toast-content style="display: flex; flex-direction: column; gap: 0.25rem; ${style}">${children.join('')}</ark-toast-content>`

const closeTrigger = /* html */ `<ark-toast-close-trigger><button class="${styles.CloseTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-toast-close-trigger>`

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
    ${toaster([content({}, [title(typeIndicators(['loading', 'success', 'error'])), description]), closeTrigger])}`)
  onClick(host, 'button', () => {
    store.promise(uploadFile, {
      loading: { title: 'Uploading file...', description: 'Please wait while we upload your document.' },
      success: { title: 'Upload complete', description: 'Your file has been uploaded successfully.' },
      error: { title: 'Upload failed', description: 'Could not upload the file. Please try again.' },
    })
  })
  root.replaceChildren(connect(host, store))
}

const indicatorIcons = {
  clock: Clock,
  info: Info,
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  loading: LoaderCircle,
}

interface IndicatorProps {
  name: keyof typeof indicatorIcons
  attrs?: Record<string, string>
}

const indicator = ({ name, attrs = {} }: IndicatorProps) =>
  createElement(indicatorIcons[name], { 'aria-hidden': 'true', class: styles.Indicator, ...attrs }).outerHTML

const typeIndicators = (types: (keyof typeof indicatorIcons)[]) =>
  types.map((type) =>
    indicator({ name: type, attrs: { 'data-icon': type, ...(type === 'loading' ? { 'data-type': 'loading' } : {}) } }),
  )
