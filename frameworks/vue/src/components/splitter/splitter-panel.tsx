import type { PanelProps } from '@zag-js/splitter'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useSplitterContext } from './splitter-context'

export interface SplitterPanelProps extends Assign<HTMLArkProps<'div'>, PanelProps> {}

export const SplitterPanel = defineComponent<SplitterPanelProps>(
  (props, { slots, attrs }) => {
    const api = useSplitterContext()

    return () => (
      <ark.div {...api.value.getPanelProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SplitterPanel',
    props: {
      id: {
        type: [String, Number] as PropType<SplitterPanelProps['id']>,
        required: true,
      },
      snapSize: Number as PropType<SplitterPanelProps['snapSize']>,
    },
  },
)
