import type { ViewProps } from '@zag-js/progress'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './progress-context'

export interface ProgressViewProps extends Assign<HTMLArkProps<'span'>, ViewProps> {}

export const ProgressView = defineComponent<ProgressViewProps>(
  (props, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      <ark.span {...api.value.getViewProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'ProgressView',
    props: {
      state: {
        type: String as PropType<ViewProps['state']>,
        default: 'indeterminate',
      },
    },
  },
)
