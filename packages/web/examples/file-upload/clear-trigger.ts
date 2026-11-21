import { createElement, X, Paperclip } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '../../src/components/file-upload/index.js'

const label = (text: string) =>
  /* html */ `<ark-file-upload-label class="${styles.Label}">${text}</ark-file-upload-label>`

const trigger = ({ icon, label }: { icon: string; label: string }) =>
  /* html */ `<ark-file-upload-trigger><button class="${styles.Trigger}">${icon} ${label}</button></ark-file-upload-trigger>`

const itemGroup = ({ type }: { type?: 'accepted' | 'rejected' }, children: string[]) =>
  /* html */ `<ark-file-upload-item-group class="${styles.ItemGroup}" ${type ? `type="${type}"` : ''}><template>${children.join('')}</template></ark-file-upload-item-group>`

const deleteTrigger = /* html */ `<ark-file-upload-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-file-upload-item-delete-trigger>`

const item = (previews: string[]) => /* html */ `
  <ark-file-upload-item class="${styles.Item}">
    ${previews.join('')}
    <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
    <ark-file-upload-item-size-text class="${styles.ItemSizeText}"></ark-file-upload-item-size-text>
    ${deleteTrigger}
  </ark-file-upload-item>`

const imagePreview = /* html */ `
  <ark-file-upload-item-preview type="image/*" class="${styles.ItemPreview}">
    <ark-file-upload-item-preview-image><img class="${styles.ItemPreviewImage}" /></ark-file-upload-item-preview-image>
  </ark-file-upload-item-preview>`

const hiddenInput = /* html */ `<ark-file-upload-hidden-input></ark-file-upload-hidden-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload max-files="5" accept="image/png,image/jpeg" class="${styles.Root}">
    ${label('File Upload')}
    <div class="${styles.Actions}">
      ${trigger({ icon: createElement(Paperclip, { 'aria-hidden': 'true' }).outerHTML, label: 'Choose file(s)' })}
      <ark-file-upload-clear-trigger><button class="${styles.ClearTrigger}">Clear Files</button></ark-file-upload-clear-trigger>
    </div>
    ${itemGroup({}, [item([imagePreview])])}
    ${hiddenInput}
  </ark-file-upload>`
}
