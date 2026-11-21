import { createElement, X, Folder, File } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '../../src/components/file-upload/index.js'

const label = (text: string) =>
  /* html */ `<ark-file-upload-label class="${styles.Label}">${text}</ark-file-upload-label>`

const trigger = (content: string) =>
  /* html */ `<ark-file-upload-trigger><button class="${styles.Trigger}">${content}</button></ark-file-upload-trigger>`

const itemGroup = (template: string, type = '') =>
  /* html */ `<ark-file-upload-item-group class="${styles.ItemGroup}" ${type ? `type="${type}"` : ''}><template>${template}</template></ark-file-upload-item-group>`

const deleteTrigger = /* html */ `<ark-file-upload-item-delete-trigger><button class="${styles.ItemDeleteTrigger}">${createElement(X, { 'aria-hidden': 'true' }).outerHTML}</button></ark-file-upload-item-delete-trigger>`

const item = (previews: string) => /* html */ `
  <ark-file-upload-item class="${styles.Item}">
    ${previews}
    <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
    <ark-file-upload-item-size-text class="${styles.ItemSizeText}"></ark-file-upload-item-size-text>
    ${deleteTrigger}
  </ark-file-upload-item>`

const staticPreview = (iconHtml: string) => /* html */ `<div class="${styles.ItemPreview}">${iconHtml}</div>`

const hiddenInput = /* html */ `<ark-file-upload-hidden-input></ark-file-upload-hidden-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload directory class="${styles.Root}">
    ${label('Upload Folder')}
    ${trigger(`${createElement(Folder, { 'aria-hidden': 'true', style: 'width: 1rem; height: 1rem' }).outerHTML} Select Folder`)}
    ${itemGroup(item(staticPreview(createElement(File, { 'aria-hidden': 'true' }).outerHTML)))}
    ${hiddenInput}
  </ark-file-upload>`
}
