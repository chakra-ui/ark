import type * as zagSwitch from '@zag-js/switch'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'
import { describedBy } from '../../utils/field.js'

export const SwitchLabel = definePart<zagSwitch.Api>({
  tag: 'ark-switch-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const SwitchControl = definePart<zagSwitch.Api>({
  tag: 'ark-switch-control',
  root,
  props: (api) => api.getControlProps(),
})

export const SwitchThumb = definePart<zagSwitch.Api>({
  tag: 'ark-switch-thumb',
  root,
  props: (api) => api.getThumbProps(),
})

export const SwitchHiddenInput = definePart<zagSwitch.Api>({
  tag: 'ark-switch-hidden-input',
  root,
  target: ownInput,
  props: (api, el) => ({ ...describedBy(el), ...api.getHiddenInputProps() }),
})
