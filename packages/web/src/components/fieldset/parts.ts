import type * as fieldset from '@zag-js/fieldset'

import { definePart } from '../../utils/define.js'
import { root } from './shared.js'

definePart<fieldset.Api>({
  tag: 'ark-fieldset-legend',
  root,
  props: (api) => api.getLegendProps(),
})

definePart<fieldset.Api>({
  tag: 'ark-fieldset-helper-text',
  root,
  props: (api) => api.getHelperTextProps(),
})

definePart<fieldset.Api>({
  tag: 'ark-fieldset-error-text',
  root,
  props: (api) => api.getErrorTextProps(),
})
