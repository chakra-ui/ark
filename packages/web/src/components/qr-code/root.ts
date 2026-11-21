import * as qrCode from '@zag-js/qr-code'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

type ErrorCorrection = NonNullable<qrCode.QrCodeGenerateOptions['ecc']>

const flag = (el: Element, name: string) => el.hasAttribute(name) || undefined

const encodingOf = (el: Element): qrCode.QrCodeGenerateOptions => ({
  ecc: str<ErrorCorrection>(el, 'error-correction'),
  boostEcc: flag(el, 'boost-ecc'),
  border: num(el, 'border'),
  maskPattern: num(el, 'mask-pattern'),
  minVersion: num(el, 'min-version'),
  maxVersion: num(el, 'max-version'),
  invert: flag(el, 'invert'),
})

defineRoot<qrCode.Api>({
  tag: root,
  machine: qrCode.machine,
  connect: qrCode.connect,

  attributes: [
    'value',
    'default-value',
    'pixel-size',
    'error-correction',
    'boost-ecc',
    'border',
    'mask-pattern',
    'min-version',
    'max-version',
    'invert',
    'dir',
  ],
  properties: ['ids'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(String(value ?? '')),
    },
  },
  props: (el) => ({
    value: str(el, 'value'),
    defaultValue: str(el, 'default-value'),
    pixelSize: num(el, 'pixel-size'),
    encoding: encodingOf(el),
    dir: str<'ltr' | 'rtl'>(el, 'dir'),
  }),

  events: {
    onValueChange: 'valuechange',
  },

  rootProps: (api) => api.getRootProps(),
})
