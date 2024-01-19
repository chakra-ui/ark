import type { IndicatorProps } from '@zag-js/progress'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useProgressContext } from './progress-context'

export interface ProgressIndicatorProps extends Assign<HTMLArkProps<'span'>, IndicatorProps> {}

export const ProgressIndicator = defineComponent<ProgressIndicatorProps>(
  (props, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      <ark.span {...api.value.getIndicatorProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'ProgressIndicator',
    props: {
      state: {
        type: String as PropType<IndicatorProps['state']>,
        default: 'indeterminate',
      },
    },
  },
)
