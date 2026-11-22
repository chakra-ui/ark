import { imageCropperPlacements } from '@ark-ui/web/image-cropper'

import styles from 'styles/image-cropper.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <ark-image-cropper class="${styles.Root}">
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
    <div class="${styles.DataDisplay}">
      <div class="${styles.DataItem}">
        <span class="${styles.DataLabel}">Zoom</span>
        <span class="${styles.DataValue}" data-zoom>1.00x</span>
      </div>
      <div class="${styles.DataItem}">
        <span class="${styles.DataLabel}">Position</span>
        <span class="${styles.DataValue}" data-position>0, 0</span>
      </div>
      <div class="${styles.DataItem}">
        <span class="${styles.DataLabel}">Size</span>
        <span class="${styles.DataValue}" data-size>0 × 0</span>
      </div>
    </div>
  </div>`

  const cropper = root.querySelector('ark-image-cropper')!

  cropper.addEventListener('zoomchange', (event) => {
    root.querySelector('[data-zoom]')!.textContent = `${event.detail.zoom.toFixed(2)}x`
  })

  cropper.addEventListener('cropchange', (event) => {
    const { x, y, width, height } = event.detail.crop
    root.querySelector('[data-position]')!.textContent = `${Math.round(x)}, ${Math.round(y)}`
    root.querySelector('[data-size]')!.textContent = `${Math.round(width)} × ${Math.round(height)}`
  })
}
