import { createElement, ZoomOut, ZoomIn } from 'lucide'

import { imageCropperPlacements } from '@ark-ui/web/image-cropper'

import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const icon = (node: typeof ZoomOut) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <div class="${button.Group}">
      <button class="${button.Root}" aria-label="Zoom out" data-zoom="-0.1">${icon(ZoomOut)}</button>
      <output data-zoom-text>1.0x</output>
      <button class="${button.Root}" aria-label="Zoom in" data-zoom="0.1">${icon(ZoomIn)}</button>
    </div>
    <p class="${styles.Description}">Zoom constrained between 0.5x and 2x</p>
    <ark-image-cropper class="${styles.Root}" zoom="1" min-zoom="0.5" max-zoom="2">
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
  const text = root.querySelector('[data-zoom-text]')!

  for (const item of root.querySelectorAll<HTMLButtonElement>('button[data-zoom]')) {
    item.addEventListener('click', () => {
      const zoom = Math.min(2, Math.max(0.5, cropper.zoom + Number(item.dataset.zoom)))
      cropper.setAttribute('zoom', String(zoom))
    })
  }

  cropper.addEventListener('zoomchange', (event) => {
    cropper.setAttribute('zoom', String(event.detail.zoom))
    text.textContent = `${event.detail.zoom.toFixed(1)}x`
  })
}
