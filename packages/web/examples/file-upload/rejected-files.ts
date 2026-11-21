import { createElement, Upload, CircleAlert, CircleCheck, X } from 'lucide'

import styles from 'styles/file-upload.module.css'

import '../../src/components/file-upload/index.js'

import type { FileChangeDetails } from '@zag-js/file-upload'

interface TrackSectionsOptions {
  messages?: Record<string, string>
  tag?: string
}

function trackSections(host: HTMLElement, { messages = {}, tag = 'div' }: TrackSectionsOptions = {}) {
  const el = host.querySelector('ark-file-upload')!
  el.addEventListener('filechange', (event) => {
    const { acceptedFiles, rejectedFiles } = event.detail
    // Items are stamped on the render that follows the event
    queueMicrotask(() => {
      host.querySelector<HTMLElement>('[data-section="accepted"]')!.hidden = acceptedFiles.length === 0
      host.querySelector<HTMLElement>('[data-section="rejected"]')!.hidden = rejectedFiles.length === 0
      const nodes = host.querySelectorAll('[data-section="rejected"] ark-file-upload-item[data-rendered]')
      nodes.forEach((node, index) => {
        node.querySelector(`.${styles.ErrorList}`)!.innerHTML = (rejectedFiles[index]?.errors ?? [])
          .map((error) => `<${tag} class="${styles.ErrorItem}">${messages[error] ?? error}</${tag}>`)
          .join('')
      })
    })
  })
  return host
}

const fragment = (html: string) => {
  const host = document.createElement('div')
  host.innerHTML = html
  return host
}

const label = (text: string) =>
  /* html */ `<ark-file-upload-label class="${styles.Label}">${text}</ark-file-upload-label>`

const dropzone = ({ title, description }: { title: string; description: string }) => /* html */ `
  <ark-file-upload-dropzone class="${styles.Dropzone}">
    ${createElement(Upload, { 'aria-hidden': 'true', class: `${styles.DropzoneIcon}` }).outerHTML}
    <div class="${styles.DropzoneContent}">
      <span class="${styles.DropzoneTitle}">${title}</span>
      <span class="${styles.DropzoneDescription}">${description}</span>
    </div>
  </ark-file-upload-dropzone>`

const itemGroup = ({ type }: { type?: 'accepted' | 'rejected' }, children: string[]) =>
  /* html */ `<ark-file-upload-item-group class="${styles.ItemGroup}" ${type ? `type="${type}"` : ''}><template>${children.join('')}</template></ark-file-upload-item-group>`

const staticPreview = (iconHtml: string) => /* html */ `<div class="${styles.ItemPreview}">${iconHtml}</div>`

const rejectedItem = /* html */ `
  <ark-file-upload-item class="${styles.Item}" data-rejected>
    ${staticPreview(createElement(CircleAlert, { 'aria-hidden': 'true' }).outerHTML)}
    <ark-file-upload-item-name class="${styles.ItemName}"></ark-file-upload-item-name>
    <ark-file-upload-item-size-text class="${styles.ItemSizeText}"></ark-file-upload-item-size-text>
    <div class="${styles.ErrorList}"></div>
  </ark-file-upload-item>`

const sections = (accepted: string[]) => /* html */ `
  <div class="${styles.Section}" data-section="accepted" hidden>
    <div class="${styles.SectionTitle}" data-status="accepted">${createElement(CircleCheck, { 'aria-hidden': 'true', style: 'width: 0.875rem; height: 0.875rem; display: inline; margin-right: 0.25rem; vertical-align: middle' }).outerHTML}Accepted Files</div>
    ${itemGroup({ type: 'accepted' }, accepted)}
  </div>
  <div class="${styles.Section}" data-section="rejected" hidden>
    <div class="${styles.SectionTitle}" data-status="rejected">${createElement(CircleAlert, { 'aria-hidden': 'true', style: 'width: 0.875rem; height: 0.875rem; display: inline; margin-right: 0.25rem; vertical-align: middle' }).outerHTML}Rejected Files</div>
    ${itemGroup({ type: 'rejected' }, [rejectedItem])}
  </div>`

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
  const host = trackSections(
    fragment(/* html */ `
      <ark-file-upload max-files="2" class="${styles.Root}">
        ${label('Upload Files (Max 2)')}
        ${dropzone({ title: 'Drop files here', description: 'Maximum 2 files allowed' })}
        ${sections([item([imagePreview])])}
        ${hiddenInput}
      </ark-file-upload>`),
    { tag: 'span' },
  )
  host
    .querySelector('ark-file-upload')!
    .addEventListener('filereject', (event) => console.log('Rejected files:', event.detail))
  root.replaceChildren(host)
}
