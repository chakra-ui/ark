import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseDialogContext, useDialogContext } from './use-dialog-context'

export type DialogContextProps = SlotsType<{
  default: UnwrapRef<UseDialogContext>
}>

export const DialogContext = defineComponent(
  (_, { slots }) => {
    const dialog = useDialogContext()

    return () => slots.default(dialog.value)
  },
  {
    name: 'DialogContext',
    slots: Object as DialogContextProps,
  },
)
