import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './clipboard-context'

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
