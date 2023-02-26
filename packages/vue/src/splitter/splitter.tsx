import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { SplitterProvider } from './splitter-context'
import { useSplitter, UseSplitterProps } from './use-splitter'

type SplitterPropsContext = UseSplitterProps['context']

export type SplitterProps = Assign<HTMLArkProps<'div'>, SplitterPropsContext>

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
    const splitterProps = computed<UseSplitterProps>(() => ({
      context: props,
      emit,
    }))

    const api = useSplitter(splitterProps.value)

    SplitterProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
