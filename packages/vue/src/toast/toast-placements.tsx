import type { Placement } from '@zag-js/toast'
import { computed, defineComponent } from 'vue'
import { useToast } from './toast-provider'

export type PlacementsContext = { placements: Placement[] }

export const ToastPlacements = defineComponent({
  name: 'ToastPlacements',
  setup(_, { slots, expose }) {
    const api = useToast()

    const toastsByPlacement = computed(
      () => Object.keys(api.value.toastsByPlacement) as Placement[],
    )

    expose({ placements: toastsByPlacement })

    return () => slots.default?.()
  },
})
