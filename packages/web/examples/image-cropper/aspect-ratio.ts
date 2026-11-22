import { createElement, RectangleHorizontal, Square, RectangleVertical } from 'lucide'

import { imageCropperPlacements } from '@ark-ui/web/image-cropper'

import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const icon = (node: typeof RectangleHorizontal) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const aspects = [
  { label: '16:9', value: '16/9', icon: RectangleHorizontal },
  { label: '1:1', value: '1', icon: Square },
  { label: '9:16', value: '9/16', icon: RectangleVertical },
]

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <div class="${button.Group}">
      ${aspects
        .map(
          (aspect) =>
            /* html */ `<button class="${button.Root}" data-ratio="${aspect.value}">${icon(aspect.icon)}${aspect.label}</button>`,
        )
        .join('')}
    </div>
    <ark-image-cropper class="${styles.Root}" aspect-ratio="16/9">
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
  const buttons = root.querySelectorAll<HTMLButtonElement>('button[data-ratio]')

  const select = (ratio: string) => {
    cropper.setAttribute('aspect-ratio', ratio)

    for (const item of buttons) {
      if (item.dataset.ratio === ratio) item.dataset.variant = 'solid'
      else delete item.dataset.variant
    }
  }

  for (const item of buttons) item.addEventListener('click', () => select(item.dataset.ratio!))

  select(String(16 / 9))
}
