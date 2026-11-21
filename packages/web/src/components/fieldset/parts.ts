import type * as fieldset from '@zag-js/fieldset'

import { definePart } from '../../utils/define.js'
import { root } from './shared.js'

export const FieldsetLegend = definePart<fieldset.Api>({
  tag: 'ark-fieldset-legend',
  root,
  props: (api) => api.getLegendProps(),
})

export const FieldsetHelperText = definePart<fieldset.Api>({
  tag: 'ark-fieldset-helper-text',
  root,
  props: (api) => api.getHelperTextProps(),
})

export const FieldsetErrorText = definePart<fieldset.Api>({
  tag: 'ark-fieldset-error-text',
  root,
  props: (api) => api.getErrorTextProps(),
})
