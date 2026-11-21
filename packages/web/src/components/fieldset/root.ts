import { defineRoot, wrapped } from '../../utils/define.js'
import { refreshOnChange } from '../../utils/field.js'
import { connect, machine, root, type FieldsetApi } from './shared.js'

defineRoot<FieldsetApi>({
  tag: root,
  machine,
  connect,

  attributes: ['disabled', 'invalid'],
  props: (el) => ({
    disabled: el.hasAttribute('disabled'),
    invalid: el.hasAttribute('invalid'),
  }),

  target: wrapped('fieldset'),
  rootProps: (api) => api.getRootProps(),
  render: (api, el) => refreshOnChange(el, [api.disabled, api.invalid]),
})
