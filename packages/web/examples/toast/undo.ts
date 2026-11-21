import { createToaster } from '../../src/components/toast/index.js'

import button from 'styles/button.module.css'

import type * as toast from '@zag-js/toast'

import styles from 'styles/toast.module.css'

const initialFiles = [
  { id: 'report', name: 'Q4 report.pdf' },
  { id: 'notes', name: 'Meeting notes.md' },
  { id: 'budget', name: 'Budget.xlsx' },
]

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

const actionTrigger = /* html */ `<ark-toast-action-trigger><button class="${styles.ActionTrigger}"></button></ark-toast-action-trigger>`

const store = createToaster({ placement: 'bottom-end', gap: 24 })

const connect = (host: HTMLElement, store: toast.Store<string>) => {
  host.querySelector('ark-toaster')!.toaster = store
  return host
}

export function mount(root: HTMLElement) {
  let files = initialFiles
  const host = fragment(/* html */ `<div class="stack" data-files></div>${toaster([content(), actionTrigger])}`)
  const list = host.querySelector<HTMLElement>('[data-files]')!

  const render = () => {
    list.innerHTML =
      files
        .map(
          (file) => /* html */ `
          <div class="hstack">
            <span>${file.name}</span>
            <button type="button" class="${button.Root}" data-id="${file.id}">Archive</button>
          </div>`,
        )
        .join('') + (files.length === 0 ? '<p>No files</p>' : '')
  }

  const archive = (id: string) => {
    const item = files.find((file) => file.id === id)
    if (!item) return
    files = files.filter((file) => file.id !== id)
    render()
    store.create({
      title: 'File archived',
      description: item.name,
      type: 'info',
      action: {
        label: 'Undo',
        onClick: () => {
          if (files.some((file) => file.id === item.id)) return
          files = [item, ...files]
          render()
        },
      },
    })
  }

  list.addEventListener('click', (event) => {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-id]')?.dataset.id
    if (id) archive(id)
  })
  render()
  root.replaceChildren(connect(host, store))
}
