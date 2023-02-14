import type { connect } from '@zag-js/splitter'
import { defineComponent, h, PropType } from 'vue'
import { ComponentWithProps, useUniqueChild } from '../utils'
import { useSplitterContext } from './splitter-context'

type SplitterContext = Parameters<ReturnType<typeof connect>['getResizeTriggerProps']>[0]
export type SplitterResizeTriggerProps = SplitterContext

export const SplitterResizeTrigger: ComponentWithProps<SplitterResizeTriggerProps> =
  defineComponent({
    name: 'SplitterResizeTrigger',
    props: {
      id: {
        type: String as PropType<SplitterResizeTriggerProps['id']>,
        required: true,
      },
      step: {
        type: Number as PropType<SplitterResizeTriggerProps['step']>,
      },
      disabled: {
        type: Boolean as PropType<SplitterResizeTriggerProps['disabled']>,
      },
    },
    setup(props, { slots, attrs }) {
      const api = useSplitterContext()
      return () => {
        const DefaultSlot = useUniqueChild(slots, 'SplitterResizeTrigger')

        return h(DefaultSlot, {
          ...api.value.getResizeTriggerProps({
            id: props.id,
            step: props.step,
            disabled: props.disabled,
          }),
          ...attrs,
        })
      }
    },
  })
