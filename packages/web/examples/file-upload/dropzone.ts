import { createElement, Upload, X, File } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '../../src/components/file-upload/index.js'

const label = (text: string) => `<ark-file-upload-label class="${styles.Label}">${text}</ark-file-upload-label>`

const dropzone = (title: string, description: string) => `
  <ark-file-upload-dropzone class="${styles.Dropzone}">
    ${createElement(Upload, { 'aria-hidden': 'true', class: `${styles.DropzoneIcon}` }).outerHTML}
    <div class="${styles.DropzoneContent}">
      <span class="${styles.DropzoneTitle}">${title}</span>
      <span class="${styles.DropzoneDescription}">${description}</span>
    </div>
  </ark-file-upload-dropzone>`

const itemGroup = (template: string, type = '') =>
  `<ark-file-upload-item-group class="${styles.ItemGroup}" ${type ? `type="${type}"` : ''}><template>${template}</template></ark-file-upload-item-group>`

const deleteTrigger = `<ark-file-upload-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-file-upload-item-delete-trigger>`

const item = (previews: string) => `
  <ark-file-upload-item class="${styles.Item}">
    ${previews}
    <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
    <ark-file-upload-item-size-text class="${styles.ItemSizeText}"></ark-file-upload-item-size-text>
    ${deleteTrigger}
  </ark-file-upload-item>`

const imagePreview = `
  <ark-file-upload-item-preview type="image/*" class="${styles.ItemPreview}">
    <ark-file-upload-item-preview-image><img class="${styles.ItemPreviewImage}" /></ark-file-upload-item-preview-image>
  </ark-file-upload-item-preview>`

const typePreview = (type: string, iconHtml: string) =>
  `<ark-file-upload-item-preview type="${type}" class="${styles.ItemPreview}">${iconHtml}</ark-file-upload-item-preview>`

const hiddenInput = `<ark-file-upload-hidden-input></ark-file-upload-hidden-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload max-files="5" class="${styles.Root}">
    ${label('File Upload')}
    ${dropzone('Drag and drop files here', 'or click to browse')}
    ${itemGroup(item(`${imagePreview}${typePreview('.*', createElement(File, { 'aria-hidden': 'true' }).outerHTML)}`))}
    ${hiddenInput}
  </ark-file-upload>`
}
