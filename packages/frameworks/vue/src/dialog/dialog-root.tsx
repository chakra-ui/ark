import { computed, defineComponent } from 'vue'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { DialogProvider } from './dialog-context'
import { emits, props } from './dialog.props'
import { useDialog, type UseDialogProps } from './use-dialog'

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

    return () => slots.default?.(api.value)
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
