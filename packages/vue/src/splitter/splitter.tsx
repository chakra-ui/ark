import type { Context as SplitterContext } from '@zag-js/splitter'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, getValidChildren, type ComponentWithProps } from '../utils'
import { SplitterProvider } from './splitter-context'
import { useSplitter } from './use-splitter'

export type UseSplitterProps = Assign<HTMLArkProps<'div'>, SplitterContext>
const VueProps = createVueProps<UseSplitterProps>({
  dir: {
    type: String as PropType<UseSplitterProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<UseSplitterProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UseSplitterProps['id']>,
  },
  orientation: {
    type: String as PropType<UseSplitterProps['orientation']>,
  },
  size: {
    type: Object as PropType<UseSplitterProps['size']>,
  },
})

export const Splitter: ComponentWithProps<Partial<UseSplitterProps>> = defineComponent({
  name: 'Splitter',
  props: VueProps,
  emits: ['resize', 'resize-end', 'resize-start'],
  setup(props, { slots, attrs, emit }) {
    const api = useSplitter(emit, props)

    SplitterProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})

export type SplitterProps = Optional<SplitterContext, 'id'>
