import type { ResizeTriggerProps } from '@zag-js/splitter'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { useSplitterContext } from './splitter-context'

export interface SplitterResizeTriggerProps
  extends Assign<HTMLArkProps<'button'>, ResizeTriggerProps> {}

export const SplitterResizeTrigger = defineComponent<SplitterResizeTriggerProps>(
  (props, { slots, attrs }) => {
    const api = useSplitterContext()

    return () => (
      <ark.button {...api.value.getResizeTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
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
  },
)
