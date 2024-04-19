import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useClipboardContext } from './use-clipboard-context'

export interface ClipboardInputProps extends HTMLArkProps<'input'> {}

export const ClipboardInput = defineComponent<ClipboardInputProps>(
  (_, { attrs }) => {
    const api = useClipboardContext()
    return () => <ark.input {...api.value.inputProps} {...attrs} />
  },
  {
    name: 'ClipboardInput',
  },
)
