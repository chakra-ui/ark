import { createAnatomy } from '@zag-js/anatomy'

export const anatomy = createAnatomy('field').parts(
  'root',
  'errorText',
  'helperText',
  'input',
  'label',
  'select',
  'textarea',
)
