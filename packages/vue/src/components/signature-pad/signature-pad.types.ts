import type * as signaturepad from '@zag-js/signature-pad'

export interface RootProps {
  /**
   * The default paths of the signature pad.
   * Use when you don't need to control the paths of the signature pad.
   */
  defaultPaths?: string[]
  /**
   * Whether the signature pad is disabled.
   */
  disabled?: boolean
  /**
   * The drawing options.
   * @default '{ size: 2, simulatePressure: true }'
   */
  drawing?: signaturepad.DrawingOptions
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the signature pad elements. Useful for composition.
   */
  ids?: signaturepad.ElementIds
  /**
   * The name of the signature pad. Useful for form submission.
   */
  name?: string
  /**
   * The controlled paths of the signature pad.
   */
  paths?: string[]
  /**
   * Whether the signature pad is read-only.
   */
  readOnly?: boolean
  /**
   * Whether the signature pad is required.
   */
  required?: boolean
  /**
   * The translations of the signature pad. Useful for internationalization.
   */
  translations?: signaturepad.IntlTranslations
}

export type RootEmits = {
  /**
   * Callback when the signature pad is drawing or the committed paths change.
   * `paths` contains only committed strokes; use `currentPath` for the in-progress stroke.
   */
  draw: [details: signaturepad.DrawDetails]
  /**
   * Callback when the signature pad is done drawing.
   */
  drawEnd: [details: signaturepad.DrawEndDetails]
  /**
   * Callback when the paths change.
   */
  'update:paths': [paths: string[]]
}
