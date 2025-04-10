import { createAnatomy } from '@zag-js/anatomy'

export const fieldAnatomy = createAnatomy('field').parts(
  'root',
  'errorText',
  'helperText',
  'input',
  'label',
  'select',
  'textarea',
  'requiredIndicator',
)
export const parts = fieldAnatomy.build()
