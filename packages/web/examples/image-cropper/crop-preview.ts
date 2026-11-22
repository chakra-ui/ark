import { createElement, Crop } from 'lucide'

import { imageCropperPlacements } from '@ark-ui/web/image-cropper'

import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const icon = (node: typeof Crop) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <div class="${button.Group}">
      <button class="${button.Root}" data-variant="solid">${icon(Crop)}Crop Image</button>
    </div>
    <ark-image-cropper class="${styles.Root}">
      <ark-image-cropper-viewport class="${styles.Viewport}">
        <ark-image-cropper-image>
          <img class="${styles.Image}" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Sample" crossorigin="anonymous" />
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
    <div class="${styles.Preview}">
      <span class="${styles.PreviewLabel}">Preview</span>
      <img class="${styles.PreviewImage}" alt="Cropped preview" hidden />
    </div>
  </div>`

  const cropper = root.querySelector('ark-image-cropper')!
  const preview = root.querySelector<HTMLImageElement>('[alt="Cropped preview"]')!

  root.querySelector('button')!.addEventListener('click', async () => {
    await cropper.ready
    const result = await cropper.api!.getCroppedImage({ output: 'dataUrl' })
    if (typeof result !== 'string') return
    preview.src = result
    preview.hidden = false
  })
}
