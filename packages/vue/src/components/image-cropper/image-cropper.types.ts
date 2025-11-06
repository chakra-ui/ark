import type * as imageCropper from '@zag-js/image-cropper'
import type { Rect } from '@zag-js/types'

export interface RootProps {
  /**
   * The ids of the image cropper elements
   */
  ids?: imageCropper.ElementIds
  /**
   * Specifies the localized strings that identify accessibility elements and their states.
   */
  translations?: imageCropper.IntlTranslations
  /**
   * The initial rectangle of the crop area.
   * If not provided, a smart default will be computed based on viewport size and aspect ratio.
   */
  initialCrop?: Rect
  /**
   * The minimum width of the crop area
   * @default 40
   */
  minWidth?: number
  /**
   * The minimum height of the crop area
   * @default 40
   */
  minHeight?: number
  /**
   * The maximum width of the crop area
   * @default Infinity
   */
  maxWidth?: number
  /**
   * The maximum height of the crop area
   * @default Infinity
   */
  maxHeight?: number
  /**
   * The aspect ratio to maintain for the crop area (width / height).
   * For example, an aspect ratio of 16 / 9 will maintain a width to height ratio of 16:9.
   * If not provided, the crop area can be freely resized.
   */
  aspectRatio?: number
  /**
   * The shape of the crop area.
   * @default "rectangle"
   */
  cropShape?: 'rectangle' | 'circle'
  /**
   * The controlled zoom level of the image.
   */
  zoom?: number
  /**
   * The controlled rotation of the image in degrees (0 - 360).
   */
  rotation?: number
  /**
   * The controlled flip state of the image.
   */
  flip?: imageCropper.FlipState
  /**
   * The initial zoom factor to apply to the image.
   * @default 1
   */
  defaultZoom?: number
  /**
   * The initial rotation to apply to the image in degrees.
   * @default 0
   */
  defaultRotation?: number
  /**
   * The initial flip state to apply to the image.
   * @default { horizontal: false, vertical: false }
   */
  defaultFlip?: imageCropper.FlipState
  /**
   * The amount of zoom applied per wheel step.
   * @default 0.1
   */
  zoomStep?: number
  /**
   * Controls how responsive pinch-to-zoom is.
   * @default 2
   */
  zoomSensitivity?: number
  /**
   * The minimum zoom factor allowed.
   * @default 1
   */
  minZoom?: number
  /**
   * The maximum zoom factor allowed.
   * @default 5
   */
  maxZoom?: number
  /**
   * The base nudge step for keyboard arrow keys (in pixels).
   * @default 1
   */
  nudgeStep?: number
  /**
   * The nudge step when Shift key is held (in pixels).
   * @default 10
   */
  nudgeStepShift?: number
  /**
   * The nudge step when Ctrl/Cmd key is held (in pixels).
   * @default 50
   */
  nudgeStepCtrl?: number
  /**
   * Whether the crop area is fixed in size and position.
   * @default false
   */
  fixedCropArea?: boolean
}

export type RootEmits = {
  /**
   * Callback fired when the zoom level changes.
   */
  zoomChange: [details: imageCropper.ZoomChangeDetails]
  /**
   * Callback fired when the zoom level changes.
   */
  'update:zoom': [zoom: number]
  /**
   * Callback fired when the rotation changes.
   */
  rotationChange: [details: imageCropper.RotationChangeDetails]
  /**
   * Callback fired when the rotation changes.
   */
  'update:rotation': [rotation: number]
  /**
   * Callback fired when the flip state changes.
   */
  flipChange: [details: imageCropper.FlipChangeDetails]
  /**
   * Callback fired when the flip state changes.
   */
  'update:flip': [flip: imageCropper.FlipState]
  /**
   * Callback fired when the crop area changes.
   */
  cropChange: [details: imageCropper.CropChangeDetails]
  /**
   * Callback fired when the crop area changes.
   */
  'update:crop': [crop: Rect]
}
