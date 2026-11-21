import * as editable from '@zag-js/editable'
import { controlled, num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'
import { withField } from '../../utils/field.js'

defineRoot<editable.Api>({
  properties: ['finalFocusEl', 'ids', 'translations'],

  tag: root,
  machine: editable.machine,
  connect: editable.connect,
  attributes: [
    'value',
    'default-value',
    'placeholder',
    'edit',
    'default-edit',
    'activation-mode',
    'submit-mode',
    'select-on-focus',
    'auto-resize',
    'max-length',
    'disabled',
    'readonly',
    'required',
    'invalid',
    'name',
    'form',
  ],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },
  props: (el) =>
    withField(el, 'input', {
      value: str(el, 'value'),
      defaultValue: str(el, 'default-value'),
      placeholder: str(el, 'placeholder'),
      edit: controlled(el, 'edit'),
      defaultEdit: el.hasAttribute('default-edit'),
      activationMode: str<editable.Props['activationMode'] & string>(el, 'activation-mode'),
      submitMode: str<editable.Props['submitMode'] & string>(el, 'submit-mode'),
      selectOnFocus: el.getAttribute('select-on-focus') !== 'false',
      autoResize: el.hasAttribute('auto-resize'),
      maxLength: num(el, 'max-length'),
      disabled: el.hasAttribute('disabled'),
      readOnly: el.hasAttribute('readonly'),
      required: el.hasAttribute('required'),
      invalid: el.hasAttribute('invalid'),
      name: str(el, 'name'),
      form: str(el, 'form'),
    }),
  events: {
    onEditChange: 'editchange',
    onValueChange: 'valuechange',
    onValueRevert: 'valuerevert',
    onValueCommit: 'valuecommit',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },
  rootProps: (api) => api.getRootProps(),
})
