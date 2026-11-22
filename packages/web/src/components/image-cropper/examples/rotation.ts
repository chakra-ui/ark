import { createElement, RotateCcw, RotateCw } from 'lucide'

import { imageCropperPlacements } from '@ark-ui/web/image-cropper'

import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const icon = (node: typeof RotateCcw) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <div class="${button.Group}">
      <button class="${button.Root}" aria-label="Rotate left" data-rotate="-90">${icon(RotateCcw)}</button>
      <button class="${button.Root}" aria-label="Rotate right" data-rotate="90">${icon(RotateCw)}</button>
      <output data-rotation-text>0°</output>
    </div>
    <ark-image-cropper class="${styles.Root}" rotation="0">
      <ark-image-cropper-viewport class="${styles.Viewport}">
        <ark-image-cropper-image>
          <img class="${styles.Image}" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" />
        </ark-image-cropper-image>
        <ark-image-cropper-selection class="${styles.Selection}">
          ${imageCropperPlacements
            .map(
              (placement) =>
                /* html */ `<ark-image-cropper-handle class="${styles.Handle}" placement="${placement}"><div></div></ark-image-cropper-handle>`,
            )
            .join('')}
          <ark-image-cropper-grid class="${styles.Grid}" axis="horizontal"></ark-image-cropper-grid>
          <ark-image-cropper-grid class="${styles.Grid}" axis="vertical"></ark-image-cropper-grid>
        </ark-image-cropper-selection>
      </ark-image-cropper-viewport>
    </ark-image-cropper>
  </div>`

  const cropper = root.querySelector('ark-image-cropper')!
  const text = root.querySelector('[data-rotation-text]')!

  const rotate = (rotation: number) => {
    cropper.setAttribute('rotation', String(rotation))
    text.textContent = `${rotation}°`
  }

  for (const item of root.querySelectorAll<HTMLButtonElement>('button[data-rotate]')) {
    item.addEventListener('click', () => rotate(cropper.rotation + Number(item.dataset.rotate)))
  }

  cropper.addEventListener('rotationchange', (event) => rotate(event.detail.rotation))
}
