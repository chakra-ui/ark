import { defineRoot } from '../../utils/define.js'
import { fieldsetOf, refreshOnChange } from '../../utils/field.js'
import { connect, machine, root, type FieldApi } from './shared.js'

defineRoot<FieldApi>({
  tag: root,
  machine,
  connect,

  attributes: ['disabled', 'invalid', 'readonly', 'required', 'target'],
  props: (el) => ({
    disabled: el.hasAttribute('disabled') || !!fieldsetOf(el)?.disabled,
    invalid: el.hasAttribute('invalid'),
    readOnly: el.hasAttribute('readonly'),
    required: el.hasAttribute('required'),
    target: el.getAttribute('target') ?? undefined,
  }),

  rootProps: (api) => api.getRootProps(),
  render: (api, el) => refreshOnChange(el, [api.disabled, api.invalid, api.readOnly, api.required]),
})
