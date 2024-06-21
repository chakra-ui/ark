import { createAnatomy } from '@zag-js/anatomy'

export const anatomy = createAnatomy('field').parts(
  'root',
  'label',
  'input',
  'textarea',
  'select',
  'helperText',
  'errorText',
)
export const parts = anatomy.build()
