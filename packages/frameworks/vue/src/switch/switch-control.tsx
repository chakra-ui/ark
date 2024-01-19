import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchControlProps extends HTMLArkProps<'span'> {}

export const SwitchControl = defineComponent<SwitchControlProps>(
  (_, { slots, attrs }) => {
    const api = useSwitchContext()

    return () => (
      <>
        <ark.span {...api.value.controlProps} {...attrs}>
          {slots.default?.()}
        </ark.span>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
  {
    name: 'SwitchControl',
  },
)
