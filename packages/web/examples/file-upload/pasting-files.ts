import { createElement, X, Clipboard } from 'lucide'

import type { FileUploadElement } from '@ark-ui/web/file-upload'

import field from 'styles/field.module.css'

import styles from 'styles/file-upload.module.css'

import '@ark-ui/web/file-upload'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-file-upload max-files="3" accept="image/*" class="${styles.Root}">
      <ark-file-upload-label class="${styles.Label}">
        ${createElement(Clipboard, { 'aria-hidden': 'true', style: 'width: 1rem; height: 1rem; display: inline; margin-right: 0.25rem; vertical-align: middle' }).outerHTML}
        Upload with Paste
      </ark-file-upload-label>
      <textarea class="${field.Textarea}" placeholder="Paste an image here (Ctrl/Cmd + V)"></textarea>
      <ark-file-upload-item-group class="${styles.ItemGroup}" ><template>
  <ark-file-upload-item class="${styles.Item}">
    
  <ark-file-upload-item-preview type="image/*" class="${styles.ItemPreview}">
    <ark-file-upload-item-preview-image><img class="${styles.ItemPreviewImage}" /></ark-file-upload-item-preview-image>
  </ark-file-upload-item-preview>
    <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
    <ark-file-upload-item-size-text class="${styles.ItemSizeText}"></ark-file-upload-item-size-text>
    <ark-file-upload-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-file-upload-item-delete-trigger>
  </ark-file-upload-item></template></ark-file-upload-item-group>
      <ark-file-upload-hidden-input></ark-file-upload-hidden-input>
    </ark-file-upload>`
  const el = root.querySelector('ark-file-upload')!
  root.querySelector('textarea')!.addEventListener('paste', (event) => el.api?.setClipboardFiles(event.clipboardData))
}
