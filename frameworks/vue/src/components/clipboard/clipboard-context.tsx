import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseClipboardContext, useClipboardContext } from './use-clipboard-context'

export type ClipboardContextProps = SlotsType<{
  default: UnwrapRef<UseClipboardContext>
}>

export const ClipboardContext = defineComponent(
  (_, { slots }) => {
    const clipboard = useClipboardContext()

    return () => slots.default(clipboard.value)
  },
  {
    name: 'ClipboardContext',
    slots: Object as ClipboardContextProps,
  },
)
