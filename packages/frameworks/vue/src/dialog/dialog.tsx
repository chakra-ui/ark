import { computed, defineComponent } from 'vue'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { DialogProvider } from './dialog-context'
import { emits, props } from './dialog.props'
import { useDialog, type UseDialogProps } from './use-dialog'

export interface DialogProps extends UseDialogProps, UsePresenceProps {}

export const Dialog = defineComponent<DialogProps>(
  (props, { slots, emit }) => {
    const api = useDialog(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps as any, emit)

    DialogProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.(api.value)
  },
  {
    name: 'Dialog',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
