import * as numberInput from '@zag-js/number-input'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

const json = <T>(el: Element, name: string): T | undefined => {
  const value = el.getAttribute(name)
  return value ? JSON.parse(value) : undefined
}

defineRoot<numberInput.Api>({
  properties: ['ids', 'translations'],

  tag: root,
  machine: numberInput.machine,
  connect: numberInput.connect,
  attributes: [
    'value',
    'default-value',
    'min',
    'max',
    'step',
    'large-step',
    'small-step',
    'format-options',
    'locale',
    'input-mode',
    'pattern',
    'allow-mouse-wheel',
    'allow-out-of-range',
    'focus-input-on-change',
    'spin-on-press',
    'snap-on-step',
    'scrubber-direction',
    'disabled',
    'readonly',
    'invalid',
    'required',
    'name',
    'form',
  ],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => (value == null ? api.clearValue() : api.setValue(Number(value))),
    },
  },
  props: (el) => ({
    value: el.hasAttribute('value') ? (num(el, 'value') ?? null) : undefined,
    defaultValue: num(el, 'default-value'),
    min: num(el, 'min'),
    max: num(el, 'max'),
    step: num(el, 'step'),
    largeStep: num(el, 'large-step'),
    smallStep: num(el, 'small-step'),
    formatOptions: json<Intl.NumberFormatOptions>(el, 'format-options'),
    locale: str(el, 'locale'),
    inputMode: str<numberInput.Props['inputMode'] & string>(el, 'input-mode'),
    pattern: str(el, 'pattern'),
    allowMouseWheel: el.hasAttribute('allow-mouse-wheel'),
    allowOutOfRange: el.hasAttribute('allow-out-of-range'),
    focusInputOnChange: el.getAttribute('focus-input-on-change') !== 'false',
    spinOnPress: el.getAttribute('spin-on-press') !== 'false',
    snapOnStep: el.hasAttribute('snap-on-step'),
    scrubberDirection: str<numberInput.Props['scrubberDirection'] & string>(el, 'scrubber-direction'),
    disabled: el.hasAttribute('disabled'),
    readOnly: el.hasAttribute('readonly'),
    invalid: el.hasAttribute('invalid') || undefined,
    required: el.hasAttribute('required'),
    name: str(el, 'name'),
    form: str(el, 'form'),
  }),
  events: {
    onValueChange: 'valuechange',
    onValueInvalid: 'valueinvalid',
    onFocusChange: 'focuschange',
    onValueCommit: 'valuecommit',
  },
  rootProps: (api) => api.getRootProps(),
})
