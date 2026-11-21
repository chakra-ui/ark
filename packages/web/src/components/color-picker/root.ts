import * as colorPicker from '@zag-js/color-picker'
import { controlled, positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { withField } from '../../utils/field.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { color, root } from './shared.js'

definePresenceRoot<colorPicker.Api>({
  tag: root,
  machine: colorPicker.machine,
  connect: colorPicker.connect,
  present: (api) => api.open,

  attributes: [
    'value',
    'default-value',
    'format',
    'default-format',
    'open',
    'default-open',
    'inline',
    'close-on-select',
    'open-auto-focus',
    'disabled',
    'readonly',
    'required',
    'invalid',
    'name',
    'locale',
    ...positioningAttributes,
  ],
  properties: ['ids', 'positioning', 'initialFocusEl'],
  state: {
    value: {
      get: (api) => api.valueAsString,
      set: (api, value) => api.setValue(String(value)),
    },
    format: {
      get: (api) => api.format,
      set: (api, value) => api.setFormat(value as colorPicker.ColorFormat),
    },
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
  },
  props: (el) =>
    withField(el, 'input', {
      value: color(el, 'value'),
      defaultValue: color(el, 'default-value'),
      format: str<colorPicker.ColorFormat>(el, 'format'),
      defaultFormat: str<colorPicker.ColorFormat>(el, 'default-format'),
      open: controlled(el, 'open'),
      defaultOpen: el.hasAttribute('default-open'),
      inline: el.hasAttribute('inline'),
      closeOnSelect: el.hasAttribute('close-on-select'),
      openAutoFocus: el.getAttribute('open-auto-focus') !== 'false',
      disabled: el.hasAttribute('disabled'),
      readOnly: el.hasAttribute('readonly'),
      required: el.hasAttribute('required'),
      invalid: el.hasAttribute('invalid'),
      name: str(el, 'name'),
      locale: str(el, 'locale'),
      positioning: positioning(el),
    }),

  events: {
    onValueChange: 'valuechange',
    onValueChangeEnd: 'valuechangeend',
    onOpenChange: 'openchange',
    onFormatChange: 'formatchange',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },

  rootProps: (api) => api.getRootProps(),
})
