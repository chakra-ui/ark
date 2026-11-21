import { createElement, X, Camera, File } from 'lucide'

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

const typePreview = ({ type, icon }: { type: string; icon: string }) =>
  /* html */ `<ark-file-upload-item-preview type="${type}" class="${styles.ItemPreview}">${icon}</ark-file-upload-item-preview>`

const hiddenInput = /* html */ `<ark-file-upload-hidden-input></ark-file-upload-hidden-input>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-file-upload capture="environment" class="${styles.Root}">
    ${label('Capture Photo')}
    ${trigger({ icon: createElement(Camera, { 'aria-hidden': 'true', style: 'width: 1rem; height: 1rem' }).outerHTML, label: 'Open Camera' })}
    ${itemGroup({}, [
      item([imagePreview, typePreview({ type: '.*', icon: createElement(File, { 'aria-hidden': 'true' }).outerHTML })]),
    ])}
    ${hiddenInput}
  </ark-file-upload>`
}
