import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useClipboardContext } from './clipboard-context'

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
