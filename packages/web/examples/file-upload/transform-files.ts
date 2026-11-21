import { createElement, X, Paperclip } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '@ark-ui/web/file-upload'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload max-files="5" class="${styles.Root}">
    <ark-file-upload-label class="${styles.Label}">File Upload</ark-file-upload-label>
    <ark-file-upload-trigger><button class="${styles.Trigger}">${createElement(Paperclip, { 'aria-hidden': 'true' }).outerHTML} Choose file(s)</button></ark-file-upload-trigger>
    <ark-file-upload-item-group class="${styles.ItemGroup}" ><template>
  <ark-file-upload-item class="${styles.ItemCompact}">
    <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
    <ark-file-upload-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-file-upload-item-delete-trigger>
  </ark-file-upload-item></template></ark-file-upload-item-group>
    <ark-file-upload-hidden-input></ark-file-upload-hidden-input>
  </ark-file-upload>`
  const upload = root.querySelector('ark-file-upload')!
  upload.transformFiles = async (files) =>
    files.map((file) => new window.File([file], file.name.toLowerCase(), { type: file.type }))
}
