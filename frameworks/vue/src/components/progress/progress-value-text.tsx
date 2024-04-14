import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useProgressContext } from './progress-context'

export interface ProgressValueTextProps extends HTMLArkProps<'span'> {}

export const ProgressValueText = defineComponent<ProgressValueTextProps>(
  (_, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      <ark.span {...api.value.valueTextProps} {...attrs}>
        {slots.default?.() || api.value.valueAsString}
      </ark.span>
    )
  },
  {
    name: 'ProgressValueText',
  },
)
