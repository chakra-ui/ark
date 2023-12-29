import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ProgressProvider } from './progress-context'
import { emits, props } from './progress.props'
import { useProgress, type UseProgressProps } from './use-progress'

export interface ProgressProps extends Assign<HTMLArkProps<'div'>, UseProgressProps> {}

export const Progress = defineComponent<ProgressProps>(
  (props, { slots, attrs, emit }) => {
    const api = useProgress(props, emit)
    ProgressProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'Progress',
    props,
    emits,
  },
)
