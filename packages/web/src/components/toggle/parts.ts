import type * as toggle from '@zag-js/toggle'

import { definePart } from '../../utils/define.js'
import { root } from './shared.js'

export const ToggleIndicator = definePart<toggle.Api>({
  tag: 'ark-toggle-indicator',
  root,
  attributes: ['fallback'],
  props: (api, el) => {
    const isFallback = el.hasAttribute('fallback')
    const visible = isFallback ? !api.pressed : api.pressed

    return {
      ...api.getIndicatorProps(),
      hidden: !visible,
    }
  },
})
