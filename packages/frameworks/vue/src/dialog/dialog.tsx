import { defineComponent } from 'vue'
import type { UsePresenceProps } from '../presence'
import { DialogProvider } from './dialog-context'
import { emits, props } from './dialog.props'
import { useDialog, type UseDialogProps } from './use-dialog'

export interface DialogProps extends UseDialogProps, UsePresenceProps {}

export const Dialog = defineComponent({
  name: 'Dialog',
  props,
  emits,
  setup(props, { slots, emit }) {
    const api = useDialog(props, emit)
    DialogProvider(api)

    return () => slots.default?.(api.value)
  },
})
