import * as signaturePad from '@zag-js/signature-pad'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { withField } from '../../utils/field.js'
import { drawingAttributes, drawingOf, json, root } from './shared.js'

defineRoot<signaturePad.Api>({
  tag: root,
  machine: signaturePad.machine,
  connect: signaturePad.connect,

  attributes: ['paths', 'default-paths', 'name', 'disabled', 'readonly', 'required', ...drawingAttributes],
  properties: ['ids', 'translations'],
  ownProperties: ['drawing'],

  actions: {
    clear: (api) => api.clear(),
  },

  props: (el) =>
    withField(el, 'hiddenInput', {
      paths: json<string[]>(el, 'paths'),
      defaultPaths: json<string[]>(el, 'default-paths'),
      name: str(el, 'name'),
      disabled: el.hasAttribute('disabled'),
      readOnly: el.hasAttribute('readonly'),
      required: el.hasAttribute('required'),
      drawing: drawingOf(el, (el as { drawing?: signaturePad.DrawingOptions }).drawing),
    }),

  events: {
    onDraw: 'draw',
    onDrawEnd: 'drawend',
  },

  rootProps: (api) => api.getRootProps(),
})
