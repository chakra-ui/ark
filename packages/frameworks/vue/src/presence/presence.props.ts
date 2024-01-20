import type { BaseProps } from '../types'
import type { UsePresenceProps } from './use-presence'

import { defineEmits, defineProps } from 'vue'

export interface PresenceProps extends BaseProps, UsePresenceProps {}

export type PresenceEmits = {
  /** Function called when the animation ends in the closed state. */
  exitComplete: []
}

// TODO: remove this when all components are SFC and use defineProps/defineEmits inside those SFC components.
export const emits = defineEmits<PresenceEmits>()
export const props = defineProps<PresenceProps>()
