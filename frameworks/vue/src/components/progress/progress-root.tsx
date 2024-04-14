import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { ProgressProvider } from './progress-context'
import { emits, props } from './progress.props'
import { type UseProgressProps, useProgress } from './use-progress'

export interface ProgressRootProps extends Assign<HTMLArkProps<'div'>, UseProgressProps> {}

export const ProgressRoot = defineComponent<ProgressRootProps>(
  (props, { slots, attrs }) => {
    const api = useProgress(props)
    ProgressProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'ProgressRoot',
    props,
    emits,
  },
)
