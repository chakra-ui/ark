import * as slider from '@zag-js/slider'
import { num, numbers, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<slider.Api>({
  properties: ['getAriaValueText', 'getAriaLabel', 'getAriaLabelledBy', 'ids'],

  tag: root,
  machine: slider.machine,
  connect: slider.connect,
  attributes: [
    'value',
    'default-value',
    'min',
    'max',
    'step',
    'orientation',
    'origin',
    'thumb-alignment',
    'min-steps-between-thumbs',
    'thumb-collision-behavior',
    'disabled',
    'readonly',
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
  props: (el) => ({
    value: numbers(el, 'value'),
    defaultValue: numbers(el, 'default-value'),
    min: num(el, 'min') ?? 0,
    max: num(el, 'max') ?? 100,
    step: num(el, 'step') ?? 1,
    orientation: str<slider.Props['orientation'] & string>(el, 'orientation') ?? 'horizontal',
    origin: str<slider.Props['origin'] & string>(el, 'origin') ?? 'start',
    thumbAlignment: str<slider.Props['thumbAlignment'] & string>(el, 'thumb-alignment') ?? 'contain',
    minStepsBetweenThumbs: num(el, 'min-steps-between-thumbs') ?? 0,
    thumbCollisionBehavior:
      str<slider.Props['thumbCollisionBehavior'] & string>(el, 'thumb-collision-behavior') ?? 'none',
    disabled: el.hasAttribute('disabled'),
    readOnly: el.hasAttribute('readonly'),
    invalid: el.hasAttribute('invalid'),
    name: str(el, 'name'),
    form: str(el, 'form'),
  }),
  events: { onValueChange: 'valuechange', onValueChangeEnd: 'valuechangeend', onFocusChange: 'focuschange' },
  rootProps: (api) => api.getRootProps(),
})
