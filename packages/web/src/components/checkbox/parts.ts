import type * as checkbox from '@zag-js/checkbox'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'

definePart<checkbox.Api>({ tag: 'ark-checkbox-label', root, props: (api) => api.getLabelProps() })

definePart<checkbox.Api>({ tag: 'ark-checkbox-control', root, props: (api) => api.getControlProps() })

definePart<checkbox.Api>({
  tag: 'ark-checkbox-indicator',
  root,
  props: (api, el) => ({
    ...api.getIndicatorProps(),
    hidden: el.hasAttribute('indeterminate') ? !api.indeterminate : !api.checked,
  }),
})

definePart<checkbox.Api>({
  tag: 'ark-checkbox-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
