import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useProgressContext } from './progress-context'

export interface ProgressLabelProps extends HTMLArkProps<'label'> {}

export const ProgressLabel = defineComponent<ProgressLabelProps>(
  (_, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'ProgressLabel',
  },
)
