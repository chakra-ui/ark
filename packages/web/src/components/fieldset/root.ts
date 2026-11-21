import * as fieldset from '@zag-js/fieldset'

import { defineRoot, wrapped } from '../../utils/define.js'
import { refreshOnChange } from '../../utils/field.js'
import { root } from './shared.js'

defineRoot<fieldset.Api>({
  tag: root,
  machine: fieldset.machine,
  connect: fieldset.connect,

  attributes: ['disabled', 'invalid'],
  properties: ['ids'],
  props: (el) => ({
    disabled: el.hasAttribute('disabled'),
    invalid: el.hasAttribute('invalid'),
  }),

  target: wrapped('fieldset'),
  rootProps: (api) => api.getRootProps(),
  render: (api, el) => refreshOnChange(el, [api.disabled, api.invalid]),
})
