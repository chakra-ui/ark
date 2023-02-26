import type { connect } from '@zag-js/splitter'
import { defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useSplitterContext } from './splitter-context'

type GetPanelProps = Parameters<ReturnType<typeof connect>['getPanelProps']>[0]

export type SplitterPanelProps = Assign<HTMLArkProps<'div'>, GetPanelProps>

export const SplitterPanel: ComponentWithProps<SplitterPanelProps> = defineComponent({
  name: 'SplitterPanel',
  props: {
    id: {
      type: [String, Number] as PropType<SplitterPanelProps['id']>,
      required: true,
    },
    snapSize: Number as PropType<SplitterPanelProps['snapSize']>,
  },
  setup(props, { slots, attrs }) {
    const api = useSplitterContext()

    return () => (
      <ark.div {...api.value.getPanelProps({ id: props.id, snapSize: props.snapSize })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
