import { type ResizeTriggerProps } from '@zag-js/splitter'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSplitterContext } from './splitter-context'

export type SplitterResizeTriggerProps = Assign<HTMLArkProps<'button'>, ResizeTriggerProps>

export const SplitterResizeTrigger = defineComponent({
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

    return () => (
      <ark.button {...api.value.getResizeTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
