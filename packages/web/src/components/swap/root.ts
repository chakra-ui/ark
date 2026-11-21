import { defineRoot } from '../../utils/define.js'
import { connect, machine, root, type SwapApi } from './shared.js'

defineRoot<SwapApi>({
  tag: root,
  machine,
  connect,

  attributes: ['swap'],
  props: (el) => ({ swap: el.hasAttribute('swap') && el.getAttribute('swap') !== 'false' }),

  rootProps: (api) => api.getRootProps(),
})
