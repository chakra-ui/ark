import {
  cloneVNode,
  defineComponent,
  ref,
  watch,
  type ComponentPublicInstance,
  type PropType,
} from 'vue'
import { getValidChildren } from '../utils'
import { usePresence, type UsePresenceProps } from './use-presence'

export type PresenceProps = {}

export const Presence = defineComponent({
  props: {
    present: {
      type: Boolean,
    },
    onExitComplete: {
      type: Function as PropType<UsePresenceProps['onExitComplete']>,
    },
    lazyMount: {
      type: Boolean,
      default: false,
    },
    unmountOnExit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const api = usePresence(props)
    const child = ref<ComponentPublicInstance | null>(null)
    const wasEverPresent = ref(false)

    watch(
      () => api.value.isPresent,
      (newValue) => {
        if (newValue) {
          wasEverPresent.value = true
        }
      },
    )

    watch(
      () => child.value,
      (newValue) => {
        if (newValue) {
          api.value.setNode(newValue)
        }
      },
    )

    return () => {
      if (
        (!api.value.isPresent && !wasEverPresent.value && props.lazyMount) ||
        (props.unmountOnExit && !api.value.isPresent && wasEverPresent.value)
      ) {
        return null
      }

      const children = getValidChildren(slots)
      return cloneVNode(children[0], {
        ref: (ref) => {
          child.value = ref as ComponentPublicInstance | null
        },
        ['hidden']: !api.value.isPresent,
        ['data-state']: props.present ? 'open' : 'closed',
      })
    }
  },
})
