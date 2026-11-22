import { createElement, ZoomOut, ZoomIn, RotateCcw, RotateCw, FlipHorizontal, RefreshCw } from 'lucide'

import { imageCropperPlacements } from '@ark-ui/web/image-cropper'

import button from 'styles/button.module.css'
import styles from 'styles/image-cropper.module.css'

const icon = (node: typeof ZoomOut) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <div class="${styles.Layout}">
    <div class="${button.Group}">
      <button class="${button.Root}" aria-label="Zoom out" data-action="zoom-out">${icon(ZoomOut)}</button>
      <button class="${button.Root}" aria-label="Zoom in" data-action="zoom-in">${icon(ZoomIn)}</button>
      <button class="${button.Root}" aria-label="Rotate left" data-action="rotate-left">${icon(RotateCcw)}</button>
      <button class="${button.Root}" aria-label="Rotate right" data-action="rotate-right">${icon(RotateCw)}</button>
      <button class="${button.Root}" aria-label="Flip horizontally" data-action="flip">${icon(FlipHorizontal)}</button>
      <button class="${button.Root}" data-variant="surface" data-action="reset">${icon(RefreshCw)}Reset</button>
    </div>
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
  </div>`

  const cropper = root.querySelector('ark-image-cropper')!

  const actions: Record<string, VoidFunction> = {
    'zoom-out': () => cropper.zoomBy(-0.1),
    'zoom-in': () => cropper.zoomBy(0.1),
    'rotate-left': () => cropper.rotateBy(-90),
    'rotate-right': () => cropper.rotateBy(90),
    flip: () => cropper.flipHorizontally(),
    reset: () => cropper.reset(),
  }

  for (const item of root.querySelectorAll<HTMLButtonElement>('button[data-action]')) {
    item.addEventListener('click', () => actions[item.dataset.action!]())
  }
}
