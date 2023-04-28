import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { SplitterProvider } from './splitter-context'
import { useSplitter, type UseSplitterContext } from './use-splitter'

export type SplitterProps = Assign<HTMLArkProps<'div'>, UseSplitterContext>

export const Splitter: ComponentWithProps<SplitterProps> = defineComponent({
  name: 'Splitter',
  props: {
    dir: {
      type: String as PropType<SplitterProps['dir']>,
    },
    getRootNode: {
      type: Function as PropType<SplitterProps['getRootNode']>,
    },
    id: {
      type: String as PropType<SplitterProps['id']>,
    },
    orientation: {
      type: String as PropType<SplitterProps['orientation']>,
    },
    size: {
      type: Object as PropType<SplitterProps['size']>,
    },
  },
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
