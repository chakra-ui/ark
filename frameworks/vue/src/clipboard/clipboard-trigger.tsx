import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './clipboard-context'

export interface ClipboardTriggerProps extends HTMLArkProps<'button'> {}

export const ClipboardTrigger = defineComponent<ClipboardTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useClipboardContext()
    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ClipboardTrigger',
  },
)
