import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardLabelProps extends HTMLArkProps<'label'> {}

export const ClipboardLabel = defineComponent<ClipboardLabelProps>(
  (_, { attrs, slots }) => {
    const api = useClipboardContext()
    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'ClipboardLabel',
  },
)
