import type { ViewProps } from '@zag-js/progress'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

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
