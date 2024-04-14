import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useClipboardContext } from './clipboard-context'

export interface ClipboardIndicatorProps extends HTMLArkProps<'div'> {}

export const ClipboardIndicator = defineComponent<ClipboardIndicatorProps>(
  (_, { attrs, slots }) => {
    const api = useClipboardContext()
    return () => (
      <ark.div {...api.value.getIndicatorProps({ copied: api.value.isCopied })} {...attrs}>
        {api.value.isCopied ? slots.copied?.() : slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ClipboardIndicator',
  },
)
