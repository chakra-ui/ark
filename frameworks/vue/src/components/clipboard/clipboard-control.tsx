import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useClipboardContext } from './clipboard-context'

export interface ClipboardControlProps extends HTMLArkProps<'div'> {}

export const ClipboardControl = defineComponent<ClipboardControlProps>(
  (_, { attrs, slots }) => {
    const api = useClipboardContext()
    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ClipboardControl',
  },
)
