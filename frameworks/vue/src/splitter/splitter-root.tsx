import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SplitterProvider } from './splitter-context'
import { emits, props } from './splitter.props'
import { useSplitter, type UseSplitterProps } from './use-splitter'

export interface SplitterRootProps extends Assign<HTMLArkProps<'div'>, UseSplitterProps> {}

export const SplitterRoot = defineComponent<SplitterRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useSplitter(props, emit)
    SplitterProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'SplitterRoot',
    props,
    emits,
  },
)
