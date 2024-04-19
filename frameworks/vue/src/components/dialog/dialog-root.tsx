import { computed, defineComponent } from 'vue'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './dialog.props'
import { type UseDialogProps, useDialog } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

export interface DialogRootProps extends UseDialogProps, UsePresenceProps {}

export const DialogRoot = defineComponent<DialogRootProps>(
  (props, { slots, emit }) => {
    const api = useDialog(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    DialogProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.()
  },
  {
    name: 'DialogRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
