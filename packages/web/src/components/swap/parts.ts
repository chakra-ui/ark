import { definePresencePart } from '../../utils/presence.js'
import { root, type SwapApi, typeOf } from './shared.js'

export const SwapIndicator = definePresencePart<SwapApi>({
  tag: 'ark-swap-indicator',
  root,
  attributes: ['type'],
  display: 'inline-flex',
  skipAnimationOnMount: true,
  present: (api, el) => (typeOf(el) === 'on' ? api.swap : !api.swap),
  props: (api, el) => api.getIndicatorProps({ type: typeOf(el) }),
})
