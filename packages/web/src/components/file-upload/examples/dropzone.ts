import { createElement, Upload, X, File } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '@ark-ui/web/file-upload'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload max-files="5" class="${styles.Root}">
    <ark-file-upload-label class="${styles.Label}">File Upload</ark-file-upload-label>
    <ark-file-upload-dropzone class="${styles.Dropzone}">
      ${createElement(Upload, { 'aria-hidden': 'true', class: `${styles.DropzoneIcon}` }).outerHTML}
      <div class="${styles.DropzoneContent}">
        <span class="${styles.DropzoneTitle}">Drag and drop files here</span>
        <span class="${styles.DropzoneDescription}">or click to browse</span>
      </div>
    </ark-file-upload-dropzone>
    <ark-file-upload-item-group class="${styles.ItemGroup}">
      <template>
        <ark-file-upload-item class="${styles.Item}">
          <ark-file-upload-item-preview type="image/*" class="${styles.ItemPreview}">
            <ark-file-upload-item-preview-image><img class="${styles.ItemPreviewImage}" /></ark-file-upload-item-preview-image>
          </ark-file-upload-item-preview>
          <ark-file-upload-item-preview type=".*" class="${styles.ItemPreview}">${createElement(File, { 'aria-hidden': 'true' }).outerHTML}</ark-file-upload-item-preview>
          <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
          <ark-file-upload-item-size-text class="${styles.ItemSizeText}"></ark-file-upload-item-size-text>
          <ark-file-upload-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-file-upload-item-delete-trigger>
        </ark-file-upload-item>
      </template>
    </ark-file-upload-item-group>
    <ark-file-upload-hidden-input></ark-file-upload-hidden-input>
  </ark-file-upload>`
}
