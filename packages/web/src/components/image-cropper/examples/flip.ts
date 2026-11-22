import { createElement, FlipHorizontal, FlipVertical } from 'lucide'

import { imageCropperPlacements, type ImageCropperFlipState } from '@ark-ui/web/image-cropper'

import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const icon = (node: typeof FlipHorizontal) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <div class="${button.Group}">
      <button class="${button.Root}" data-axis="horizontal">${icon(FlipHorizontal)}Horizontal</button>
      <button class="${button.Root}" data-axis="vertical">${icon(FlipVertical)}Vertical</button>
    </div>
    <ark-image-cropper class="${styles.Root}" flip="">
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
  const buttons = root.querySelectorAll<HTMLButtonElement>('button[data-axis]')

  const show = (flip: ImageCropperFlipState) => {
    const axes = (['horizontal', 'vertical'] as const).filter((axis) => flip[axis])
    cropper.setAttribute('flip', axes.join(','))

    for (const item of buttons) {
      if (axes.includes(item.dataset.axis as keyof ImageCropperFlipState)) item.dataset.variant = 'solid'
      else delete item.dataset.variant
    }
  }

  for (const item of buttons) {
    item.addEventListener('click', () => {
      const axis = item.dataset.axis as keyof ImageCropperFlipState
      show({ ...cropper.flip, [axis]: !cropper.flip[axis] })
    })
  }

  cropper.addEventListener('flipchange', (event) => show(event.detail.flip))
}
