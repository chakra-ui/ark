import { declareEmits } from '../utils'

export const props = {
  present: {
    type: Boolean,
  },
  lazyMount: {
    type: Boolean,
    default: false,
  },
  unmountOnExit: {
    type: Boolean,
    default: false,
  },
}

export const emits = declareEmits(['exit-complete'])
