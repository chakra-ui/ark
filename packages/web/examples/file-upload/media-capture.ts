import { createElement, X, Camera, File } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '../../src/components/file-upload/index.js'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload capture="environment" class="${styles.Root}">
    <ark-file-upload-label class="${styles.Label}">Capture Photo</ark-file-upload-label>
    <ark-file-upload-trigger><button class="${styles.Trigger}">${createElement(Camera, { 'aria-hidden': 'true', style: 'width: 1rem; height: 1rem' }).outerHTML} Open Camera</button></ark-file-upload-trigger>
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
