import type * as zagSwitch from '@zag-js/switch'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'

definePart<zagSwitch.Api>({ tag: 'ark-switch-label', root, props: (api) => api.getLabelProps() })

definePart<zagSwitch.Api>({ tag: 'ark-switch-control', root, props: (api) => api.getControlProps() })

definePart<zagSwitch.Api>({ tag: 'ark-switch-thumb', root, props: (api) => api.getThumbProps() })

definePart<zagSwitch.Api>({
  tag: 'ark-switch-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
