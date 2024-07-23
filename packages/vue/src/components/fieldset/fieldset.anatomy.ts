import { createAnatomy } from '@zag-js/anatomy'

export const fieldsetAnatomy = createAnatomy('fieldset').parts(
  'root',
  'errorText',
  'helperText',
  'legend',
)
export const parts = fieldsetAnatomy.build()
