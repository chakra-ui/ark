import type * as signaturePad from '@zag-js/signature-pad'

export interface RootProps {
  /**
   * Whether the signature pad is disabled.
   */
  disabled?: boolean
  /**
   * The drawing options.
   * @default '{ size: 2, simulatePressure: true }'
   */
  drawing?: signaturePad.DrawingOptions
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the signature pad elements. Useful for composition.
   */
  ids?: Partial<{ root: string; control: string; hiddenInput: string }>
  /**
   * The name of the signature pad. Useful for form submission.
   */
  name?: string
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
  translations?: signaturePad.IntlTranslations
}

export type RootEmits = {
  /**
   * Callback when the signature pad is drawing.
   */
  draw: [details: signaturePad.DrawDetails]
  /**
   * Callback when the signature pad is done drawing.
   */
  drawEnd: [details: signaturePad.DrawEndDetails]
}
